import React, { HTMLAttributes } from "react";
import { Paper, Typography } from "@material-ui/core";

const SearchOptionsPaper: React.SFC<HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <Paper className={props.className} elevation={2}>
      <Typography variant="overline" color="textSecondary">
        Search Results
      </Typography>
      {props.children}
    </Paper>
  );
};

export default SearchOptionsPaper;
