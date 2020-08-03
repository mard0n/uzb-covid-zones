import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useContext,
} from "react";
import L, { LeafletEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-edgebuffer";
// import PouchDB from "pouchdb";
// import "leaflet.tilelayer.pouchdbcached";
// import { CachedTileLayer } from "@yaga/leaflet-cached-tile-layer";
// import { scaleQuantize } from "d3-scale";
// import glify from "leaflet.glify";
// import vectorGrid from "leaflet.vectorgrid";
// import "leaflet.vectorgrid";
import { Zone, ZoneStatus } from "types/zone";
import { getLatLngFromBBox } from "utils/getLatLngFromBBox";
import getZoneStatusProps from "utils/getZoneStatusProps";
import { getProperDisplayName } from "utils/getProperDisplayName";
import { Controlls } from "./Controlls";
import { useMediaQuery, Theme } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { getSelectedZoneObjById } from "utils/getSelectedZoneObj";
import { StateContext } from "state/StateContext";
import {
  ADD_SELECTED_ZONE_ID,
  ADD_NAVIGATE_TO_FN,
} from "state/reducers/appReducer";
// window.PouchDB = PouchDB;
// L.vectorGrid = vectorGrid;

export interface MapProps {
  closeBottomSheet?: () => void;
}

const Map: React.SFC<MapProps> = (props) => {
  const { closeBottomSheet } = props;
  const { zones = [], selectedZoneId, dispatch } = useContext(StateContext);
  const selectedZone = getSelectedZoneObjById(selectedZoneId, zones);
  const { t } = useTranslation();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const mapContainer = useRef<any>();
  const map = useRef<any>();
  const selectedLayer = useRef<any>();
  const currentLocation = useRef<any>();

  const handleZoneSelect = (feature: Zone) => {
    dispatch({
      type: ADD_SELECTED_ZONE_ID,
      payload: feature._id,
    });

    closeBottomSheet && closeBottomSheet();
  };

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
    let isShown;
    let zoneZoomLevel;
    if (zone.properties?.childZones?.length) {
      zoneZoomLevel = map.getBoundsZoom(getLatLngFromBBox(zone.bbox)) || 18;
    } else {
      zoneZoomLevel = 18;
    }

    const parentZone = zones.find(
      (z) => z.properties.refId === zone.properties.parentZone
    );
    const parentZoomLevel =
      (parentZone && map.getBoundsZoom(getLatLngFromBBox(parentZone?.bbox))) ||
      0;

    const zoom = map?.getZoom() || 0;

    if (zoom <= zoneZoomLevel && zoom > parentZoomLevel) {
      // if (map.getBounds().overlaps(getLatLngFromBBox(zone.bbox))) {
      //   isShown = true;
      // } else {
      //   isShown = false;
      // }
      isShown = true;
    } else {
      isShown = false;
    }
    return isShown;
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

  const navigateTo = (
    { lat, lng, zoom = 12 }: { lat: number; lng: number; zoom: number },
    isMarked = true
  ) => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    }); // to show marker

    map.current?.setView({ lat, lng }, zoom, {
      animate: true,
    });
    currentLocation.current = new L.Marker({ lat, lng });
    currentLocation.current.addTo(map.current);
    // isMarked && setMarker({ lat, lng });
  };

  useEffect(() => {
    if (selectedZone) {
      const latLng = getLatLngFromBBox(selectedZone?.bbox);
      map.current?.flyToBounds(latLng);
    }
  }, [selectedZone]);


  useEffect(() => {
    const queryParam = new URLSearchParams(window.location.search);
    const lat = queryParam.get("lat");
    const lng = queryParam.get("lng");
    const zoom = queryParam.get("zoom");
    const latInt = (lat && parseFloat(lat)) || 40.92930626579717;
    const lngInt = (lng && parseFloat(lng)) || 64.61999498705462;
    const zoomInt = (zoom && parseFloat(zoom)) || 6;
    let geoJson: L.GeoJSON;
    map.current = L.map(mapContainer.current, {
      renderer: L.canvas({ padding: 1 }),
      zoomControl: false,
      // zoomSnap: 0,
    });

    const layerOptions: any = {
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      // useCache: true,
      // crossOrigin: true,
      // cacheMaxAge: 1000 * 60 * 60 * 24 * 7,
      edgeBufferTiles: 5,
    };
    L.tileLayer(
      "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      // "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
      layerOptions
    ).addTo(map.current);

    // new CachedTileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    //   attribution: `&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
    //   // databaseName: "tile-cache-data", // optional
    //   // databaseVersion: 1, // optional
    //   // objectStoreName: "OSM", // optional
    //   // crawlDelay: 500, // optional
    //   crossOrigin: false,
    //   maxAge: 1000 * 60 * 60 * 24 * 7, // optional,
    //   minZoom: 4,
    //   edgeBufferTiles: 5,
    // }).addTo(map.current);

    map.current.setView([latInt, lngInt], zoomInt);

    geoJson = L.geoJSON(zones as any, {
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
              getZoneStatusProps(zone.properties.status).textInBlueishBg
            }
          "></span>
          <h5 class="zone-name">${getProperDisplayName(zone as Zone)}</h5>
        </div>
    
        <p class="data infected" style="
          color: ${getZoneStatusProps(ZoneStatus.RISKY).textInWhiteBg}
        ">${t("dataType.infected")} ${zone.properties.total.infectedNumber}</p>
    
        <p class="data recovered" style="
          color: ${getZoneStatusProps(ZoneStatus.SAFE).textInWhiteBg}
        ">${t("dataType.recovered")} ${
            zone.properties.total.recoveredNumber
          }</p>
    
        <p class="data dead" style="
          color: ${getZoneStatusProps(ZoneStatus.DANGEROUS).textInWhiteBg}
        ">${t("dataType.dead")} ${zone.properties.total.deadNumber}</p>
        `,
          {
            className: "custom-popup-style",
          }
        );
        layer.on({
          click: (e) => {
            geoJson.resetStyle(selectedLayer.current);

            highlightLayer(e.target);
            selectedLayer.current = e.target;

            handleZoneSelect(zone as Zone);

            e.target.openPopup();
          },
          mouseover: (e: LeafletEvent) => {
            openPopupTimer = setTimeout(() => {
              e.target.openPopup();
            }, 1000);
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
      },
      // filter: (zone) => isLayerVisible(zone as Zone, map),
    }).addTo(map.current);

    map.current.on("movestart", () => {
      if (map.current && currentLocation.current) {
        map.current?.removeLayer(currentLocation.current);
      }
    });
    map.current.on("moveend", (e: any) => {
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
      geoJson.eachLayer((layer: any) => {
        // console.log("geoJson layer", layer);
        const isVisible = isLayerVisible(layer.feature, map.current);
        if (!isVisible) {
          map.current.removeLayer(layer);
        } else {
          map.current.addLayer(layer);
        }
        // console.log("geoJson isVisible", isVisible);
      });
    });

    const controls = L.Control.extend({
      options: {
        position: "bottomright",
      },

      onAdd: Controlls,
    });
    mdUp && map.current.addControl(new controls());

    dispatch({
      type: ADD_NAVIGATE_TO_FN,
      payload: navigateTo,
    });

    return () => {
      if (map.current && map.current.remove) {
        map.current.off();
        map.current.remove();
      }
    };
  }, [zones, mdUp]);
  return (
    <div ref={mapContainer} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default Map;
