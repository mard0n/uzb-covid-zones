import React, { useContext, useState } from "react";
import { StateContext } from "../../state/StateContext";
import {
  Paper,
  IconButton,
  InputBase,
  makeStyles,
  TextField,
  InputAdornment,
  List,
  ListItem,
  Typography,
  Box,
  useTheme,
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { ADD_SELECTED_ZONE_ID } from "../../state/reducers/appReducer";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import ZoneStatusPin from "./ZoneStatusPin";
import SearchInput from "./SearchInput";
import SearchOption from "./SearchOption";
import SearchOptionsPaper from "./SearchOptionsPaper";
import ListboxComponent from "./ListboxComponent";

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
    // '&[data-focus="true"]': {
    //   backgroundColor: "#ff5e00",
    //   color: "white",
    // },
    // ":active": {
    //   backgroundColor: "unset",
    // },
  },
}));

const Search: React.SFC<SearchProps> = (props) => {
  const { isInsidePaper, closeBottomSheet = () => {} } = props;
  const { zones = [], dispatch } = useContext(StateContext);
  const [selectedZone, setSelectedZone] = useState<any>();
  const theme = useTheme();
  const classes = useStyles(theme);
  console.log("selectedZone", selectedZone);
  const handleChange = (event: any, newValue: any, reason: any) => {
    console.log("on change", newValue);
    console.log("on change reason", reason);
    if (reason === "select-option") {
      dispatch({
        type: ADD_SELECTED_ZONE_ID,
        payload: newValue?._id,
      });
    }
    closeBottomSheet()
    setSelectedZone(newValue);
  };
  const optionsToShow = (option: any, state: any) => {
    return option.filter((i: any, index: any) => {
      return (
        i?.properties?.alias?.some((a: any) =>
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
  return (
    <>
      <Autocomplete
        id="search-bank-name"
        classes={{
          option: classes.option,
          paper: classes.optionContainerPaper,
        }}
        options={zones}
        getOptionLabel={(option: any) => option?.properties?.displayName}
        value={selectedZone}
        onChange={handleChange}
        onFocus={closeBottomSheet}
        filterOptions={optionsToShow}
        // popupIcon={null}
        renderInput={(params) => (
          <SearchInput bgColor={bgColor} elevation={elevation} {...params} />
        )}
        renderOption={SearchOption}
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
    </>
  );
};

export default Search;
