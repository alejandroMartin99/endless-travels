import mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

/** Token público Mapbox (pk.*): local `environment.user.ts` o CI `MAPBOX_PUBLIC_TOKEN` (ver inject script). */
export function applyMapboxPublicToken(): boolean {
  const t = environment.mapboxAccessToken?.trim() ?? '';
  if (!t) {
    console.warn(
      '[mapbox] Sin token público (pk.*). Local: src/environments/environment.user.ts. Deploy: variable MAPBOX_PUBLIC_TOKEN en el build.',
    );
    return false;
  }
  mapboxgl.accessToken = t;
  return true;
}
