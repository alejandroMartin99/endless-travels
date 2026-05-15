/**
 * Tras `npm install` se copia a `environment.user.ts` si no existe (local).
 * Producción/Vercel/CI: define MAPBOX_PUBLIC_TOKEN (pk.*) como variable del build;
 * `prebuild` reescribe `environment.user.ts` antes del bundle.
 */
export const USER_MAPBOX_PK = '';
