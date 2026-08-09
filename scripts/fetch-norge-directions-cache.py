#!/usr/bin/env python3
"""Precalcula rutas Mapbox del road trip Norge → norge-directions-cache.ts

Uso:
  python scripts/fetch-norge-directions-cache.py
"""
from __future__ import annotations

import json
import math
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ROUTE_TS = ROOT / "src/app/pages/destinations/norge/data/norge-route.ts"
OUT_TS = ROOT / "src/app/pages/destinations/norge/data/norge-directions-cache.ts"
ENV_USER = ROOT / "src/environments/environment.user.ts"
PATH_FILES = {
    "flamToGudvangenBoatPath": ROOT
    / "src/app/pages/destinations/norge/data/norge-boat-paths.ts",
    "flamsbanaRoundTripPath": ROOT
    / "src/app/pages/destinations/norge/data/norge-train-paths.ts",
}


def read_token() -> str:
    text = ENV_USER.read_text(encoding="utf-8")
    m = re.search(r"USER_MAPBOX_PK\s*=\s*['\"]([^'\"]+)['\"]", text)
    if not m:
        raise SystemExit("No USER_MAPBOX_PK en environment.user.ts")
    return m.group(1).strip()


def parse_path_file(path: Path) -> list[list[float]]:
    text = path.read_text(encoding="utf-8")
    coords = re.findall(r"\[\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\]", text)
    return [[float(a), float(b)] for a, b in coords]


def parse_activities(route_text: str) -> list[dict]:
    """Extrae stops con activities (id, name, lon, lat, arriveBy, pathRef)."""
    paths = {name: parse_path_file(p) for name, p in PATH_FILES.items()}
    stops: list[dict] = []
    stop_blocks = re.split(r"\n\s*\{\s*\n\s*id:\s*'(Dia\d+)'", route_text)
    # split gives ['preamble', 'Dia01', body1, 'Dia02', body2, ...]
    i = 1
    while i + 1 < len(stop_blocks):
        stop_id = stop_blocks[i]
        body = stop_blocks[i + 1]
        # cut at next day-ish: take until activities array ends roughly via next Dia or tips
        name_m = re.search(r"name:\s*'([^']*)'", body)
        stop_name = name_m.group(1) if name_m else stop_id
        acts = []
        for am in re.finditer(
            r"\{\s*id:\s*'([^']+)'\s*,\s*name:\s*'((?:\\'|[^'])*)'",
            body,
        ):
            aid, aname = am.group(1), am.group(2).replace("\\'", "'")
            # slice from this activity start to next activity or end of activities
            start = am.start()
            nxt = re.search(r"\n\s*\{\s*id:\s*'", body[am.end() :])
            chunk = body[start : am.end() + (nxt.start() if nxt else len(body) - am.end())]
            lon_m = re.search(r"longitude:\s*(-?\d+\.?\d*)", chunk)
            lat_m = re.search(r"latitude:\s*(-?\d+\.?\d*)", chunk)
            if not lon_m or not lat_m:
                continue
            mode_m = re.search(r"arriveBy:\s*'(\w+)'", chunk)
            path_m = re.search(r"pathCoordinates:\s*(\w+)", chunk)
            path_ref = path_m.group(1) if path_m else None
            acts.append(
                {
                    "id": aid,
                    "name": aname,
                    "longitude": float(lon_m.group(1)),
                    "latitude": float(lat_m.group(1)),
                    "arriveBy": mode_m.group(1) if mode_m else None,
                    "pathCoordinates": paths.get(path_ref) if path_ref else None,
                }
            )
        # filter only activities inside this stop (heuristic: ids start with dia0N)
        day_num = stop_id.replace("Dia", "")
        acts = [a for a in acts if a["id"].startswith(f"dia{day_num.zfill(2)}") or a["id"].startswith(f"dia{int(day_num):02d}")]
        # Dia01 uses dia01-
        prefix = f"dia{int(day_num):02d}"
        acts = [a for a in acts if a["id"].lower().startswith(prefix)]
        stops.append({"id": stop_id, "name": stop_name, "activities": acts})
        i += 2
    return stops


def haversine_m(a: list[float], b: list[float]) -> float:
    r = 6371000.0
    to_rad = math.pi / 180
    dlat = (b[1] - a[1]) * to_rad
    dlon = (b[0] - a[0]) * to_rad
    lat1, lat2 = a[1] * to_rad, b[1] * to_rad
    h = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    return 2 * r * math.asin(math.sqrt(h))


