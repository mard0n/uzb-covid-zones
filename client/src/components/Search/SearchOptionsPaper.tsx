import React, { HTMLAttributes } from "react";
import { Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const SearchOptionsPaper: React.SFC<HTMLAttributes<HTMLElement>> = (props) => {
  const { t } = useTranslation();
  return (
    <Paper
      className={props.className}
      elevation={0}
      style={{ boxShadow: "0px 3px 10px rgba(30, 43, 114, 0.09)" }}
    >
      <Typography variant="overline" color="textSecondary">
        {t("search.searchResults")}
      </Typography>
      {props.children}
    </Paper>
  );
};

export default SearchOptionsPaper;
