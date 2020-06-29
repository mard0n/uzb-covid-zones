import React from "react";
import ZoneStatusPin from "./ZoneStatusPin";
import { Typography } from "@material-ui/core";

export interface SearchOptionProps {
  properties: any;
}

const SearchOption: React.SFC<SearchOptionProps> = (option) => {
  return (
    <>
      <ZoneStatusPin status={option?.properties?.status} />
      <Typography noWrap>{option?.properties?.displayName}</Typography>
    </>
  );
};

export default SearchOption;