def simplify(coords: list[list[float]], min_km: float = 0.08) -> list[list[float]]:
    if not coords or len(coords) < 3:
        return coords
    out = [coords[0]]
    for c in coords[1:-1]:
        p = out[-1]
        d = math.hypot((c[0] - p[0]) * 55, (c[1] - p[1]) * 111)
        if d >= min_km:
            out.append(c)
    out.append(coords[-1])
    return out


def make_path_leg(path: list[list[float]], mode: str) -> dict:
    path = simplify(path, 0.05)
    meters = 0.0
    for i in range(len(path) - 1):
        meters += haversine_m(path[i], path[i + 1])
    speed = 5.5 if mode == "boat" else 8 if mode == "train" else 13
    dur = meters / speed
    mid = path[len(path) // 2]
    return {
        "distanceMeters": meters,
        "durationSeconds": round(dur),
        "distanceKm": round(meters / 100) / 10,
        "durationMin": max(1, round(dur / 60)),
        "mode": mode,
        "midLngLat": mid,
        "coordinates": path,
    }


def make_direct_leg(frm: list[float], to: list[float], mode: str) -> dict:
    steps = 12
    coords = []
    for i in range(steps + 1):
        t = i / steps
        coords.append([frm[0] + (to[0] - frm[0]) * t, frm[1] + (to[1] - frm[1]) * t])
    return make_path_leg(coords, mode)


def fetch_road_leg(frm: list[float], to: list[float], token: str, mode: str) -> dict | None:
    path = f"{frm[0]},{frm[1]};{to[0]},{to[1]}"
    url = (
        f"https://api.mapbox.com/directions/v5/mapbox/driving/{path}"
        f"?geometries=geojson&overview=full&steps=false&access_token={urllib.parse.quote(token)}"
    )
    req = urllib.request.Request(url, headers={"User-Agent": "endless-travels-cache"})
    try:
        with urllib.request.urlopen(req, timeout=60) as res:
            data = json.load(res)
    except Exception as e:
        print("  road fail", e)
        return None
    route = (data.get("routes") or [None])[0]
    if not route or not route.get("geometry", {}).get("coordinates"):
        return None
    dm = float(route.get("distance") or 0)
    ds = float(route.get("duration") or 0)
    coords = simplify(route["geometry"]["coordinates"], 0.08)
    mid = coords[len(coords) // 2]
    return {
        "distanceMeters": dm,
        "durationSeconds": ds,
        "distanceKm": round(dm / 100) / 10,
        "durationMin": round(ds / 60),
        "mode": mode,
        "midLngLat": mid,
        "coordinates": coords,
    }


def append_geom(all_c: list, geom: list) -> None:
    if not geom:
        return
    if not all_c:
        all_c.extend(geom)
    else:
        all_c.extend(geom[1:])


def chain(points: list[dict], token: str) -> dict | None:
    if len(points) < 2:
        return None
    all_c: list = []
    legs: list = []
    total_m = 0.0
    total_s = 0.0
    # Posición real tras cada tramo (fin del path custom puede diferir del marcador).
    at = [points[0]["longitude"], points[0]["latitude"]]
    for i in range(len(points) - 1):
        to = [points[i + 1]["longitude"], points[i + 1]["latitude"]]
        mode = points[i + 1].get("arriveBy") or "driving"
        custom = points[i + 1].get("pathCoordinates")
        leg = None
        next_at = to
        if custom and len(custom) >= 2:
            leg = make_path_leg(custom, mode)
            next_at = [custom[-1][0], custom[-1][1]]
        elif mode in ("boat", "train"):
            leg = make_direct_leg(at, to, mode)
        else:
            road_mode = "bus" if mode == "bus" else "driving"
            leg = fetch_road_leg(at, to, token, road_mode)
            time.sleep(0.25)
            if leg and mode == "lodging":
                leg = {**leg, "mode": "lodging"}
        if not leg:
            leg = make_direct_leg(at, to, mode)
            next_at = to
        at = next_at
        append_geom(all_c, leg["coordinates"])
        legs.append(leg)
        total_m += leg["distanceMeters"]
        total_s += leg["durationSeconds"]
    return {
        "coordinates": all_c,
        "legs": legs,
        "totalDistanceKm": round(total_m / 100) / 10,
        "totalDurationMin": round(total_s / 60),
    }


def format_duration(total_min: int) -> str:
    if total_min < 60:
        return f"{total_min} min"
    h = total_min // 60
    m = total_min % 60
    return f"{h} h {m} min" if m else f"{h} h"


def ts_literal(obj) -> str:
    return json.dumps(obj, ensure_ascii=False, indent=2)


def main() -> None:
    token = read_token()
    route_text = ROUTE_TS.read_text(encoding="utf-8")
    stops = parse_activities(route_text)
    print("stops", [(s["id"], len(s["activities"])) for s in stops])

    days = {}
    for stop in stops:
        acts = stop["activities"]
        day_num = int(re.sub(r"\D", "", stop["id"]) or 0)
        points = [
            {
                "letter": f"{day_num}.{i + 1}",
                "name": a["name"],
                "longitude": a["longitude"],
                "latitude": a["latitude"],
                "arriveBy": a.get("arriveBy"),
            }
            for i, a in enumerate(acts)
        ]
        print(f"fetch {stop['id']} ({len(acts)} pts)...")
        result = chain(acts, token) if len(acts) >= 2 else None
        days[stop["id"]] = {
            "points": points,
            "legs": result["legs"] if result else [],
            "coordinates": result["coordinates"] if result else [],
            "totalDistanceKm": result["totalDistanceKm"] if result else 0,
            "totalDurationMin": result["totalDurationMin"] if result else 0,
        }

    # Main overnight route between day endpoints (hotel coords)
    main_coords = [[s["activities"][-1]["longitude"], s["activities"][-1]["latitude"]] for s in stops if s["activities"]]
    # Better: use stop hotel = last activity; for overview use stop centers from route
    # Use last activity of each day as overnight node
    print("fetch main stop-to-stop...")
    main_points = [
        {"id": s["id"], "name": s["name"], "longitude": s["activities"][-1]["longitude"], "latitude": s["activities"][-1]["latitude"]}
        for s in stops
        if s["activities"]
    ]
    main = chain(
        [
            {
                "id": p["id"],
                "longitude": p["longitude"],
                "latitude": p["latitude"],
                "arriveBy": "driving",
            }
            for p in main_points
        ],
        token,
    )
    stop_legs = []
    if main:
        for i, leg in enumerate(main["legs"]):
            stop_legs.append(
                {
                    "fromStopId": main_points[i]["id"],
                    "toStopId": main_points[i + 1]["id"],
                    "fromName": main_points[i]["name"],
                    "toName": main_points[i + 1]["name"],
                    "distanceKm": leg["distanceKm"],
                    "durationMin": leg["durationMin"],
                    "durationLabel": format_duration(leg["durationMin"]),
                }
            )

    payload = {
        "generatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "main": {
            "coordinates": main["coordinates"] if main else [],
            "totalDistanceKm": main["totalDistanceKm"] if main else 0,
            "totalDurationMin": main["totalDurationMin"] if main else 0,
            "stopLegs": stop_legs,
        },
        "days": days,
    }

    out = f"""/**
 * Rutas precalculadas (Mapbox Directions + polilíneas barco/tren).
 * Regenerar: python scripts/fetch-norge-directions-cache.py
 * Generado: {payload['generatedAt']}
 */
import {{ DriveLegStats }} from '../services/norge-directions.service';
import {{ NorgeMapDayPoint }} from '../components/norge-map.types';
import {{ NorgeStopLegView }} from './norge-route';

export interface NorgeCachedDay {{
  points: NorgeMapDayPoint[];
  legs: DriveLegStats[];
  coordinates: Array<[number, number]>;
  totalDistanceKm: number;
  totalDurationMin: number;
}}

export interface NorgeDirectionsCache {{
  generatedAt: string;
  main: {{
    coordinates: Array<[number, number]>;
    totalDistanceKm: number;
    totalDurationMin: number;
    stopLegs: NorgeStopLegView[];
  }};
  days: Record<string, NorgeCachedDay>;
}}

export const norgeDirectionsCache: NorgeDirectionsCache = {ts_literal(payload)} as NorgeDirectionsCache;
"""
    OUT_TS.write_text(out, encoding="utf-8")
    print("wrote", OUT_TS, "bytes", OUT_TS.stat().st_size)


if __name__ == "__main__":
    main()
