import { endOfDay, startOfDay } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

export const PARIS_TZ = "Europe/Paris";

export function getParisDayBounds(reference = new Date()): { start: Date; end: Date } {
  const inParis = toZonedTime(reference, PARIS_TZ);
  const startParis = startOfDay(inParis);
  const endParis = endOfDay(inParis);

  return {
    start: fromZonedTime(startParis, PARIS_TZ),
    end: fromZonedTime(endParis, PARIS_TZ),
  };
}
