"""Build Norge route from EXIF GPS+date; copy max 5 images per activity."""
from __future__ import annotations

import json
import re
import shutil
from collections import Counter, defaultdict
from datetime import datetime
from math import asin, cos, radians, sin, sqrt
from pathlib import Path

DOWNLOADS = Path(r"C:\Users\Alex\Downloads")
ROOT = Path(r"c:\Users\Alex\Documents\Cursos\WEB\endless-travels")
OUT_ASSETS = ROOT / "public" / "assets" / "norge"
OUT_TS = ROOT / "src" / "app" / "pages" / "destinations" / "norge" / "data" / "norge-route.ts"
SCAN = ROOT / ".norge-exif-scan.json"


def scan_exif(src: Path) -> list[dict]:
    from PIL import Image

    def dms_to_deg(dms, ref):
        if not dms:
            return None
        try:
            d, m, s = float(dms[0]), float(dms[1]), float(dms[2])
            val = d + m / 60 + s / 3600
            if ref in ("S", "W"):
                val = -val
            return val
        except Exception:
            return None

    rows = []
    imgs = [p for p in src.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}]
    for p in imgs:
        lat = lon = None
        dt = None
        try:
            im = Image.open(p)
            exif = im.getexif()
            if exif:
                for key in (36867, 36868, 306):
                    v = exif.get(key)
                    if v:
                        dt = str(v)
                        break
                gps_ifd = exif.get_ifd(0x8825) if hasattr(exif, "get_ifd") else None
                if gps_ifd:
                    lat = dms_to_deg(gps_ifd.get(2), gps_ifd.get(1))
                    lon = dms_to_deg(gps_ifd.get(4), gps_ifd.get(3))
            rows.append({"file": p.name, "lat": lat, "lon": lon, "dt": dt, "size": p.stat().st_size})
        except Exception as e:
            rows.append({"file": p.name, "error": str(e)})
    SCAN.write_text(json.dumps(rows, ensure_ascii=False), encoding="utf-8")
    return rows


def find_src() -> Path:
    bases = [
        d
        for d in DOWNLOADS.iterdir()
        if d.is_dir() and "Iglesias (1)" in d.name and "Fotos" in d.name
    ]
    if not bases:
        raise SystemExit("Source folder not found")
    base = bases[0]
    inner = [d for d in base.iterdir() if d.is_dir()]
    if not inner:
        raise SystemExit(f"No inner folder in {base}")
    return inner[0]


places = [
    ("Oslo centro", 59.9139, 10.7522),
    ("Operahuset Oslo", 59.9075, 10.7530),
    ("Vigeland / Frogner", 59.9270, 10.7000),
    ("Akershus", 59.9070, 10.7360),
    ("Aker Brygge", 59.9090, 10.7260),
    ("Gardermoen (OSL)", 60.1939, 11.1004),
    ("Honefoss", 60.1680, 10.2560),
    ("Gol", 60.6990, 8.9450),
    ("Hemsedal", 60.8630, 8.5520),
    ("Borgund stavkirke", 61.0470, 7.8120),
    ("Laerdal", 61.0980, 7.4780),
    ("Aurland", 60.9056, 7.1919),
    ("Flam", 60.8631, 7.1134),
    ("Flam railway", 60.8628, 7.1205),
    ("Stegastein", 60.9070, 7.2120),
    ("Gudvangen", 60.8780, 6.8370),
    ("Naeroyfjord", 60.8750, 6.8500),
    ("Undredal", 60.9500, 7.1000),
    ("Voss", 60.6290, 6.4150),
    ("Bergen Bryggen", 60.3973, 5.3233),
    ("Bergen centro", 60.3913, 5.3242),
    ("Floyen / Floibanen", 60.3945, 5.3435),
    ("Mount Ulriken", 60.3770, 5.3870),
    ("Hardangerfjord", 60.4000, 6.8000),
    ("Eidfjord", 60.4670, 7.0720),
    ("Voringsfossen", 60.4260, 7.2510),
    ("Odda", 60.0690, 6.5460),
    ("Trolltunga area", 60.1240, 6.7400),
    ("Briksdalsbreen", 61.6620, 6.8880),
    ("Loen", 61.8700, 6.8500),
    ("Olden", 61.8350, 6.8060),
    ("Stryn", 61.9040, 6.7230),
    ("Geiranger", 62.1008, 7.2072),
]


