import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map, MapboxGeoJSONFeature } from "mapbox-gl";
import { bbox as turfBbox, centerOfMass as turfCenterOfMass } from "@turf/turf";
import "./Map.css";

export interface MapComponentProps {
  zones: any;
}

const moveToFitBounds = (map: Map, feature: MapboxGeoJSONFeature) => {
  const bbox = turfBbox(feature) as [number, number, number, number];

  map.fitBounds(bbox, { padding: 100 });
};

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESSTOKEN;

const MapComponent: React.FC<MapComponentProps> = ({ zones }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState(64.62);
  const [lat, setLat] = useState(40.93);
  const [zoom, setZoom] = useState(6);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current || "", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: zoom, // starting zoom
      minZoom: 4,
      maxZoom: 12,
    });
  }, []);

  useEffect(() => {
    if (!map.current) return;

    map.current.on("move", () => {
      setLng(parseInt(map.current?.getCenter().lng.toFixed(4) || ""));
      setLat(parseInt(map.current?.getCenter().lat.toFixed(4) || ""));
      setZoom(parseInt(map.current?.getZoom().toFixed(2) || ""));
    });
  }, [map.current]);

  useEffect(() => {
    if (!map.current || !zones) return;

    map.current.addSource("zones", {
      type: "geojson",
      data: zones,
    });
    map.current.addLayer({
      id: "zones-layer",
      type: "fill",
      source: "zones",
      layout: {},
      filter: [
        "step",
        ["zoom"],
        ["==", ["get", "zoneType"], "COUNTRY"],
        5,
        ["==", ["get", "zoneType"], "REGION"],
        8,
        ["==", ["get", "zoneType"], "DISTRICT"],
      ],
      paint: {
        "fill-color": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          [
            "case",
            ["==", ["get", "status"], "DANGEROUS"],
            "#FA0303",
            ["==", ["get", "status"], "RISKY"],
            "#FAFF00",
            ["==", ["get", "status"], "SAFE"],
            "#23FF00",
            "#23FF00",
          ],
          [
            "case",
            ["==", ["get", "status"], "DANGEROUS"],
            "#FB3535",
            ["==", ["get", "status"], "RISKY"],
            "#FAFF00",
            ["==", ["get", "status"], "SAFE"],
            "#23FD00",
            "#23FD00",
          ],
        ],
        "fill-opacity": [
          "case",
          ["boolean", ["feature-state", "hover"], false],
          [
            "case",
            ["==", ["get", "status"], "DANGEROUS"],
            0.3,
            ["==", ["get", "status"], "RISKY"],
            0.4,
            ["==", ["get", "status"], "SAFE"],
            0.5,
            0.5,
          ],
          [
            "case",
            ["==", ["get", "status"], "DANGEROUS"],
            0.2,
            ["==", ["get", "status"], "RISKY"],
            0.2,
            ["==", ["get", "status"], "SAFE"],
            0.2,
            0.2,
          ],
        ],
      },
    });

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });
    let hoveredFeatureId: string | number | undefined | null = null;
    map.current.on("mousemove", "zones-layer", (e) => {
      if ((e.features && e.features.length <= 0) || !map.current) return;

      if (hoveredFeatureId !== null) {
        map.current?.setFeatureState(
          { source: "zones", id: hoveredFeatureId },
          { hover: false }
        );
      }
      hoveredFeatureId = e.features?.[0].id;
      map.current.setFeatureState(
        { source: "zones", id: hoveredFeatureId },
        { hover: true }
      );

      map.current.getCanvas().style.cursor = "pointer";
      const centerCoordinates = turfCenterOfMass(e.features?.[0] as any)
        .geometry.coordinates as [number, number];
      popup.setLngLat(centerCoordinates).setHTML("test").addTo(map.current);
    });
    map.current.on("mouseleave", "zones-layer", (e) => {
      if (!map.current) return;

      if (hoveredFeatureId !== null) {
        map.current.setFeatureState(
          { source: "zones", id: hoveredFeatureId },
          { hover: false }
        );
      }
      hoveredFeatureId = null;

      map.current.getCanvas().style.cursor = "";
      popup.remove();
    });

    map.current.on("click", "zones-layer", (e) => {
      if (!map.current || !e.features) return;

      moveToFitBounds(map.current, e.features[0]);
    });

    return () => {
      if (map.current?.getSource("zones")) {
        map.current.removeLayer("zones-layer");
        map.current.removeSource("zones");
      }
    };
  }, [zones]);

  return (
    <div
      ref={mapContainer}
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: "100%",
      }}
    />
  );
};

export default MapComponent;
