import { Zone } from "../types/zone";

export const getChildZones = (
  children: number[] | undefined,
  zones: Zone[]
) => {
  return zones.filter((zone) => children?.includes(zone.properties?.refId));
};
