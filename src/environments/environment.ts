import { USER_MAPBOX_PK } from './environment.user';

/** pk.* en cliente: restringir orígenes en Mapbox; el valor real va en `environment.user.ts` (gitignored). */
export const environment = {
  mapboxAccessToken: (USER_MAPBOX_PK ?? '').trim(),
};
