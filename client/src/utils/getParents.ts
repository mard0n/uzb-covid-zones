import { Zone } from "../types/zone";
import { getLanguage } from "./getLanguage";
import { getProperDisplayName } from "./getProperDisplayName";

export const getParents = (
  zone: Zone,
  zones: Zone[],
  parentZoneList: string[] = []
): string => {
  const parentZone = zones.find((z) => z._id === zone.properties.parentZone);
  if (parentZone) {
    parentZoneList.push(getProperDisplayName(parentZone));
    return getParents(parentZone, zones, parentZoneList);
  } else {
    return parentZoneList.join(", ");
  }
};
