import React, {
  useContext,
  useState,
  PropsWithChildren,
  ChangeEvent,
  useRef,
} from "react";
import { StateContext } from "../../state/StateContext";
import { makeStyles, useTheme } from "@material-ui/core";

import Autocomplete, {
  AutocompleteChangeReason,
} from "@material-ui/lab/Autocomplete";
import { ADD_SELECTED_ZONE_ID } from "../../state/reducers/appReducer";
import SearchInput from "./SearchInput";
import SearchOption, { SearchOptionProps } from "./SearchOption";
import SearchOptionsPaper from "./SearchOptionsPaper";
import ListboxComponent from "./ListboxComponent";
import { Zone } from "../../types/zone";
import { FilterOptionsState } from "@material-ui/lab";

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
    height: 50
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
  const [selectedZone, setSelectedZone] = useState<Zone | null>();
  const theme = useTheme();
  const classes = useStyles(theme);
  const inputRef = useRef<any>();

  const handleChange = (
    event: ChangeEvent<{}>,
    value: PropsWithChildren<SearchOptionProps> | null,
    reason: AutocompleteChangeReason
  ) => {
    console.log("on change", value);
    console.log("on change reason", reason);
    if (reason === "select-option" && value?._id) {
      dispatch({
        type: ADD_SELECTED_ZONE_ID,
        payload: value._id,
      });
      closeBottomSheet();
      setSelectedZone(value);
      inputRef.current?.blur()
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

  console.log('inputRef', inputRef.current);
  
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
        renderOption={(option) => <SearchOption zone={option} zones={zones}/>}
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
