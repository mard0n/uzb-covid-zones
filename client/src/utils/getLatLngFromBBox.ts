export const getLatLngFromBBox = (bbox: number[] | undefined): [number, number][] => {
  const [minLng, minLat, maxLng, maxLat] = bbox || [];
  return [
    [maxLat, maxLng],
    [minLat, minLng],
  ];
};