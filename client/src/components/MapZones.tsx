import React, { useRef, useState, useContext, useEffect } from "react";
import {
  Map,
  TileLayer,
  GeoJSON,
  Rectangle,
  Circle,
  FeatureGroup,
  CircleMarker,
} from "react-leaflet";
import * as turf from "@turf/turf";
import { getInfectionStatus } from "../utils/infection";
import { StateContext } from "../state/StateContext";
import { ADD_SELECTED_ZONE_ID } from "../state/reducers/appReducer";
import { getSelectedZoneObjById } from "../utils/getSelectedZoneObj";
import { featureEach } from "@turf/turf";

export interface MapZonesProps {
  closeBottomSheet?: () => void;
}

const MapZones: React.SFC<MapZonesProps> = (props) => {
  const { closeBottomSheet = () => {} } = props;
  const { zones = [], selectedZoneId, dispatch } = useContext(StateContext);
  const selectedZone = getSelectedZoneObjById(selectedZoneId, zones);
  const [zoomLevel, setZoomLevel] = useState(9);
  // console.log("Map Zones zones", zones);

  const mapRef = useRef<any>(null);

  useEffect(() => {
    console.log("selectedZone", selectedZone);
    if (selectedZone?.bbox?.length) {
      console.log(
        "mapRef.current?.leafletElement?.flyToBounds",
        mapRef.current?.leafletElement?.flyToBounds
      );
      const [westlon, minlat, eastlon, maxlat] = selectedZone?.bbox;
      mapRef.current?.leafletElement?.flyToBounds([
        [minlat, eastlon],
        [westlon, maxlat],
      ]);
    }
    return () => {};
  }, [selectedZone]);

  const handleZoom = (e: any) => {
    // closeBottomSheet();
    setZoomLevel(e.target._zoom);
  };
  const handleZoneSelect = (feature: any) => {
    console.log("onZoneSelect", feature);
    dispatch({
      type: ADD_SELECTED_ZONE_ID,
      payload: feature._id,
    });
  };

  return (
    <Map
      ref={mapRef}
      center={[40.7, 71.24]}
      zoom={9}
      style={{ width: "100%", height: "100%" }}
      onmoveend={handleZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        options={{
          styles: [
            {
              featureType: "all",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "administrative",
              elementType: "all",
              stylers: [
                {
                  visibility: "simplified",
                },
                {
                  color: "#5b6571",
                },
                {
                  lightness: "35",
                },
              ],
            },
            {
              featureType: "administrative.neighborhood",
              elementType: "all",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "landscape",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
                {
                  color: "#f3f4f4",
                },
              ],
            },
            {
              featureType: "landscape.man_made",
              elementType: "geometry",
              stylers: [
                {
                  weight: 0.9,
                },
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "geometry.fill",
              stylers: [
                {
                  visibility: "on",
                },
                {
                  color: "#83cead",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
                {
                  color: "#ffffff",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
                {
                  color: "#fee379",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "road.highway.controlled_access",
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "road.arterial",
              elementType: "all",
              stylers: [
                {
                  visibility: "simplified",
                },
                {
                  color: "#ffffff",
                },
              ],
            },
            {
              featureType: "road.arterial",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "road.arterial",
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
                {
                  color: "#7fc8ed",
                },
              ],
            },
          ],
        }}
      />
      <FeatureGroup>
        {zones.map((zone: any, i: any) => {
          // const { showFrom, showTo } = zone?.properties?.zoomRange;
          const placeType = zone?.properties?.placeType;
          console.log("zoomLevel", zoomLevel);
          let isShown;

          if (zoomLevel >= 9) {
            isShown = placeType === "DISTRICT" || placeType === "CITY";
          } else if (zoomLevel < 9 && zoomLevel >= 6) {
            isShown = placeType === "REGION";
          } else if (zoomLevel < 6) {
            isShown = placeType === "COUNRTY";
          }
          // const parent = zones.find(
          //   (z: any) => z._id === zone.properties.parentZone
          // );
          // console.log("parent -------", parent);

          // if (parent) {
          //   const [minlat, maxlat, minlng, maxlng] = parent?.bbox || [];
          //   const isParentInViewBounds = mapRef.current.leafletElement
          //     .getBounds()
          //     .contains([
          //       [minlat, minlng],
          //       [maxlat, maxlng],
          //     ]);
          //   isShown = !isParentInViewBounds;
          // } else {
          //   const [minlat, maxlat, minlng, maxlng] = zone?.bbox || [];
          //   const isZoneInViewBounds = mapRef.current.leafletElement
          //     .getBounds()
          //     .contains([
          //       [minlat, minlng],
          //       [maxlat, maxlng],
          //     ]);
          //   isShown = isZoneInViewBounds;
          // }
          // const isParentInsideBounds = parent
          // if()
          //   showFrom <= zoomLevel && showTo >= zoomLevel;

          // const infectionStatus: any = getInfectionStatus(
          //   zone?.properties?.history?.infectedNumber,
          //   zonesStatusDesc
          // );
          // if (isShown) {
          //   console.log("visible zone name", zone.properties.displayName);
          //   console.log(
          //     "visible zone parent",
          //     parent && parent.properties.displayName
          //   );
          // }
          return (
            isShown && (
              <>
                <GeoJSON
                  key={i}
                  data={zone}
                  onEachFeature={(feat: any, layer: any) => {
                    layer.on({ click: () => handleZoneSelect(zone) });
                  }}
                  style={(feat) => {
                    const status = zone?.properties?.status;
                    // console.log("status", status);
                    const color =
                      status === "RED"
                        ? "#ff5858"
                        : status === "YELLOW"
                        ? "#ffc182"
                        : "#2e8e58";
                    // console.log("color", color);
                    return {
                      fillColor: color,
                      fillOpacity: 0.4,
                      color: color,
                    };
                  }}
                />
              </>
            )
          );
        })}
      </FeatureGroup>
    </Map>
  );
};

export default MapZones;
