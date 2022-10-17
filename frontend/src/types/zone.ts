import { FeatureCollection, Geometry } from "geojson";

export type ZoneProperties = {
  id: string;
  displayName: string;
  zoneType: "REGION" | "COUNTRY" | "CITY" | "DISTRICT";
  status: "SAFE" | "RISKY" | "DANGEROUS";
};

export type ZoneFeature = FeatureCollection<Geometry, ZoneProperties>;

export type ZoneResType = { zones: ZoneFeature };
