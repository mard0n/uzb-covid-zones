import React, { FunctionComponent, useContext, useEffect, useRef } from "react";
import L, {
  Map,
  MapOptions,
  GeoJSON,
  Layer,
  LeafletEvent,
  LeafletMouseEvent,
} from "leaflet";
import "leaflet/dist/leaflet.css";
import { Controlls } from "./Controlls";
import { StateContext } from "state/StateContext";
import { Zone, ZoneStatus } from "types/zone";
import { getLatLngFromBBox } from "utils/getLatLngFromBBox";
import {
  ADD_NAVIGATE_TO_FN,
  ADD_SELECTED_ZONE_ID,
} from "state/reducers/appReducer";
import getZoneStatusProps from "utils/getZoneStatusProps";
import { getProperDisplayName } from "utils/getProperDisplayName";
import { useTranslation } from "react-i18next";
import { getSelectedZoneObjById } from "utils/getSelectedZoneObj";
import { Theme, useMediaQuery } from "@material-ui/core";

export interface MapTestProps {
  closeBottomSheet?: () => void;
}

const latInt = 40.92930626579717;
const lngInt = 64.61999498705462;
const zoomInt = 5;

const mapOptions: MapOptions = {
  renderer: L.canvas({ padding: 1 }),
  zoomControl: false,
  zoomSnap: 1, // more granular scroll
  zoomDelta: 1, // zoom change when we use controls
  minZoom: 4,
};

