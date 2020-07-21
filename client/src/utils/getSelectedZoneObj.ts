import { Zone } from "../types/zone";

export const getSelectedZoneObjById = (id: string, zones: Zone[] = []) => {
  return zones.find((zone: any) => zone._id === id);
};
