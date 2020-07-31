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
import {
  useMediaQuery,
  Theme,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import "./zoomStyles.css";
import { useTranslation } from "react-i18next";
import { getProperDisplayName } from "../../utils/getProperDisplayName";

export interface MapZonesProps {
  closeBottomSheet?: () => void;
}

enum VisibleZoneLayerController {
  AUTO = "AUTO",
  COUNTRY = "COUNTRY",
  REGION = "REGION",
  CITY_DISTRICT = "CITY_DISTRICT",
}

const MapZones: React.SFC<MapZonesProps> = (props) => {
  const { closeBottomSheet = () => {} } = props;
  const { zones = [], selectedZoneId, dispatch } = useContext(StateContext);
  const selectedZone = getSelectedZoneObjById(selectedZoneId, zones);
  const [zoomLevel, setZoomLevel] = useState(6);
  const [isRecentlySelected, setIsRecentlySelected] = useState(false);
  const [visibleZoneLayer, setVisibleZoneLayer] = useState(
    VisibleZoneLayerController.AUTO
  );
  const [marker, setMarker] = useState<any>(null);
  const { t } = useTranslation();
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const mapRef = useRef<Map | null>(null);

  const navigateTo = (
    { lat, lng, zoom = 12 }: { lat: number; lng: number; zoom: number },
    isMarked = true
  ) => {
    mapRef.current?.leafletElement.setView({ lat, lng }, zoom, {
      animate: true,
    });
    isMarked && setMarker({ lat, lng });
  };

  useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    }); // to show marker

    const queryParam = new URLSearchParams(window.location.search);
    const lat = queryParam.get("lat");
    const lng = queryParam.get("lng");
    const zoom = queryParam.get("zoom");
    const latInt = lat && parseFloat(lat);
    const lngInt = lng && parseFloat(lng);
    const zoomInt = zoom && parseFloat(zoom);
    if (latInt && lngInt && zoomInt) {
      navigateTo({ lat: latInt, lng: lngInt, zoom: zoomInt }, false);
    }

    dispatch({
      type: ADD_NAVIGATE_TO_FN,
      payload: navigateTo,
    });
  }, []);

  useEffect(() => {
    if (selectedZone?.bbox?.length) {
      const [minLng, minLat, maxLng, maxLat] = selectedZone?.bbox;

      mapRef.current?.leafletElement?.flyToBounds([
        [maxLat, maxLng],
        [minLat, minLng],
      ]);
    }
    setIsRecentlySelected(true);

    return () => {};
  }, [selectedZone]);

  const handleMoveEnd = (e: LeafletEvent) => {
    const zoom = mapRef.current?.leafletElement?.getZoom();
    if (zoom) {
      setZoomLevel(zoom);
    }
    const latLng = mapRef.current?.leafletElement?.getCenter();
    console.log("latLng", latLng);
    console.log("zoom", zoom);
    console.log(
      "latLng?.lat && latLng?.lng && zoom",
      latLng?.lat && latLng?.lng && zoom
    );

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
      console.log("latLng", latLng);
    }
  };
  const handleMoveStart = () => {
    setIsRecentlySelected(false);
  };
  const handleZoneSelect = (feature: Zone) => {
    dispatch({
      type: ADD_SELECTED_ZONE_ID,
      payload: feature._id,
    });
    closeBottomSheet();
  };
  const handleRadioChange = (e: any, value: string) => {
    setVisibleZoneLayer(value as VisibleZoneLayerController);
  };

  return (
    <Map
      ref={mapRef}
      center={[40.92930626579717, 64.61999498705462]}
      zoom={zoomLevel}
      zoomControl={false}
      style={{ width: "100%", height: "100%" }}
      onmoveend={handleMoveEnd}
      onzoomstart={handleMoveStart}
      onmovestart={handleMoveStart}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
      />
      {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
      {mdUp && <ZoomControl position="bottomright" />}
      <Paper style={{ zIndex: 1000, position: "relative" }}>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue={VisibleZoneLayerController.AUTO}
          value={visibleZoneLayer}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value={VisibleZoneLayerController.AUTO}
            control={<Radio color="primary" />}
            label="Auto"
            labelPlacement="end"
          />
          <FormControlLabel
            value={VisibleZoneLayerController.COUNTRY}
            control={<Radio color="primary" />}
            label="Country"
            labelPlacement="end"
          />
          <FormControlLabel
            value={VisibleZoneLayerController.REGION}
            control={<Radio color="primary" />}
            label="Region"
            labelPlacement="end"
          />
          <FormControlLabel
            value={VisibleZoneLayerController.CITY_DISTRICT}
            control={<Radio color="primary" />}
            label="City and District"
          />
        </RadioGroup>
      </Paper>
      <FeatureGroup>
        {zones.map((zone) => {
          const placeType = zone?.properties?.placeType;
          let isShown;
          if (visibleZoneLayer === VisibleZoneLayerController.AUTO) {
            if (selectedZone && isRecentlySelected) {
              isShown =
                selectedZone.properties.placeType === zone.properties.placeType;
            } else {
              if (zoomLevel >= 10) {
                isShown =
                  placeType === PlaceType.DISTRICT ||
                  placeType === PlaceType.CITY;
              } else if (zoomLevel < 10 && zoomLevel >= 7) {
                isShown = placeType === PlaceType.REGION;
              } else if (zoomLevel < 7) {
                isShown = placeType === PlaceType.COUNTRY;
              }
            }
          } else {
            switch (visibleZoneLayer) {
              case VisibleZoneLayerController.COUNTRY:
                isShown = placeType === PlaceType.COUNTRY;
                break;
              case VisibleZoneLayerController.REGION:
                isShown = placeType === PlaceType.REGION;
                break;
              case VisibleZoneLayerController.CITY_DISTRICT:
                isShown =
                  placeType === PlaceType.DISTRICT ||
                  placeType === PlaceType.CITY;
                break;

              default:
                break;
            }
          }
          return (
            isShown && (
              <GeoJSON
                key={"zone-" + zone._id}
                data={zone as GeoJSON.GeoJsonObject}
                onEachFeature={(feat, layer) => {
                  mdUp &&
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
                            getZoneStatusProps(ZoneStatus.RISKY).textInWhiteBg
                          };
                        }
                        .custom-popup-style .data.recovered {
                          color: ${
                            getZoneStatusProps(ZoneStatus.SAFE).textInWhiteBg
                          };
                        }
                        .custom-popup-style .data.dead {
                          color: ${
                            getZoneStatusProps(ZoneStatus.DANGEROUS)
                              .textInWhiteBg
                          };
                        }
                      </style>

                      <div class='title-container'>
                        <span class="zone-status-pin"></span>
                        <h5 class="zone-name">${getProperDisplayName(zone)}</h5>
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
                    click: () => handleZoneSelect(zone),
                    mouseover: (e) => {
                      mdUp && layer.openPopup();
                    },
                  });
                }}
                style={(feat) => {
                  const status = zone?.properties?.status;
                  const color =
                    status === ZoneStatus.DANGEROUS
                      ? "rgb(237, 69, 67)"
                      : status === ZoneStatus.RISKY
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
            )
          );
        })}
      </FeatureGroup>
    </Map>
  );
};

export default MapZones;
