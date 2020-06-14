import React, { useContext, useState } from "react";
import { StateContext } from "../state/StateContext";
import {
  Paper,
  IconButton,
  InputBase,
  makeStyles,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ADD_SELECTED_ZONE_ID } from "../state/reducers/appReducer";

export interface SearchProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    // zIndex: 100,
    // position: "sticky",
    // top: 10,
    // left: "50%",
    // transform: "translateX(-50%)",
    // margin: "0 auto",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // maxWidth: 600,
    width: "50%",
  },
  clearIndicator: {
    visibility: "visible",
  },
  option: {
    minHeight: "44px",
    '&[data-focus="true"]': {
      backgroundColor: "#ff5e00",
      color: "white",
    },
    ":active": {
      backgroundColor: "unset",
    },
  },
  inputRoot: {
    paddingRight: "30px !important",
  },
  positionEnd: {
    position: "absolute",
    right: "0",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const Search: React.SFC<SearchProps> = () => {
  const { zones = [], selectedZoneId, dispatch } = useContext(StateContext);
  const [selectedZone, setSelectedZone] = useState<any>();
  const classes = useStyles();
  console.log("selectedZone", selectedZone);
  return (
    <>
      <Autocomplete
        id="search-bank-name"
        classes={{
          clearIndicator: classes.clearIndicator,
          option: classes.option,
          inputRoot: classes.inputRoot,
        }}
        options={zones}
        getOptionLabel={(option: any) => option?.properties?.display_name}
        value={selectedZone}
        onChange={(event, newValue, reason) => {
          console.log("on change", newValue);
          console.log("on change reason", reason);
          if (reason === "select-option") {
            dispatch({
              type: ADD_SELECTED_ZONE_ID,
              payload: newValue?._id,
            });
          }
          setSelectedZone(newValue);
        }}
        filterOptions={(option: any, state: any) => {
          return option.filter((i: any) =>
            i?.properties?.alias?.some((a: any) =>
              a?.toLowerCase().includes(state?.inputValue?.toLowerCase())
            )
          );
        }}
        popupIcon={null}
        renderInput={(params) => {
          return (
            <Paper component="form" className={classes.root}>
              <TextField
                {...params}
                // label={"Search"}
                // variant="standard"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: selectedZone ? (
                    params.InputProps.endAdornment
                  ) : (
                    <IconButton
                      className={classes.iconButton}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </Paper>
          );
        }}
        autoHighlight
        autoComplete
        openOnFocus
        clearOnEscape
        clearOnBlur
      />
    </>
  );
};

export default Search;
