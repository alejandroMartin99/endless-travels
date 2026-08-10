import { ItineraryTravelMode } from '../../../../../../core/mapbox-directions.util';
import { day02Kyoto } from '../Kioto/Day02';
import { day03Kyoto } from '../Kioto/Day03';
import { day04Kyoto } from '../Kioto/Day04';
import { day05Kyoto } from '../Kioto/Day05';
import { day06Kyoto } from '../Kioto/Day06';
import { day07Kyoto } from '../Kioto/Day07';
import { day08Kyoto } from '../Kioto/Day08';
import { day09Tokio } from '../Tokio/Day09';
import { day10Tokio } from '../Tokio/Day10';
import { day11Tokio } from '../Tokio/Day11';
import { day12Tokio } from '../Tokio/Day12';
import { day13Tokio } from '../Tokio/Day13';
import { day14Tokio } from '../Tokio/Day14';
import { day15Tokio } from '../Tokio/Day15';

export interface JapanFullMapActivity {
  name: string;
  longitude: number;
  latitude: number;
  arriveBy?: ItineraryTravelMode;
}

export interface JapanFullMapDay {
  dayNumber: number;
  shortLabel: string;
  title: string;
  activities: JapanFullMapActivity[];
}

function toMapDay(
  dayNumber: number,
  pack: { day: { title: string; activities: Array<{ name: string; longitude: number; latitude: number; arriveBy?: ItineraryTravelMode }> } },
): JapanFullMapDay {
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

/** Días 2–15 (sin vuelo Día 01). */
export const JAPAN_FULL_MAP_DAYS: JapanFullMapDay[] = [
  toMapDay(2, day02Kyoto),
  toMapDay(3, day03Kyoto),
  toMapDay(4, day04Kyoto),
  toMapDay(5, day05Kyoto),
  toMapDay(6, day06Kyoto),
  toMapDay(7, day07Kyoto),
  toMapDay(8, day08Kyoto),
  toMapDay(9, day09Tokio),
  toMapDay(10, day10Tokio),
  toMapDay(11, day11Tokio),
  toMapDay(12, day12Tokio),
  toMapDay(13, day13Tokio),
  toMapDay(14, day14Tokio),
  toMapDay(15, day15Tokio),
];
