import { BBox } from "@turf/turf";

export enum ZoneStatus {
  RED = "RED",
  YELLOW = "YELLOW",
  GREEN = "GREEN",
}

export enum PlaceType {
  DISTRICT = "DISTRICT",
  CITY = "CITY",
  REGION = "REGION",
  COUNTRY = "COUNTRY"
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
    displayNameUz: string;
    displayNameRu: string;
    alias: string[];
    parentZone: string;
    childZones: string[];
    placeType: PlaceType;
    status: ZoneStatus;
    total: Total;
    history: History[];
    restrictionsUz: any;
    restrictionsRu: any;
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
