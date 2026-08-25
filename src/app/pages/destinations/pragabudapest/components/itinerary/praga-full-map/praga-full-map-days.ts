import { ItineraryTravelMode } from '../../../../../../core/mapbox-directions.util';
import { day01Praga } from '../days/Day01';
import { day02Praga } from '../days/Day02';
import { day03Praga } from '../days/Day03';
import { day04Bratislava } from '../days/Day04';
import { day05Budapest } from '../days/Day05';
import { day06Budapest } from '../days/Day06';
import { day07Budapest } from '../days/Day07';
import { day09Budapest } from '../days/Day09';

export interface PragaFullMapActivity {
  name: string;
  longitude: number;
  latitude: number;
  arriveBy?: ItineraryTravelMode;
}

export interface PragaFullMapDay {
  dayNumber: number;
  shortLabel: string;
  title: string;
  activities: PragaFullMapActivity[];
}

function toMapDay(
  dayNumber: number,
  pack: {
    day: {
      title: string;
      activities: Array<{
        name: string;
        longitude: number;
        latitude: number;
        arriveBy?: ItineraryTravelMode;
      }>;
    };
  },
): PragaFullMapDay {
  return {
    dayNumber,
    shortLabel: `D${dayNumber}`,
    title: pack.day.title,
    activities: pack.day.activities
      .filter(a => a.latitude != null && a.longitude != null)
      .map(a => ({
        name: a.name,
        longitude: a.longitude,
        latitude: a.latitude,
        arriveBy: a.arriveBy,
      })),
  };
}

/** Días 1–7 y 9 (no hay Día 08 en el itinerario). */
export const PRAGA_FULL_MAP_DAYS: PragaFullMapDay[] = [
  toMapDay(1, day01Praga),
  toMapDay(2, day02Praga),
  toMapDay(3, day03Praga),
  toMapDay(4, day04Bratislava),
  toMapDay(5, day05Budapest),
  toMapDay(6, day06Budapest),
  toMapDay(7, day07Budapest),
  toMapDay(9, day09Budapest),
];
