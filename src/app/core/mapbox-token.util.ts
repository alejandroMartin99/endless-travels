import mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

/** Aplica token público Mapbox (pk.*) sin hardcodear en el repo. */
export function applyMapboxPublicToken(): boolean {
  const token = environment.mapboxAccessToken?.trim() ?? '';
  if (!token) {
    console.warn(
      '[mapbox] Configura mapboxAccessToken en src/environments/environment.ts (local, sin subir).',
    );
    return false;
  }
  mapboxgl.accessToken = token;
  return true;
}
