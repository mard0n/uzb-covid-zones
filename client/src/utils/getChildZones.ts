import { Zone } from "../types/zone";

export const getChildZones = (children: string[], zones: Zone[]) => {
  return zones.filter((zone) => children.includes(zone._id));
};
