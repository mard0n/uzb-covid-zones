import React from "react";
import ZoneStatusPin from "./ZoneStatusPin";
import { Typography, Box, Grid } from "@material-ui/core";
import { Zone } from "../../types/zone";
import { getParents } from "../../utils/getParents";

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
      <ZoneStatusPin status={zone?.properties?.status} style={{marginTop: 4, marginLeft: 8}} />
      <Box component="span" mr={1} />
      <Grid container item direction='column' wrap="nowrap" style={{flexWrap: 'nowrap'}}>
        <Typography variant="body1" noWrap style={{lineHeight: '20px'}}>
          {zone?.properties?.displayName}
        </Typography>
        {parentZonesString && (
          <Typography variant="caption" style={{lineHeight: '20px'}}>{parentZonesString}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchOption;
