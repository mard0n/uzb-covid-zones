import React, { HTMLAttributes } from "react";
import { Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const SearchOptionsPaper: React.SFC<HTMLAttributes<HTMLElement>> = (props) => {
  const { t } = useTranslation();
  return (
    <Paper className={props.className} elevation={2}>
      <Typography variant="overline" color="textSecondary">
        {t("search.searchResults")}
      </Typography>
      {props.children}
    </Paper>
  );
};

export default SearchOptionsPaper;
