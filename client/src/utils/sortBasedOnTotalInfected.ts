import { Zone, PlaceType } from "../types/zone";

export const sortBasedOnTotalInfected = (
  zones: Zone[],
  acceptedZoneTypes: PlaceType[]
): Zone[] => {
  return zones
    .sort(
      (a, b) =>
        b?.properties?.total?.infectedNumber -
        a?.properties?.total?.infectedNumber
    )
    .filter((zone) => acceptedZoneTypes.includes(zone?.properties?.placeType));
};
