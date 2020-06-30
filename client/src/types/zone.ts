import { BBox } from "@turf/turf";

export enum ZoneStatus {
  RED = "RED",
  YELLOW = "YELLOW",
  GREEN = "GREEN",
}

export type Total = {
  infectedNumber: number;
  recoveredNumber: number;
  deadNumber: number;
};
export type History = {
  _id: string;
  infectedNumber: number;
  recoveredNumber: number;
  deadNumber: number;
  date: Date;
};

export type Zone = {
  _id: string;
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
  properties: {
    displayName: string;
    alias: string[];
    placeType: string;
    status: ZoneStatus;
    total: Total;
    history: History[];
    restrictions: any;
  };
  bbox: BBox;
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
