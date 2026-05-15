import mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

/** Token público Mapbox (pk.*): `environment.user.ts` (gitignored) + restricciones por URL en Mapbox. */
export function applyMapboxPublicToken(): boolean {
  const t = environment.mapboxAccessToken?.trim() ?? '';
  if (!t) {
    console.warn(
      '[mapbox] Sin pk: crea/edita src/environments/environment.user.ts tras npm install.',
    );
    return false;
  }
  mapboxgl.accessToken = t;
  return true;
}
