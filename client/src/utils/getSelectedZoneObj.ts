export const getSelectedZoneObjById = (id: string, zones: any = []) => {
  return zones.find((zone: any) => zone._id === id);
};
