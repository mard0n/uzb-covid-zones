import React from 'react';
import {
  Box, Grid
} from "@mashreq-digital/ui";
import { SvgIcon } from "@mashreq-digital/ui";
import { ArrowRight } from '@mashreq-digital/webassets';

type CardDashProps = {
    leftContent: any, 
    rightContent: any, 
}

const CardDash = (props: CardDashProps) => {
  const {leftContent,rightContent } = props;
  return (
    <Grid container alignItems="center" justify="center">
    <Grid item xs={12} sm={6} lg={5} xl={5}>
      {leftContent}
    </Grid>
    <Grid item xs={12} sm={6} lg={2} xl={2}>
      <Box ml={2} mr={2}>
        <SvgIcon component={ArrowRight} />
      </Box>
     </Grid> 
      <Grid item xs={12} sm={6} lg={5} xl={5}>
      {rightContent}
      </Grid>
</Grid>
  )
}

export default CardDash;