const MapTest: FunctionComponent<MapTestProps> = ({ closeBottomSheet }) => {
  const { zones = [], selectedZoneId, dispatch } = useContext(StateContext);
  const selectedZone = getSelectedZoneObjById(selectedZoneId, zones);
  const map = useRef<any>();
  const geoJson = useRef<GeoJSON>();
  const selectedLayer = useRef<any>();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const { t } = useTranslation();
  // console.log("selectedZone", selectedZone);
  const layerStyle = (status: ZoneStatus, isHighlighted: boolean = false) => {
    let fillColor;
    let fillOpacity;

    switch (status) {
      case ZoneStatus.DANGEROUS:
        fillColor = isHighlighted ? "#FA0303" : "#FB3535";
        fillOpacity = isHighlighted ? 0.3 : 0.2;
        break;
      case ZoneStatus.RISKY:
        fillColor = isHighlighted ? "#FAFF00" : "#FAFF00";
        fillOpacity = isHighlighted ? 0.4 : 0.2;
        break;
      case ZoneStatus.SAFE:
        fillColor = isHighlighted ? "#23FF00" : "#23FD00";
        fillOpacity = isHighlighted ? 0.5 : 0.2;
        break;
      default:
        fillColor = "#23FD00";
        fillOpacity = 0.2;
        break;
    }
    return { fillColor, fillOpacity };
  };
  const isLayerVisible = (zone: Zone, map: any) => {
    const mapZoomLevel = map.getZoom();
    let zoneType: "COUNTRY" | "REGION" | "DISTRICT" = "DISTRICT";
    if (!zone.properties.parentZone && zone.properties.childZones.length) {
      zoneType = "COUNTRY";
    } else if (
      zone.properties.parentZone &&
      zone.properties.childZones.length
    ) {
      zoneType = "REGION";
    } else if (
      zone.properties.parentZone &&
      !zone.properties.childZones.length
    ) {
      zoneType = "DISTRICT";
    }

    if (zoneType === "COUNTRY" && mapZoomLevel <= 5) {
      return true;
    } else if (zoneType === "REGION" && mapZoomLevel > 5 && mapZoomLevel <= 8) {
      return true;
    } else if (zoneType === "DISTRICT" && mapZoomLevel > 8) {
      return true;
    } else {
      return false;
    }
  };
  const highlightLayer = (layer: any) => {
    const status = layer.feature?.properties?.status;
    const { fillColor, fillOpacity } = layerStyle(status, true);
    layer.setStyle({
      fillColor: fillColor,
      fillOpacity: fillOpacity,
    });
  };
  const dehighlightLayer = (layer: any) => {
    const status = layer.feature?.properties?.status;
    const { fillColor, fillOpacity } = layerStyle(status, false);
    layer.setStyle({
      fillColor: fillColor,
      fillOpacity: fillOpacity,
    });
  };
  const showOnlyRelevantZones = () => {
    geoJson.current?.eachLayer((layer: any) => {
      const isVisible = isLayerVisible(layer.feature, map.current);
      if (!isVisible) {
        map.current.removeLayer(layer);
      } else {
        map.current.addLayer(layer);
      }
      // console.log("geoJson isVisible", isVisible);
    });
  };

  const flyToSelectedZone = (selectedZone: Zone) => {
    console.log("flyToSelectedZone selectedZone", selectedZone);
    const latLng = getLatLngFromBBox(selectedZone?.bbox);
    map.current?.flyToBounds(latLng);
  };

  useEffect(() => {
    map.current = L.map("map", mapOptions);
    const layerOptions: any = {
      attribution: mdUp
        ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        : "",
      edgeBufferTiles: 2, // loads tiles outside of view to better x, y scrolling
    };
    L.tileLayer(
      "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      // "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
      layerOptions
    ).addTo(map.current);

    map.current.setView([latInt, lngInt], zoomInt);

    const controls = L.Control.extend({
      options: {
        position: "bottomright",
      },
      onAdd: Controlls,
    });

    mdUp && map.current.addControl(new controls());

    map.current.on("zoomend", () => {
      const zoom = map.current?.getZoom();
      const latLng = map.current?.getCenter();

      if (latLng?.lat && latLng?.lng && zoom) {
        if ("URLSearchParams" in window) {
          const queryParam = new URLSearchParams(window.location.search);
          queryParam.set("lat", JSON.stringify(latLng.lat));
          queryParam.set("lng", JSON.stringify(latLng.lng));
          queryParam.set("zoom", JSON.stringify(zoom));
          queryParam.toString();
          const newRelativePathQuery =
            window.location.pathname + "?" + queryParam.toString();
          window.history.pushState(null, "", newRelativePathQuery);
        }
      }
      showOnlyRelevantZones();
    });

    dispatch({
      type: ADD_NAVIGATE_TO_FN,
      payload: flyToSelectedZone,
    });

    return () => {
      if (map.current && map.current.remove) {
        map.current.off();
        map.current.remove();
      }
    };
  }, [mdUp]);

  useEffect(() => {
    geoJson.current = L.geoJSON(zones as any, {
      style: (feat) => {
        const status = feat?.properties?.status;
        const { fillColor, fillOpacity } = layerStyle(status);

        return {
          fillColor: fillColor,
          fillOpacity: fillOpacity,
          color: "#A4A2AE",
          weight: 2,
        };
      },
      onEachFeature: (zone, layer: L.Layer) => {
        let openPopupTimer: NodeJS.Timeout;
        layer.on({
          click: (e: LeafletMouseEvent) => {
            geoJson.current?.resetStyle(selectedLayer.current);
            // console.log("zone", zone);

            highlightLayer(e.target);
            selectedLayer.current = e.target;
            dispatch({
              type: ADD_SELECTED_ZONE_ID,
              payload: (zone as any)?._id,
            });
            e.target.openPopup();
          },
          mouseover: (e: LeafletEvent) => {
            openPopupTimer = setTimeout(() => {
              e.target.openPopup();
            }, 700);
            highlightLayer(e.target);
          },
          mouseout: (e: LeafletEvent) => {
            clearTimeout(openPopupTimer);
            if (
              selectedLayer.current?.feature?._id === e.target?.feature?._id
            ) {
            } else {
              dehighlightLayer(e.target);
            }
          },
        });
        layer.bindPopup(
          `
          <style>
          .custom-popup-style .leaflet-popup-content-wrapper {
            background: #FFFFFF;
            box-shadow: 0px 4px 40px rgba(0, 30, 89, 0.09);
            border-radius: 11px;
          }
          .custom-popup-style .leaflet-popup-tip {
            box-shadow: 0px 4px 40px rgba(0, 30, 89, 0.09);
          }
          .custom-popup-style .title-container {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            margin-right: 8px;
            position: relative;
          }
          .custom-popup-style .zone-status-pin {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 4px;
            margin-right: 5px;
          }
          .custom-popup-style .zone-name {
            font-family: Rubik;
            font-size: 16px;
            font-weight: 500;
            line-height: 16px;
            color: #242B43;
            margin: 0;
          }
          .custom-popup-style .data {
            font-family: Rubik;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            margin: 0;
          }
          </style>
          <div class='title-container'>
            <span class="zone-status-pin" style="
              background-color: ${
                getZoneStatusProps(zone.properties?.status).textInBlueishBg
              }
            "></span>
            <h5 class="zone-name">${getProperDisplayName(zone as Zone)}</h5>
          </div>
          <p class="data infected" style="
            color: ${getZoneStatusProps(ZoneStatus.RISKY).textInWhiteBg}
          ">${t("dataType.infected")} ${
            zone.properties?.total?.infectedNumber
          }</p>
          <p class="data recovered" style="
            color: ${getZoneStatusProps(ZoneStatus.SAFE).textInWhiteBg}
          ">${t("dataType.recovered")} ${
            zone.properties?.total?.recoveredNumber
          }</p>
          <p class="data dead" style="
            color: ${getZoneStatusProps(ZoneStatus.DANGEROUS).textInWhiteBg}
          ">${t("dataType.dead")} ${zone.properties?.total?.deadNumber}</p>
          `,
          {
            className: "custom-popup-style",
          }
        );
      },
    }).addTo(map.current);

    showOnlyRelevantZones();

    return () => {};
  }, [zones]);

  // useEffect(() => {
  //   // console.log("selectedZone", selectedZone);
  //   if (selectedZone) {
  //     // const latLng = getLatLngFromBBox(selectedZone?.bbox);
  //     // map.current?.flyToBounds(latLng);

  //     // showOnlyRelevantZones();

  //     // if (closeBottomSheet) {
  //     //   closeBottomSheet();
  //     // }
  //   }
  // }, [selectedZone]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};

export default MapTest;
