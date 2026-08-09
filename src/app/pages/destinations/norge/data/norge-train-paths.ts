/**
 * Flåmsbana aproximada Flåm ↔ Myrdal (ida y vuelta por el valle).
 * [lng, lat] — no es vía exacta; sirve para km/tiempo y trazo en mapa.
 */
export const flamsbanaRoundTripPath: Array<[number, number]> = [
  [7.11318, 60.86295], // Flåm
  [7.11450, 60.85000],
  [7.11680, 60.83500],
  [7.12000, 60.82000],
  [7.12250, 60.80000],
  [7.12400, 60.78000],
  [7.12350, 60.76000],
  [7.12280, 60.75000],
  [7.12050, 60.74300], // Myrdal (aprox.)
  // vuelta
  [7.12280, 60.75000],
  [7.12350, 60.76000],
  [7.12400, 60.78000],
  [7.12250, 60.80000],
  [7.12000, 60.82000],
  [7.11680, 60.83500],
  [7.11450, 60.85000],
  [7.11318, 60.86295], // Flåm
];
