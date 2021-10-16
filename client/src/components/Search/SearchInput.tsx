import React from "react";
import {
  Paper,
  InputBase,
  makeStyles,
  useTheme,
  PaperProps,
  Button,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import NavigationRoundedIcon from "@material-ui/icons/NavigationRounded";
import { useTranslation } from "react-i18next";

export interface SearchInputProps {
  InputProps: {
    ref: any;
  };
  InputLabelProps: any;
  inputRef: any;
  bgColor: string;
  boxShadow: string;
  elevation: PaperProps["elevation"];
  handleAutoLocate: (lat: number, lng: number) => void;
}

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    display: "flex",
    alignItems: "center",
    height: 48,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 16,
  },
  input: {
    marginLeft: theme.spacing(1),
    fontWeight: 400,
  },
  autoLocate: {
    boxShadow: "0px 4px 10px rgba(27, 41, 83, 0.24)",
    height: "30px",
    width: "30px",
    backgroundColor: "white",
  },
  autoLocateIcon: {
    transform: "rotate(27deg) translateY(-1px)",
    fontSize: "1rem",
  },
}));

const SearchInput: React.SFC<SearchInputProps> = (props) => {
  const {
    handleAutoLocate,
    InputProps,
    InputLabelProps,
    bgColor,
    boxShadow,
    elevation,
    inputRef,
    ...otherProps
  } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  const { t } = useTranslation();

  const handleAutoLocateClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          handleAutoLocate(position.coords.latitude, position.coords.longitude);
          // infoWindow.setPosition(pos);
          // infoWindow.setContent('Location found.');
          // infoWindow.open(map);
          // map.setCenter(pos);
        },
        function () {
          // handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter());
    }
  };
  return (
    <Paper
      ref={InputProps.ref}
      component="form"
      className={classes.inputContainer}
      style={{ backgroundColor: bgColor, boxShadow: boxShadow }}
      elevation={elevation}
    >
      <SearchIcon />
      <InputBase
        {...otherProps}
        className={classes.input}
        placeholder={t('search.searchForCity')}
        inputRef={inputRef}
      />
      <IconButton
        className={classes.autoLocate}
        onClick={handleAutoLocateClick}
      >
        <NavigationRoundedIcon
          color="primary"
          className={classes.autoLocateIcon}
        />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
