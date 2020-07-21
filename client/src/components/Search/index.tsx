import React, {
  useContext,
  useState,
  PropsWithChildren,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";
import { StateContext } from "../../state/StateContext";
import {
  makeStyles,
  useTheme,
  Paper,
  Button,
  Box,
  Grid,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "./styles.css";

import Autocomplete, {
  AutocompleteChangeReason,
} from "@material-ui/lab/Autocomplete";
import { ADD_SELECTED_ZONE_ID } from "../../state/reducers/appReducer";
import SearchInput from "./SearchInput";
import SearchOption, { SearchOptionProps } from "./SearchOption";
import SearchOptionsPaper from "./SearchOptionsPaper";
import ListboxComponent from "./ListboxComponent";
import { Zone, PlaceType } from "../../types/zone";
import { FilterOptionsState } from "@material-ui/lab";
import { sortBasedOnTotalInfected } from "../../utils/sortBasedOnTotalInfected";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export interface SearchProps {
  isInsidePaper?: boolean;
  closeBottomSheet?: () => void;
}

const useStyles = makeStyles((theme) => ({
  optionContainerPaper: {
    borderRadius: 24,
    marginTop: 8,
    padding: 24,
  },
  option: {
    padding: "8px 0",
    height: 50,
    // '&[data-focus="true"]': {
    //   backgroundColor: "#ff5e00",
    //   color: "white",
    // },
    // ":active": {
    //   backgroundColor: "unset",
    // },
  },
  suggestedZoneContainer: {
    // marginTop: "8px",
  },
  suggestedZones: {
    backgroundColor: "rgba(72, 99, 244, 0.11)",
    color: "rgba(59, 56, 88, 0.72)",
    fontSize: "14px",
    lineHeight: "17px",
    padding: "8px 16px 8px 16px",
    boxShadow: "none",
    borderRadius: "20px",
    textTransform: "unset",
    whiteSpace: "nowrap",
  },
}));

const Search: React.SFC<SearchProps> = (props) => {
  const { isInsidePaper, closeBottomSheet = () => {} } = props;
  const { zones = [], dispatch } = useContext(StateContext);
  const [selectedZone, setSelectedZone] = useState<Zone | null>();
  const theme = useTheme();
  const classes = useStyles(theme);
  const inputRef = useRef<any>();

  const selectZone = (zone: Zone) => {
    dispatch({
      type: ADD_SELECTED_ZONE_ID,
      payload: zone._id,
    });
    closeBottomSheet();
    setSelectedZone(zone);
    inputRef.current?.blur();
  }

  const handleChange = (
    event: ChangeEvent<{}>,
    value: PropsWithChildren<SearchOptionProps> | null,
    reason: AutocompleteChangeReason
  ) => {
    console.log("on change", value);
    console.log("on change reason", reason);
    if (reason === "select-option" && value?._id) {
      selectZone(value)
    }
  };

  const optionsToShow = (
    option: PropsWithChildren<SearchOptionProps>[],
    state: FilterOptionsState<PropsWithChildren<SearchOptionProps>>
  ) => {
    return option.filter((i) => {
      return (
        i?.properties?.alias?.some((a) =>
          a?.toLowerCase().includes(state?.inputValue?.toLowerCase())
        ) ||
        i?.properties?.displayName
          ?.toLowerCase()
          .includes(state?.inputValue?.toLowerCase())
      );
    });
  };

  const bgColor = isInsidePaper
    ? theme.palette.type === "light"
      ? "#F5F7FD"
      : "#bdc0cb"
    : theme.palette.type === "light"
    ? "#FFF"
    : "#bdc0cb";
  const elevation = isInsidePaper ? 0 : 2;

  const settings = {
    infinite: false,
    variableWidth: true,
    dots: false,
    speed: 300,
    arrows: false,
  };

  const handleSuggestionsClick = (zone: Zone) => {
    selectZone(zone)
  }

  return (
    <>
      <Autocomplete
        debug
        id="search-bank-name"
        classes={{
          option: classes.option,
          paper: classes.optionContainerPaper,
        }}
        options={zones}
        getOptionLabel={(option: PropsWithChildren<SearchOptionProps>) =>
          option?.properties?.displayName
        }
        value={selectedZone}
        onChange={handleChange}
        onFocus={closeBottomSheet}
        filterOptions={optionsToShow}
        // popupIcon={null}
        renderInput={(params) => (
          <SearchInput
            {...params}
            bgColor={bgColor}
            elevation={elevation}
            inputRef={inputRef}
            // InputProps={{ ...params.InputProps, ref: inputRef }}
          />
        )}
        renderOption={(option) => <SearchOption zone={option} zones={zones} />}
        PaperComponent={SearchOptionsPaper}
        ListboxComponent={
          ListboxComponent as React.ComponentType<
            React.HTMLAttributes<HTMLElement>
          >
        }
        autoHighlight
        autoComplete
        clearOnEscape
        clearOnBlur
      />
      <Slider {...settings}>
        {sortBasedOnTotalInfected(zones, [
          PlaceType.CITY,
          PlaceType.REGION,
        ]).map((zone, index) => {
          return (
            index <= 5 && (
              <Box
                ml={index !== 0 && 0.5}
                mr={index !== zones.length - 1 && 0.5}
              >
                <Button
                  variant="contained"
                  className={classes.suggestedZones}
                  startIcon={
                    <LocationOnIcon fontSize="small" color={"primary"} />
                  }
                  onClick={() => handleSuggestionsClick(zone)}
                >
                  {zone.properties.displayName}
                </Button>
              </Box>
            )
          );
        })}
      </Slider>
    </>
  );
};

export default Search;
