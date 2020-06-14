export const getInfectionStatus = (infected: number, zoneStatus = []) => {
  return zoneStatus.find((zone: any) => {
    const [from = 0, to = Infinity] = zone?.range;
    return infected >= from && infected <= to;
  });
};
