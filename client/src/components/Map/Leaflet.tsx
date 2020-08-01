import React, { useEffect, useRef } from "react";
import L, { LeafletEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-edgebuffer";
// import PouchDB from "pouchdb";
// import "leaflet.tilelayer.pouchdbcached";
import { CachedTileLayer } from "@yaga/leaflet-cached-tile-layer";
// import { scaleQuantize } from "d3-scale";
// import glify from "leaflet.glify";
// import vectorGrid from "leaflet.vectorgrid";
// import "leaflet.vectorgrid";
import { Zone, ZoneStatus } from "types/zone";
import { getLatLngFromBBox } from "utils/getLatLngFromBBox";
import getZoneStatusProps from "utils/getZoneStatusProps";
import { getProperDisplayName } from "utils/getProperDisplayName";
import { Controlls } from "./Controlls";
// window.PouchDB = PouchDB;
// L.vectorGrid = vectorGrid;

export interface MapProps {
  zones: Zone[];
  handleZoneSelect: (zone: Zone) => void;
  t: any;
  selectedZone: Zone | undefined;
  navigateToRef: (
    fn: (
      { lat, lng, zoom }: { lat: number; lng: number; zoom: number },
      isMarked?: boolean
    ) => void
  ) => void;
}

const Map: React.SFC<MapProps> = (props) => {
  const { zones, handleZoneSelect, t, selectedZone, navigateToRef } = props;
  const mapContainer = useRef<any>();
  const map = useRef<any>();
  const selectedLayer = useRef<any>();

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
    map.current?.setView({ lat, lng }, zoom, {
      animate: true,
    });
    // isMarked && setMarker({ lat, lng });
  };

  useEffect(() => {
    if (selectedZone) {
      const latLng = getLatLngFromBBox(selectedZone?.bbox);
      map.current.flyToBounds(latLng, {
        animate: true,
        duration: 0.5,
      });
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
      zoomSnap: 0
    });

    map.current.on("load", (e: any) => {
      // console.log('map load event', e);
      // geoJson.addLayer()
      map.current.setZoom(zoomInt - 1);
      map.current.setZoom(zoomInt + 1);
    });

    // const layerOptions: any = {
    //   attribution:
    //     '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    //   // useCache: true,
    // // crossOrigin: true,
    //   // cacheMaxAge: 1000 * 60 * 60 * 24 * 7,
    //   edgeBufferTiles: 5,
    // };
    // const tileLayerRef = L.tileLayer(
    //   // "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    //   "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
    //   layerOptions
    // ).addTo(map.current);

    const tileLayerRef = new CachedTileLayer(
      "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      {
        attribution: `&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
        // databaseName: "tile-cache-data", // optional
        // databaseVersion: 1, // optional
        // objectStoreName: "OSM", // optional
        // crawlDelay: 500, // optional
        crossOrigin: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // optional,
        minZoom: 5,
        edgeBufferTiles: 5,
      }
    ).addTo(map.current);

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
              .custom-popup-style .leaflet-popup-close-button {
                display: none
              }
              .custom-popup-style .leaflet-popup-tip-container {
              }
              .custom-popup-style .leaflet-popup-tip {
                box-shadow: 0px 4px 40px rgba(0, 30, 89, 0.09);
              }
              .custom-popup-style .title-container {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
              }
              .custom-popup-style .zone-status-pin {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 4px;
                margin-right: 5px;
                background-color: ${
                  getZoneStatusProps(zone.properties.status).textInBlueishBg
                };
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
              .custom-popup-style .data.infected {
                color: ${getZoneStatusProps(ZoneStatus.RISKY).textInWhiteBg};
              }
              .custom-popup-style .data.recovered {
                color: ${getZoneStatusProps(ZoneStatus.SAFE).textInWhiteBg};
              }
              .custom-popup-style .data.dead {
                color: ${
                  getZoneStatusProps(ZoneStatus.DANGEROUS).textInWhiteBg
                };
              }
            </style>

            <div class='title-container'>
              <span class="zone-status-pin"></span>
              <h5 class="zone-name">${getProperDisplayName(zone as Zone)}</h5>
            </div>
            <p class="data infected">${t("dataType.infected")} ${
            zone.properties.total.infectedNumber
          }</p>
            <p class="data recovered">${t("dataType.recovered")} ${
            zone.properties.total.recoveredNumber
          }</p>
            <p class="data dead">${t("dataType.dead")} ${
            zone.properties.total.deadNumber
          }</p>

          `,
          {
            className: "custom-popup-style",
            autoPan: false,
            keepInView: true,
          }
        );
        layer.on({
          click: (e) => {
            geoJson.resetStyle(selectedLayer.current);

            highlightLayer(e.target);
            selectedLayer.current = e.target;

            handleZoneSelect(zone as Zone);
          },
          mouseover: (e: LeafletEvent) => {
            openPopupTimer = setTimeout(() => {
              e.target.openPopup();
            }, 1000);
            highlightLayer(e.target);
          },
          mouseout: (e: LeafletEvent) => {
            clearTimeout(openPopupTimer);
            console.log(
              "selectedLayer.current?.feature?._id",
              selectedLayer.current?.feature?._id
            );
            console.log("e.target.feature?._id", e.target.feature?._id);
            if (
              selectedLayer.current?.feature?._id === e.target?.feature?._id
            ) {
            } else {
              console.log("dehighlight");

              dehighlightLayer(e.target);
            }
          },
        });
      },
      // filter: (zone) => isLayerVisible(zone as Zone, map),
    }).addTo(map.current);

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

      onAdd: Controlls
    })
    map.current.addControl(new controls());
    // const data = {
    //   type: "FeatureCollection",
    //   features: zones,
    // };
    // const vectorGridRef = (L as any).vectorGrid.slicer(data, {
    //   // rendererFactory: L.canvas,
    //   rendererFactory: (L.svg as any).tile,
    //   vectorTileLayerStyles: {
    //     sliced: function (properties: any, zoom: any) {
    //       // var p = properties.mapcolor7 % 5;
    //       return {
    //         fillColor: "#FFEDA0",
    //         fillOpacity: 0.5,
    //         //fillOpacity: 1,
    //         stroke: true,
    //         fill: true,
    //         color: "black",
    //         //opacity: 0.2,
    //         weight: 0,
    //       };
    //     },
    //   },
    //   interactive: true,
    //   // getFeatureId: function (f) {
    //   //   return f.properties.wb_a3;
    //   // },
    // }).addTo(map.current);
    // const zonesNotMulti = zones.filter(
    //   (zone) => zone.geometry.type !== "MultiPolygon"
    // );
    // const data = {
    //   type: "FeatureCollection",
    //   features: zonesNotMulti,
    // };
    // console.log("data", data);
    // console.log("map.current", map.current);
    // function hexToRgb(hex: any) {
    //   if (hex[0] === "#") hex = hex.substring(1, 7);
    //   return {
    //     r: parseInt(hex[0] + hex[1], 16),
    //     g: parseInt(hex[2] + hex[3], 16),
    //     b: parseInt(hex[4] + hex[5], 16),
    //   };
    // }
    // glify.shapes({
    //   map: map.current,
    //   data: data,
    //   color: (index: number, feature: Zone) => {
    //     console.log("index", index);
    //     console.log("feature", feature);
    //     const status = feature.properties.status;
    //     const color =
    //       status === ZoneStatus.DANGEROUS
    //         ? { r: 237, g: 69, b: 67 }
    //         : status === ZoneStatus.RISKY
    //         ? { r: 255, g: 210, b: 30 }
    //         : { r: 86, g: 219, b: 64 };
    //     console.log("color", color);
    //     return {
    //       r: color.r / 255,
    //       g: color.g / 255,
    //       b: color.b / 255,
    //     };
    //   },
    //   hover: (e: any, feature: any) => {
    //     console.log("feature", feature);
    //     console.log("e", e);
    //     L.popup()
    //       .setLatLng(feature.geometry.coordinates)
    //       .setContent("You clicked on:" + feature.properties.displayNameUz)
    //       .openOn(map.current);
    //     feature.bindPopup(
    //       `
    //               <style>
    //                 .custom-popup-style .leaflet-popup-content-wrapper {
    //                   background: #FFFFFF;
    //                   box-shadow: 0px 4px 40px rgba(0, 30, 89, 0.09);
    //                   border-radius: 11px;
    //                 }
    //                 .custom-popup-style .leaflet-popup-close-button {
    //                   display: none
    //                 }
    //                 .custom-popup-style .leaflet-popup-tip-container {
    //                 }
    //                 .custom-popup-style .leaflet-popup-tip {
    //                   box-shadow: 0px 4px 40px rgba(0, 30, 89, 0.09);
    //                 }
    //                 .custom-popup-style .title-container {
    //                   display: flex;
    //                   align-items: center;
    //                   margin-bottom: 8px;
    //                 }
    //                 .custom-popup-style .zone-status-pin {
    //                   display: inline-block;
    //                   width: 8px;
    //                   height: 8px;
    //                   border-radius: 4px;
    //                   margin-right: 5px;
    //                   background-color: ${
    //                     getZoneStatusProps(feature.properties.status)
    //                       .textInBlueishBg
    //                   };
    //                 }
    //                 .custom-popup-style .zone-name {
    //                   font-family: Rubik;
    //                   font-size: 16px;
    //                   font-weight: 500;
    //                   line-height: 16px;
    //                   color: #242B43;
    //                   margin: 0;
    //                 }
    //                 .custom-popup-style .data {
    //                   font-family: Rubik;
    //                   font-size: 14px;
    //                   font-weight: 500;
    //                   line-height: 20px;
    //                   margin: 0;
    //                 }
    //                 .custom-popup-style .data.infected {
    //                   color: ${
    //                     getZoneStatusProps(ZoneStatus.RISKY).textInWhiteBg
    //                   };
    //                 }
    //                 .custom-popup-style .data.recovered {
    //                   color: ${
    //                     getZoneStatusProps(ZoneStatus.SAFE).textInWhiteBg
    //                   };
    //                 }
    //                 .custom-popup-style .data.dead {
    //                   color: ${
    //                     getZoneStatusProps(ZoneStatus.DANGEROUS).textInWhiteBg
    //                   };
    //                 }
    //               </style>

    //               <div class='title-container'>
    //                 <span class="zone-status-pin"></span>
    //                 <h5 class="zone-name">${getProperDisplayName(
    //                   feature as Zone
    //                 )}</h5>
    //               </div>
    //               <p class="data infected">${t("dataType.infected")} ${
    //         feature.properties.total.infectedNumber
    //       }</p>
    //               <p class="data recovered">${t("dataType.recovered")} ${
    //         feature.properties.total.recoveredNumber
    //       }</p>
    //               <p class="data dead">${t("dataType.dead")} ${
    //         feature.properties.total.deadNumber
    //       }</p>

    //             `,
    //       {
    //         className: "custom-popup-style",
    //         autoPan: false,
    //         keepInView: true,
    //       }
    //     );
    //   },
    //   // click: (e, feature): boolean | void => {
    //   //   // do something when a shape is clicked
    //   //   // return false to continue traversing
    //   // }
    // });
    // glify.points({
    //   map: map.current,
    //   size: (i: any) => {
    //     return 20;
    //   },
    //   color: () => {
    //     return {
    //       r: 0,
    //       g: 0,
    //       b: 1,
    //     };
    //   },
    //   click: (e: any, feature: any) => {
    //     //set up a standalone popup (use a popup as a layer)
    //     L.popup()
    //       .setLatLng(feature.geometry.coordinates)
    //       .setContent('You clicked on:' + feature.properties.name)
    //       .openOn(map.current);

    //     console.log(feature);
    //   },
    //   data: { //geojson
    //     'type': 'FeatureCollection',
    //     'features':[
    //       {
    //         'type':'Feature',
    //         'geometry': {
    //           'type': 'Point',
    //           'coordinates': [90, 135]
    //         },
    //         'properties': {
    //           'name': 'North Pole',
    //           'color': 'red'
    //         }
    //       },
    //       {
    //         'type':'Feature',
    //         'geometry': {
    //           'type': 'Point',
    //           'coordinates': [90, 45]
    //         },
    //         'properties': {
    //           'name': 'South Pole',
    //           'color': 'blue'
    //         }
    //       }
    //     ],
    //   }
    // });

    navigateToRef(navigateTo);
    return () => {
      // console.log("map", map);
      if (map.current && map.current.remove) {
        map.current.off();
        map.current.remove();
      }
    };
  }, [zones]);
  return (
    <div ref={mapContainer} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default Map;
