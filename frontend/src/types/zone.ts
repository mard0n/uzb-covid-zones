export type Zone = {
  type:
    | "FeatureCollection"
    | "Feature"
    | "GeometryCollection"
    | "Point"
    | "MultiPoint"
    | "LineString"
    | "MultiLineString"
    | "Polygon"
    | "MultiPolygon";
  properties: {};
  bbox: [number, number, number, number];
  geometry: {
    type:
      | "FeatureCollection"
      | "Feature"
      | "GeometryCollection"
      | "Point"
      | "MultiPoint"
      | "LineString"
      | "MultiLineString"
      | "Polygon"
      | "MultiPolygon";
    coordinates: [];
  };
};
