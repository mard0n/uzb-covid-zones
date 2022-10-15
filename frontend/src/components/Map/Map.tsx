import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";

export interface MapComponentProps {}

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESSTOKEN;

const MapComponent: React.FC<MapComponentProps> = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState(64.62);
  const [lat, setLat] = useState(40.93);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current || "", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: zoom, // starting zoom
      minZoom: 5,
      maxZoom: 12,
    });
  }, []);

  useEffect(() => {
    if (map.current) {
      map.current.on("move", () => {
        setLng(parseInt(map.current?.getCenter().lng.toFixed(4) || ""));
        setLat(parseInt(map.current?.getCenter().lat.toFixed(4) || ""));
        setZoom(parseInt(map.current?.getZoom().toFixed(2) || ""));
      });
    }
  }, [map.current]);

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
