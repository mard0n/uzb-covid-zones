import React from "react";
import ZoneStatusPin from "./ZoneStatusPin";
import { Typography, Box, Grid } from "@material-ui/core";
import { Zone } from "../../types/zone";
import { getParents } from "../../utils/getParents";
import { getProperDisplayName } from "../../utils/getProperDisplayName";

export interface SearchOptionProps extends Zone {}
export interface SearchOptionComponentProps {
  zone: Zone;
  zones: Zone[];
}

const SearchOption: React.SFC<SearchOptionComponentProps> = (props) => {
  const { zone, zones } = props;

  const parentZonesString = getParents(zone, zones);
  return (
    <Grid container direction='row' wrap="nowrap" alignItems="flex-start" style={{height: '100%'}}>
      <ZoneStatusPin status={zone?.properties?.status} style={{marginTop: 4, marginLeft: 8, width: 9}} />
      <Box component="span" mr={2} />
      <Grid container item direction='column' wrap="nowrap">
        <Typography variant="body1" noWrap style={{lineHeight: '20px'}}>
          {getProperDisplayName(zone)}
        </Typography>
        {parentZonesString && (
          <Typography variant="caption" style={{lineHeight: '20px', color: '#A5A3B2'}}>{parentZonesString}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchOption;