def hav(lat1, lon1, lat2, lon2):
    r = 6371
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    return 2 * r * asin(sqrt(a))


def nearest(lat, lon, max_km=80):
    best = ("Zona Noruega", 1e9)
    for n, la, lo in places:
        d = hav(lat, lon, la, lo)
        if d < best[1]:
            best = (n, d)
    if best[1] > max_km:
        return ("En ruta", best[1])
    return best


def parse_dt(s):
    try:
        return datetime.strptime(s, "%Y:%m:%d %H:%M:%S")
    except Exception:
        return None


def slug(s):
    s = s.lower()
    for a, b in {
        "á": "a",
        "é": "e",
        "í": "i",
        "ó": "o",
        "ú": "u",
        "ø": "o",
        "å": "a",
        "æ": "ae",
        "ñ": "n",
        "/": "-",
        " ": "-",
    }.items():
        s = s.replace(a, b)
    s = re.sub(r"[^a-z0-9\-]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s[:48] or "act"


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


day_stop = {
    "2022-07-16": "Dia01",
    "2022-07-17": "Dia02",
    "2022-07-18": "Dia03",
    "2022-07-19": "Dia04",
    "2022-07-20": "Dia05",
    "2022-07-21": "Dia06",
    "2022-07-22": "Dia06",
    "2022-07-23": "Dia06",
}

stop_meta = {
    "Dia01": {
        "name": "Hacia los fiordos",
        "dayLabel": "Día 01",
        "summary": "Salida hacia el oeste: Hønefoss, Gol y carreteras de montaña camino de los fiordos.",
        "longitude": 8.9450,
        "latitude": 60.6990,
    },
    "Dia02": {
        "name": "Briksdal y Nordfjord",
        "dayLabel": "Día 02",
        "summary": "Glaciar Briksdalsbreen y entorno del Nordfjord (Loen/Olden/Stryn).",
        "longitude": 6.8880,
        "latitude": 61.6620,
    },
    "Dia03": {
        "name": "Flam y Naeroyfjord",
        "dayLabel": "Día 03",
        "summary": "Flam, Gudvangen y el Naeroyfjord: valle, fiordo y miradores.",
        "longitude": 7.1134,
        "latitude": 60.8631,
    },
    "Dia04": {
        "name": "Bergen",
        "dayLabel": "Día 04",
        "summary": "Dia completo en Bergen: Bryggen, puerto y miradores sobre la ciudad.",
        "longitude": 5.3242,
        "latitude": 60.3913,
    },
    "Dia05": {
        "name": "Hardangerfjord",
        "dayLabel": "Día 05",
        "summary": "Recorrido por el Hardangerfjord: cascadas, orillas y pueblos del fiordo.",
        "longitude": 6.8000,
        "latitude": 60.4000,
    },
    "Dia06": {
        "name": "Oslo",
        "dayLabel": "Día 06",
        "summary": "Cierre en Oslo: centro, paseos urbanos y salida por Gardermoen.",
        "longitude": 10.7522,
        "latitude": 59.9139,
    },
}

GAP_MIN = 75
DIST_KM = 4.0
MAX_ACTIVITIES_PER_STOP = 7


def cluster_activities(items):
    if not items:
        return []
    clusters = [[items[0]]]
    for cur in items[1:]:
        prev = clusters[-1][-1]
        dt_min = (cur["when"] - prev["when"]).total_seconds() / 60
        dist = hav(prev["lat"], prev["lon"], cur["lat"], cur["lon"])
        same_place = cur["place"] == prev["place"]
        place_change = (not same_place) and dist > 2.0
        # Keep same landmark together longer
        gap = 120 if same_place else GAP_MIN
        if (dt_min > gap and not same_place) or dist > DIST_KM or place_change:
            if same_place and dist <= DIST_KM and dt_min <= 180:
                clusters[-1].append(cur)
            else:
                clusters.append([cur])
        else:
            clusters[-1].append(cur)
    return clusters


def split_large_cluster(cl, max_size=90, max_parts=3):
    if len(cl) <= max_size:
        return [cl]
    cl = sorted(cl, key=lambda x: x["when"])
    n = min(max_parts, max(2, (len(cl) + max_size - 1) // max_size))
    size = len(cl) // n
    parts = []
    for i in range(n):
        start = i * size
        end = len(cl) if i == n - 1 else (i + 1) * size
        parts.append(cl[start:end])
    return parts


def merge_clusters(clusters):
    """Merge tiny clusters and consecutive same-place clusters; cap count."""
    if not clusters:
        return []
    # split huge same-place blobs (e.g. Bergen all day)
    expanded = []
    for cl in clusters:
        expanded.extend(split_large_cluster(cl))
    clusters = expanded

    merged = [clusters[0]]
    for cl in clusters[1:]:
        prev_name = activity_name(merged[-1])
        cur_name = activity_name(cl)
        if prev_name == cur_name and len(merged[-1]) + len(cl) < 100:
            # only merge if not already from a split of a huge day
            if len(merged[-1]) < 50:
                merged[-1].extend(cl)
            else:
                merged.append(cl)
        elif len(cl) < 4 and len(merged[-1]) < 40:
            merged[-1].extend(cl)
        else:
            merged.append(cl)

    # drop / absorb tiny leftovers
    cleaned = []
    for cl in merged:
        if cleaned and len(cl) < 3:
            cleaned[-1].extend(cl)
        else:
            cleaned.append(cl)
    merged = cleaned

    while len(merged) > MAX_ACTIVITIES_PER_STOP:
        sizes = [(i, len(c)) for i, c in enumerate(merged)]
        i, _ = min(sizes, key=lambda t: (t[1], abs(t[0] - len(merged) / 2)))
        if i == 0:
            merged[1] = merged[0] + merged[1]
            del merged[0]
        elif i == len(merged) - 1:
            merged[-2] = merged[-2] + merged[-1]
            del merged[-1]
        else:
            if len(merged[i - 1]) <= len(merged[i + 1]):
                merged[i - 1] = merged[i - 1] + merged[i]
                del merged[i]
            else:
                merged[i + 1] = merged[i] + merged[i + 1]
                del merged[i]
    return merged


def activity_name(cluster):
    return Counter(x["place"] for x in cluster).most_common(1)[0][0]


def named_activity(cluster, index, existing_names):
    """Nombre de lugar sin horarios; si se repite, sufijo numérico."""
    base = activity_name(cluster)
    name = base
    if name in existing_names:
        name = f"{base} ({index})"
    return base, name


def place_blurb(place: str) -> str:
    blurbs = {
        "Honefoss": (
            "Hønefoss marca el arranque del road trip hacia el oeste. Aquí el paisaje empieza a "
            "cambiar: ríos, puentes y la sensación de dejar atrás el área metropolitana de Oslo "
            "para entrar en la Noruega de carreteras de montaña. Merece la pena fijarse en el "
            "contraste entre el valle fluvial y las primeras crestas boscosas."
        ),
        "Gol": (
            "Gol y su entorno en Hallingdal son un clásico de paso en la E16/RV7: valles anchos, "
            "casas de madera y horizontes que se abren hacia el interior. Es una zona de "
            "transición perfecta para entender cómo Noruega cambia de escala cuando te alejas "
            "de la costa y te adentras en el macizo."
        ),
        "Hemsedal": (
            "Hemsedal es famosa por el esquí, pero en verano se lee de otra forma: picos limpios, "
            "pastos y un aire de estación de montaña. Las fotos aquí suelen captar la luz alta "
            "del norte y la verticalidad del valle."
        ),
        "Borgund stavkirke": (
            "La iglesia de madera de Borgund es una de las stavkirke mejor conservadas de Noruega: "
            "dragones tallados, tejados superpuestos y una atmósfera casi cinematográfica. "
            "Aunque el viaje sea de fiordos, esta parada conecta con la Noruega medieval."
        ),
        "Laerdal": (
            "Lærdal combina río, túneles legendarios y acceso a los fiordos del Sogne. El valle "
            "es estrecho y espectacular: un corredor natural hacia Aurland y Flåm, con "
            "paredes de roca y agua siempre cerca."
        ),
        "Briksdalsbreen": (
            "El glaciar Briksdalsbreen, brazo del Jostedalsbreen, es una de las postales más "
            "intensas del Nordfjord: lengua de hielo, cascadas y un valle esculpido por el "
            "hielo. La caminata corta hasta el frente glaciar suele ser el momento fuerte del día."
        ),
        "Stegastein": (
            "El mirador de Stegastein se asoma sobre el Aurlandsfjord con una pasarela de madera "
            "que parece flotar. Desde aquí se entiende la profundidad del fiordo: agua oscura, "
            "paredes verticales y granjas minúsculas en las laderas."
        ),
        "Flam": (
            "Flåm es el corazón turístico del Aurlandsfjord: puerto, tren y paisaje de valle "
            "glaciar. Ideal para pasear junto al agua, mirar el tren de cremallera y sentir "
            "cómo el fiordo se estrecha hacia el interior."
        ),
        "Flam railway": (
            "La Flåmsbana es uno de los trenes más espectaculares de Europa: desciende (o sube) "
            "el valle entre cascadas, túneles y curvas imposibles. Aunque sea un trayecto corto, "
            "la densidad de paisaje por kilómetro es altísima."
        ),
        "Undredal": (
            "Undredal es un pueblo diminuto del fiordo, famoso por sus cabras y su queso. "
            "Las casas de madera junto al agua y la escala humana del lugar contrastan con "
            "la inmensidad de las paredes del Nærøyfjord."
        ),
        "Gudvangen": (
            "Gudvangen abre la puerta al Nærøyfjord, Patrimonio de la Unesco: un fiordo estrecho, "
            "casi de cuento, con cascadas y paredes que parecen cerrarse sobre el barco o la "
            "carretera. Es uno de los tramos más fotogénicos de todo el viaje."
        ),
        "Bergen centro": (
            "Bergen se despliega entre montañas y mar: calles empedradas, ambiente portuario y "
            "esa luz húmeda tan típica de la costa oeste. El centro invita a perderse sin prisa "
            "entre plazas, cafés y vistas al puerto."
        ),
        "Bergen Bryggen": (
            "Bryggen, el muelle hanseático, es el icono de Bergen: hileras de casas de madera "
            "de colores, callejones estrechos y una historia de comercio que se respira en cada "
            "tablero. Es Unesco y, aún hoy, el corazón emocional de la ciudad."
        ),
        "Hardangerfjord": (
            "El Hardangerfjord es más amplio y agrícola que otros fiordos: frutales, orillas "
            "suaves y montañas al fondo. En julio, si hay suerte, el contraste entre verde "
            "intenso y agua gris-azul es especialmente bonito."
        ),
        "Voringsfossen": (
            "Vøringsfossen es una de las cascadas más famosas de Noruega: un salto brutal en "
            "el borde del cañón de Måbødalen. Los miradores permiten sentir el vacío y el "
            "ruido del agua; conviene ir con calma y buen calzado."
        ),
        "Vigeland / Frogner": (
            "El parque de Vigeland en Frogner es una lección de escultura al aire libre: cientos "
            "de figuras de bronce y granito sobre temas humanos. Es uno de los espacios más "
            "visitados de Oslo y funciona igual de bien con sol o con cielo gris."
        ),
        "Operahuset Oslo": (
            "La Ópera de Oslo, con su mármol blanco que se puede caminar, redefine el puerto: "
            "arquitectura contemporánea, vistas al fiordo y una terraza-tejado que invita a "
            "subir despacio. Es la postal moderna de la capital."
        ),
        "Akershus": (
            "La fortaleza de Akershus vigila el puerto desde hace siglos. Murallas, cañones y "
            "perspectivas sobre el waterfront: un contraste perfecto con la Ópera y Aker Brygge, "
            "y un cierre histórico al circuito urbano."
        ),
        "Gardermoen (OSL)": (
            "Gardermoen es la puerta de salida (o de llegada) del viaje: aeropuerto eficiente "
            "y el último recuerdo de Noruega antes del vuelo. Útil para cerrar el road trip "
            "con la cabeza ya en el regreso."
        ),
        "Oslo centro": (
            "El centro de Oslo mezcla bulevares, tiendas y vida cotidiana nórdica. Es el "
            "contrapunto urbano a los fiordos: cafés, tranvías y una ciudad que se camina bien "
            "a escala humana."
        ),
        "Aker Brygge": (
            "Aker Brygge es el paseo portuario contemporáneo: terrazas, muelles y ambiente "
            "de after-work junto al agua. Ideal para una tarde ligera tras Vigeland o la Ópera."
        ),
    }
    return blurbs.get(
        place,
        (
            f"Parada en <strong>{place}</strong> durante el road trip noruego. "
            "El paisaje aquí combina carretera, naturaleza y esa luz del norte que cambia "
            "de minuto en minuto: conviene mirar más allá del asfalto y fijarse en el relieve, "
            "el agua y los pueblos que aparecen al borde del fiordo o del valle."
        ),
    )


def pick_images(cluster, max_n=5):
    cluster = sorted(cluster, key=lambda x: x["when"])
    if len(cluster) <= max_n:
        return cluster
    if max_n == 1:
        return [cluster[len(cluster) // 2]]
    idxs = [round(i * (len(cluster) - 1) / (max_n - 1)) for i in range(max_n)]
    seen = set()
    picked = []
    for i in idxs:
        if i in seen:
            for j in range(len(cluster)):
                if j not in seen:
                    i = j
                    break
        seen.add(i)
        picked.append(cluster[i])
    return picked


def activity_desc(cluster, name: str) -> str:
    blurb = place_blurb(name)
    return (
        f"{blurb}<br><br>"
        f"En este tramo del día nos detuvimos en <strong>{name}</strong> para recorrer el "
        f"entorno, hacer fotos y asimilar el cambio de paisaje antes de continuar la ruta."
    )


def day_summary_text(day_label: str, stop_name: str, activity_names: list[str], base_summary: str) -> str:
    stages = " → ".join(activity_names[:8])
    if len(activity_names) > 8:
        stages += "…"
    return (
        f"{base_summary} "
        f"A lo largo del día ({day_label}) las etapas principales fueron: {stages}. "
        f"Es un resumen del {stop_name.lower()}: conducción real por carreteras noruegas, "
        f"paradas para miradores y pueblos, y mucho paisaje entre fiordo, valle y montaña."
    )


def main():
    src = find_src()
    print("SRC", src)
    if SCAN.exists():
        rows = json.loads(SCAN.read_text(encoding="utf-8"))
        print("Reusing scan", SCAN.name, len(rows))
    else:
        print("Scanning EXIF…")
        rows = scan_exif(src)
        print("Scanned", len(rows))

    photos = []
    for r in rows:
        if r.get("lat") is None or not r.get("dt"):
            continue
        dt = parse_dt(r["dt"])
        if not dt:
            continue
        place, dist = nearest(r["lat"], r["lon"])
        photos.append({**r, "when": dt, "day": dt.strftime("%Y-%m-%d"), "place": place, "pdist": dist})
    photos.sort(key=lambda x: x["when"])

    by_stop = defaultdict(list)
    for p in photos:
        sid = day_stop.get(p["day"])
        if sid:
            by_stop[sid].append(p)

    if OUT_ASSETS.exists():
        for child in list(OUT_ASSETS.iterdir()):
            if child.is_dir():
                shutil.rmtree(child)
            elif child.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}:
                child.unlink(missing_ok=True)
    OUT_ASSETS.mkdir(parents=True, exist_ok=True)

    stop_order = ["Dia01", "Dia02", "Dia03", "Dia04", "Dia05", "Dia06"]
    stops_out = []
    landing_src = None

    for sid in stop_order:
        items = by_stop.get(sid, [])
        if not items:
            print("SKIP empty", sid)
            continue
        meta = stop_meta[sid]
        clusters = merge_clusters(cluster_activities(items))

        stop_dir = OUT_ASSETS / sid
        stop_dir.mkdir(parents=True, exist_ok=True)

        densest = max(clusters, key=len)
        cover_pick = pick_images(densest, 1)[0]
        cover_name = f"{sid}_portada.jpg"
        shutil.copy2(src / cover_pick["file"], stop_dir / cover_name)
        if sid == "Dia04" and landing_src is None:
            landing_src = src / cover_pick["file"]

        activities = []
        for i, cl in enumerate(clusters, 1):
            existing = {a["name"] for a in activities}
            base_name, name = named_activity(cl, i, existing)
            place_slug = slug(base_name)
            act_id = f"{sid.lower()}-act{i:02d}-{place_slug}"
            act_folder = f"{i:02d}_{place_slug}"
            act_dir = stop_dir / act_folder
            act_dir.mkdir(parents=True, exist_ok=True)
            picks = pick_images(cl, 5)
            images = []
            for j, ph in enumerate(picks, 1):
                # Nombre con sentido: Dia01_01_Honefoss_01.jpg
                fname = f"{sid}_{i:02d}_{place_slug}_{j:02d}.jpg"
                shutil.copy2(src / ph["file"], act_dir / fname)
                images.append(f"/assets/norge/{sid}/{act_folder}/{fname}")
            lat = sum(x["lat"] for x in cl) / len(cl)
            lon = sum(x["lon"] for x in cl) / len(cl)
            activities.append(
                {
                    "id": act_id,
                    "name": name,
                    "description": activity_desc(cl, base_name),
                    "images": images,
                    "longitude": round(lon, 5),
                    "latitude": round(lat, 5),
                }
            )
            print(f"{sid} | {i:02d} {name} | raw={len(cl)} kept={len(images)} -> {act_folder}")

        stops_out.append(
            {
                "id": sid,
                "name": meta["name"],
                "dayLabel": meta["dayLabel"],
                "longitude": meta["longitude"],
                "latitude": meta["latitude"],
                "summary": day_summary_text(
                    meta["dayLabel"],
                    meta["name"],
                    [a["name"] for a in activities],
                    meta["summary"],
                ),
                "images": [f"/assets/norge/{sid}/{cover_name}"],
                "activities": activities,
            }
        )

    if landing_src and landing_src.exists():
        shutil.copy2(landing_src, OUT_ASSETS / "norge_landing.jpg")

    lines = []
    lines.append("export interface NorgeActivity {")
    lines.append("  id: string;")
    lines.append("  name: string;")
    lines.append("  description: string;")
    lines.append("  images: string[];")
    lines.append("  /** Si hay coords, se puede calcular trayecto en coche entre actividades del día. */")
    lines.append("  longitude?: number;")
    lines.append("  latitude?: number;")
    lines.append("}")
    lines.append("")
    lines.append("export interface NorgeStop {")
    lines.append("  id: string;")
    lines.append("  name: string;")
    lines.append("  dayLabel: string;")
    lines.append("  longitude: number;")
    lines.append("  latitude: number;")
    lines.append("  summary: string;")
    lines.append("  images: string[];")
    lines.append("  activities: NorgeActivity[];")
    lines.append("}")
    lines.append("")
    lines.append("export interface NorgeTip {")
    lines.append("  id: string;")
    lines.append("  title: string;")
    lines.append("  body: string;")
    lines.append("}")
    lines.append("")
    lines.append("export interface NorgeCost {")
    lines.append("  id: string;")
    lines.append("  category: string;")
    lines.append("  label: string;")
    lines.append("  amountHint: string;")
    lines.append("}")
    lines.append("")
    lines.append("export interface NorgeStopLegView {")
    lines.append("  fromStopId: string;")
    lines.append("  toStopId: string;")
    lines.append("  fromName: string;")
    lines.append("  toName: string;")
    lines.append("  distanceKm: number;")
    lines.append("  durationMin: number;")
    lines.append("  durationLabel: string;")
    lines.append("}")
    lines.append("")
    lines.append("/** Generado desde EXIF (GPS + fecha) del viaje julio 2022. Max. 5 fotos/actividad. */")
    lines.append("export const norgeRoute = {")
    lines.append("  title: 'Noruega: road trip por los fiordos',")
    lines.append("  subtitle: 'Ruta real julio 2022 — paradas y actividades desde metadatos de las fotos.',")
    lines.append("  stops: [")

    for st in stops_out:
        lines.append("    {")
        lines.append(f"      id: '{st['id']}',")
        lines.append(f"      name: '{esc(st['name'])}',")
        lines.append(f"      dayLabel: '{esc(st['dayLabel'])}',")
        lines.append(f"      longitude: {st['longitude']},")
        lines.append(f"      latitude: {st['latitude']},")
        lines.append(f"      summary: '{esc(st['summary'])}',")
        lines.append(f"      images: ['{st['images'][0]}'],")
        lines.append("      activities: [")
        for a in st["activities"]:
            imgs = ", ".join(f"'{im}'" for im in a["images"])
            lines.append("        {")
            lines.append(f"          id: '{a['id']}',")
            lines.append(f"          name: '{esc(a['name'])}',")
            lines.append(f"          description: '{esc(a['description'])}',")
            lines.append(f"          images: [{imgs}],")
            lines.append(f"          longitude: {a['longitude']},")
            lines.append(f"          latitude: {a['latitude']},")
            lines.append("        },")
        lines.append("      ],")
        lines.append("    },")

    lines.append("  ] as NorgeStop[],")
    lines.append("  tips: [")
    lines.append(
        "    { id: 'car', title: 'Coche y peajes', body: 'Noruega en coche de alquiler; peajes AutoPASS. Ruta real reconstruida desde las fotos del viaje.' },"
    )
    lines.append(
        "    { id: 'ferry', title: 'Ferries', body: 'Algunos tramos de fiordo se cruzan en ferry. En temporada alta conviene reservar.' },"
    )
    lines.append(
        "    { id: 'weather', title: 'Clima', body: 'Julio: dias largos, pero el tiempo cambia rapido. Capas impermeables.' },"
    )
    lines.append(
        "    { id: 'driving', title: 'Conduccion', body: 'Carreteras estrechas, tuneles y fauna. No te fies solo del GPS sin cobertura.' },"
    )
    lines.append("  ] as NorgeTip[],")
    lines.append("  costs: [")
    lines.append(
        "    { id: 'rental', category: 'Transporte', label: 'Alquiler de coche', amountHint: '— NOK (por definir)' },"
    )
    lines.append(
        "    { id: 'fuel', category: 'Transporte', label: 'Combustible + peajes', amountHint: '— NOK (por definir)' },"
    )
    lines.append(
        "    { id: 'ferry', category: 'Transporte', label: 'Ferries', amountHint: '— NOK (por definir)' },"
    )
    lines.append(
        "    { id: 'stay', category: 'Alojamiento', label: 'Hoteles / cabanas', amountHint: '— NOK (por definir)' },"
    )
    lines.append(
        "    { id: 'food', category: 'Comida', label: 'Comidas y supermercado', amountHint: '— NOK (por definir)' },"
    )
    lines.append("  ] as NorgeCost[],")
    lines.append("};")
    lines.append("")

    OUT_TS.write_text("\n".join(lines), encoding="utf-8")
    nimg = len(list(OUT_ASSETS.rglob("*.jpg"))) + len(list(OUT_ASSETS.rglob("*.jpeg")))
    print("TS", OUT_TS)
    print("images", nimg, "stops", len(stops_out), "acts", sum(len(s["activities"]) for s in stops_out))


if __name__ == "__main__":
    main()
