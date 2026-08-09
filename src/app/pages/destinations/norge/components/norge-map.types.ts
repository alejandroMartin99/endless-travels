export interface NorgeMapDayPoint {
  letter: string;
  name: string;
  longitude: number;
  latitude: number;
  /** Cómo se llega a este punto desde el anterior. */
  arriveBy?: 'driving' | 'boat' | 'bus' | 'train' | 'lodging';
}

export interface NorgeMapLegLabel {
  longitude: number;
  latitude: number;
  text: string;
}
