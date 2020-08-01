import React, {
  useContext,
  useState,
  PropsWithChildren,
  ChangeEvent,
  useRef,
} from "react";
import { StateContext } from "../../state/StateContext";
import { makeStyles, useTheme, useMediaQuery, Theme } from "@material-ui/core";
import "./styles.css";
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
import { getProperDisplayName } from "../../utils/getProperDisplayName";
import SuggestedZones from "components/Search/SuggestedZones";

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
    '&[data-focus="true"]': {
      backgroundColor: "rgba(0, 0, 0, .02)",
    },
    // ":active": {
    //   backgroundColor: "rgba(0, 0, 0, .02)",
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
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const { isInsidePaper, closeBottomSheet = () => {} } = props;
  const { zones = [], dispatch, navigateTo } = useContext(StateContext);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
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
  };

  const handleChange = (
    event: ChangeEvent<{}>,
    value: PropsWithChildren<SearchOptionProps> | null,
    reason: AutocompleteChangeReason
  ) => {
    if (reason === "select-option" && value?._id) {
      selectZone(value);
      try {
        localStorage.setItem('last-selected-zone', JSON.stringify(value))
      } catch (error) {}
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
        i?.properties?.displayNameUz
          ?.toLowerCase()
          .includes(state?.inputValue?.toLowerCase()) ||
        i?.properties?.displayNameRu
          ?.toLowerCase()
          .includes(state?.inputValue?.toLowerCase())
      );
    });
  };

  const bgColor = isInsidePaper
    ? theme.palette.type === "light"
      ? "#ebebebc7"
      : "#bdc0cb"
    : theme.palette.type === "light"
    ? "#FFF"
    : "#bdc0cb";
  const elevation = isInsidePaper ? 0 : 2;

  const handleAutoLocate = (lat: number, lng: number) => {
    navigateTo({lat, lng});
  };

  return (
    <>
      <Autocomplete
        // debug
        id="search-bank-name"
        classes={{
          option: classes.option,
          paper: classes.optionContainerPaper,
        }}
        options={zones}
        getOptionLabel={(option: PropsWithChildren<SearchOptionProps>) =>
          getProperDisplayName(option)
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
            boxShadow={mdUp ? "unset" : "4px 6px 10px rgba(30, 43, 114, 0.09)"}
            elevation={elevation}
            inputRef={inputRef}
            handleAutoLocate={handleAutoLocate}
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
      <SuggestedZones zones={zones} selectZone={selectZone} />
    </>
  );
};

export default Search;
