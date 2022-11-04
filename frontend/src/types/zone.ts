import { FeatureCollection, Feature, Geometry } from "geojson";

export type ZoneProperties = {
  id: string;
  displayName: string;
  zoneType: "REGION" | "COUNTRY" | "CITY" | "DISTRICT";
  status: "SAFE" | "RISKY" | "DANGEROUS";
  parentZoneId: string;
  childZoneIds: string[];
};

export type ZoneFeature = Feature<Geometry, ZoneProperties>;
export type ZoneFeatureCollection = FeatureCollection<Geometry, ZoneProperties>;

export type ZoneResType = { zones: ZoneFeatureCollection };
