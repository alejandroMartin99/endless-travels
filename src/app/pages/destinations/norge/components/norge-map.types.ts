export interface NorgeMapDayPoint {
  letter: string;
  name: string;
  longitude: number;
  latitude: number;
  /** Cómo se llega a este punto desde el anterior. */
  arriveBy?: 'driving' | 'boat' | 'bus' | 'train' | 'lodging' | 'ruta';
  /** Día al que pertenece (para marcadores grises de otros días). */
  stopId?: string;
  /** false = día no seleccionado (gris). */
  active?: boolean;
  /** Índice 0-based dentro del día (actividades con coords). */
  pointIndex?: number;
}

export interface NorgeMapLegLabel {
  longitude: number;
  latitude: number;
  text: string;
}
