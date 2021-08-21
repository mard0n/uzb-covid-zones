import React, { useEffect, useState } from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {
  Box,
  Button,
  makeStyles,
  useTheme,
  useMediaQuery,
  Theme,
} from "@material-ui/core";
import { sortBasedOnTotalInfected } from "utils/sortBasedOnTotalInfected";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { PlaceType, Zone } from "types/zone";
import { getProperDisplayName } from "utils/getProperDisplayName";
import SuggestedZonesSkeleton from "../Skeletons/SuggestedZones";

const useStyles = makeStyles((theme) => ({
  suggestedZoneContainer: {
    // marginTop: "8px",
  },
  suggestedZones: {
    fontSize: "14px",
    lineHeight: "17px",
    padding: "8px 16px 8px 16px",
    borderRadius: "43px",
    textTransform: "unset",
    whiteSpace: "nowrap",
    fontWeight: 400,
  },
  suggestedZonesWeb: {
    color: "rgba(59, 56, 88, 0.72)",
    backgroundColor: "#ebebebc7",
    boxShadow: "none",
  },
  suggestedZonesMobile: {
    color: "rgba(36, 43, 67, 0.77)",
    background: "#FFFFFF",
    boxShadow: "4px 6px 10px rgba(30, 43, 114, 0.09)",
  },
}));

export interface SuggestedZonesProps {
  zones: Zone[] | [];
  selectZone: (zone: Zone) => void;
}

const SuggestedZones: React.SFC<SuggestedZonesProps> = (props) => {
  const { zones, selectZone } = props;
  const [lastSelectedZone, setLastSelectedZone] = useState<Zone>();
  const theme = useTheme();
  const classes = useStyles(theme);
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    const lastSelectedZoneLS = localStorage.getItem("last-selected-zone") || "";
    try {
      setLastSelectedZone(JSON.parse(lastSelectedZoneLS));
    } catch (error) {}
  }, []);

  const settings = {
    infinite: false,
    variableWidth: true,
    dots: false,
    speed: 300,
    arrows: false,
  };
  const handleSuggestionsClick = (zone: Zone) => {
    selectZone(zone);
  };
  return zones?.length > 0 ? (
    <Slider {...settings}>
      {lastSelectedZone ? (
        <Box key={`suggestion-${lastSelectedZone._id}`} mr={0.5}>
          <Button
            variant="contained"
            className={`${classes.suggestedZones} ${
              mdUp ? classes.suggestedZonesWeb : classes.suggestedZonesMobile
            }`}
            startIcon={<LocationOnIcon fontSize="small" color={"primary"} />}
            onClick={() => handleSuggestionsClick(lastSelectedZone)}
          >
            {getProperDisplayName(lastSelectedZone)}
          </Button>
        </Box>
      ) : (
        <></>
      )}
      {sortBasedOnTotalInfected(zones, [PlaceType.CITY, PlaceType.REGION]).map(
        (zone, index) => {
          return (
            index <= 1 && (
              <Box
                key={`suggestion-${zone._id}`}
                ml={index !== 0 ? 0.5 : 0}
                mr={index !== zones.length - 1 ? 0.5 : 0}
              >
                <Button
                  variant="contained"
                  className={`${classes.suggestedZones} ${
                    mdUp
                      ? classes.suggestedZonesWeb
                      : classes.suggestedZonesMobile
                  }`}
                  startIcon={
                    <LocationOnIcon fontSize="small" color={"primary"} />
                  }
                  onClick={() => handleSuggestionsClick(zone)}
                >
                  {getProperDisplayName(zone)}
                </Button>
              </Box>
            )
          );
        }
      )}
    </Slider>
  ) : (
    <SuggestedZonesSkeleton mdUp={mdUp} />
  );
};

export default SuggestedZones;
