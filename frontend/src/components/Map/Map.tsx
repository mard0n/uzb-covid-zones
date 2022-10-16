import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map, MapboxGeoJSONFeature, Popup } from "mapbox-gl";
import { bbox as turfBbox, centerOfMass as turfCenterOfMass } from "@turf/turf";
import "./Map.css";

export interface MapComponentProps {
  zones: any;
  showOnlySelectedZones: boolean;
}

const moveToFitBounds = (map: Map, feature: MapboxGeoJSONFeature) => {
  const bbox = turfBbox(feature) as [number, number, number, number];

  map.fitBounds(bbox, { padding: 100 });
};
const popupGenerator = (feature: MapboxGeoJSONFeature) => {
  let statusColor, zoneName, infectedNumber, recoveredNumber, deadNumber;

  const { status, displayName } = feature.properties || {};

  switch (status) {
    case "DANGEROUS":
      statusColor = "#FF4967";
      break;
    case "RISKY":
      statusColor = "#FF9635";
      break;
    case "SAFE":
      statusColor = "#87D03F";
      break;
    default:
      statusColor = "#87D03F";
      break;
  }

  return `
  <div class='custom-popup-style'>
    <div class='title-container'>
      <span class="zone-status-pin" style="background-color: ${statusColor}"></span>
      <h5 class="zone-name" style="color: #242B43">${displayName}</h5>
    </div>
    <p class="data infected" style="color: #EF7C38">${"Infected: "} ${1000}</p>
    <p class="data recovered" style="color: #87D03F">${"Recovered: "} ${900}</p>
    <p class="data dead" style="color: #EA5C73">${"Dead: "} ${20}</p>
  </div>
  `;
};

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESSTOKEN;

const MapComponent: React.FC<MapComponentProps> = ({
  zones,
  showOnlySelectedZones,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const popup = useRef<Popup | null>(null);
  const [lng, setLng] = useState(64.62);
  const [lat, setLat] = useState(40.93);
  const [zoom, setZoom] = useState(4);
  console.log("zoom", zoom);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      minZoom: 4,
      maxZoom: 12,
    });

    popup.current = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
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

    moveToFitBounds(map.current, zones);

    if (!showOnlySelectedZones) {
      // If all zones are shown, apply usual zoom step and zoneType based filter
      map.current.setFilter("zones-layer", [
        "step",
        ["zoom"],
        ["==", ["get", "zoneType"], "COUNTRY"],
        6,
        ["==", ["get", "zoneType"], "REGION"],
        8,
        ["==", ["get", "zoneType"], "DISTRICT"],
      ]);
    }
    // else show all zones. Later on selecting childzone and parent zone should be prevented
    // to avoid zone overlaps

    let hoveredFeatureId: string | number | undefined | null = null;
    map.current.on("mousemove", "zones-layer", (e) => {
      if ((e.features && e.features.length <= 0) || !map.current) return;
      const feature = e.features?.[0] as MapboxGeoJSONFeature;

      if (hoveredFeatureId !== null) {
        map.current?.setFeatureState(
          { source: "zones", id: hoveredFeatureId },
          { hover: false }
        );
      }
      hoveredFeatureId = feature.id;
      map.current.setFeatureState(
        { source: "zones", id: hoveredFeatureId },
        { hover: true }
      );

      map.current.getCanvas().style.cursor = "pointer";
      const centerCoordinates = turfCenterOfMass(feature).geometry
        .coordinates as [number, number];
      const popupHtml = popupGenerator(feature);

      popup.current
        ?.setLngLat(centerCoordinates)
        .setHTML(popupHtml)
        .addTo(map.current);
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
      popup.current?.remove();
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
