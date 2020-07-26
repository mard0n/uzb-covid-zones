import "leaflet/dist/leaflet.css";
import React, {
  useRef,
  useState,
  useContext,
  useEffect,
  Fragment,
} from "react";
import {
  Map,
  TileLayer,
  GeoJSON,
  FeatureGroup,
  Marker,
  ZoomControl,
} from "react-leaflet";
import { StateContext } from "../../state/StateContext";
import {
  ADD_SELECTED_ZONE_ID,
  ADD_NAVIGATE_TO_FN,
} from "../../state/reducers/appReducer";
import { getSelectedZoneObjById } from "../../utils/getSelectedZoneObj";
import { LeafletEvent } from "leaflet";
import { Zone, ZoneStatus, PlaceType } from "../../types/zone";
import getZoneStatusProps from "../../utils/getZoneStatusProps";
import { useMediaQuery, Theme } from "@material-ui/core";
import "./zoomStyles.css";
import { useTranslation } from "react-i18next";
import { getProperDisplayName } from "../../utils/getProperDisplayName";

export interface MapZonesProps {
  closeBottomSheet?: () => void;
}

const MapZones: React.SFC<MapZonesProps> = (props) => {
  const { closeBottomSheet = () => {} } = props;
  const { zones = [], selectedZoneId, dispatch } = useContext(StateContext);
  const selectedZone = getSelectedZoneObjById(selectedZoneId, zones);
  const [zoomLevel, setZoomLevel] = useState(9);
  const [marker, setMarker] = useState<any>(null);
  const { t, i18n } = useTranslation();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const mapRef = useRef<Map | null>(null);

  const navigateTo = (lat: number, lng: number) => {
    mapRef.current?.leafletElement.setView({ lat, lng }, 12, { animate: true });
    setMarker({ lat, lng });
  };

  useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    }); // to show marker
    dispatch({
      type: ADD_NAVIGATE_TO_FN,
      payload: navigateTo,
    });
  }, []);

  useEffect(() => {

    if (selectedZone?.bbox?.length) {
      const [westlon, minlat, eastlon, maxlat] = selectedZone?.bbox;
      mapRef.current?.leafletElement?.flyToBounds([
        [minlat, eastlon],
        [westlon, maxlat],
      ]);
    }
    return () => {};
  }, [selectedZone]);

  const handleZoom = (e: LeafletEvent) => {
    setZoomLevel(e.target._zoom);
  };
  const handleZoneSelect = (feature: Zone) => {
    dispatch({
      type: ADD_SELECTED_ZONE_ID,
      payload: feature._id,
    });
    closeBottomSheet()
  };

  return (
    <Map
      ref={mapRef}
      center={[40.7, 71.24]}
      zoom={9}
      zoomControl={false}
      style={{ width: "100%", height: "100%" }}
      onmoveend={handleZoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
      />
      {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
      {mdUp && <ZoomControl position="bottomright" />}
      <FeatureGroup>
        {zones.map((zone, i) => {
          // const { showFrom, showTo } = zone?.properties?.zoomRange;
          const placeType = zone?.properties?.placeType;
          let isShown;

          if (zoomLevel >= 9) {
            isShown =
              placeType === PlaceType.DISTRICT || placeType === PlaceType.CITY;
          } else if (zoomLevel < 9 && zoomLevel >= 6) {
            isShown = placeType === PlaceType.REGION;
          } else if (zoomLevel < 6) {
            isShown = placeType === PlaceType.COUNTRY;
          }
          return (
            isShown && (
              <Fragment key={`zone-${i}`}>
                <GeoJSON
                  key={i}
                  data={zone as GeoJSON.GeoJsonObject}
                  onEachFeature={(feat, layer) => {
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
                            getZoneStatusProps(zone.properties.status)
                              .textInBlueishBg
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
                          color: ${
                            getZoneStatusProps(ZoneStatus.YELLOW).textInWhiteBg
                          };
                        }
                        .custom-popup-style .data.recovered {
                          color: ${
                            getZoneStatusProps(ZoneStatus.GREEN).textInWhiteBg
                          };
                        }
                        .custom-popup-style .data.dead {
                          color: ${
                            getZoneStatusProps(ZoneStatus.RED).textInWhiteBg
                          };
                        }
                      </style>

                      <div class='title-container'>
                        <span class="zone-status-pin"></span>
                        <h5 class="zone-name">${
                          getProperDisplayName(zone)
                        }</h5>
                      </div>
                      <p class="data infected">${t('dataType.infected')} ${
                        zone.properties.total.infectedNumber
                      }</p>
                      <p class="data recovered">${t('dataType.recovered')} ${
                        zone.properties.total.recoveredNumber
                      }</p>
                      <p class="data dead">${t('dataType.dead')} ${
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
                      click: () => handleZoneSelect(zone),
                      mouseover: (e) => {
                        layer.openPopup();
                      },
                    });
                  }}
                  style={(feat) => {
                    const status = zone?.properties?.status;
                    const color =
                      status === "RED"
                        ? "rgb(237, 69, 67)"
                        : status === "YELLOW"
                        ? "rgb(255, 210, 30)"
                        : "rgb(86, 219, 64)";
                    return {
                      fillColor: color,
                      fillOpacity: 0.301961,
                      color: color,
                      weight: 1.5,
                    };
                  }}
                />
              </Fragment>
            )
          );
        })}
      </FeatureGroup>
    </Map>
  );
};

export default MapZones;
