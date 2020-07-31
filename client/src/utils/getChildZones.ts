import { Zone } from "../types/zone";

export const getChildZones = (
  children: string[] | undefined,
  zones: Zone[]
) => {
  return zones.filter((zone) => children?.includes(zone.properties.refId));
};
