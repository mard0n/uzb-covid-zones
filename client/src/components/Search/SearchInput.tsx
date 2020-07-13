import React from "react";
import {
  Paper,
  InputBase,
  makeStyles,
  useTheme,
  PaperProps,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export interface SearchInputProps {
  InputProps: {
    ref: any;
  };
  inputRef: any;
  bgColor: string;
  elevation: PaperProps["elevation"];
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
  },
}));

const SearchInput: React.SFC<SearchInputProps> = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Paper
      ref={props.InputProps.ref}
      component="form"
      className={classes.inputContainer}
      style={{ backgroundColor: props.bgColor }}
      elevation={props.elevation}
    >
      <SearchIcon />
      <InputBase
        {...props}
        className={classes.input}
        placeholder="Search for the city..."
        inputRef={props.inputRef}
      />
    </Paper>
  );
};

export default SearchInput;
