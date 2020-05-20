import React from "react";
import { Box, Grid, SvgIcon } from "@mashreq-digital/ui";
import { makeStyles } from "@mashreq-digital/ui";
import { ArrowRight } from "@mashreq-digital/webassets";

type CardDashProps = {
  leftContent: any;
  rightContent: any;
};

const useStyles = makeStyles((theme: any) => ({
  myarrow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "100%"
  },
  line: {
    borderBottom: "0.2rem dashed rgb(173, 184, 191)",
    display: "inline-block",
    width: "5rem",
    height: "2px"
  },
  arrow: {
    width: 0,
    height: 0,
    display: "inline-block",
    borderTop: "6px solid transparent",
    borderBottom: "6px solid transparent",
    borderLeft: "10px solid rgb(173, 184, 191)"
  },
  arrowWrapperStyle: {
    position: "relative"
  }
}));

const CardDash = (props: CardDashProps) => {
  const { leftContent, rightContent } = props;
  const { myarrow, arrow, arrowWrapperStyle, line } = useStyles();
  return (
    <Box mt={6} mb={6} display="flex" alignItems="center">
      <Grid container>
        <Grid item xs={5}>
        {leftContent}
        </Grid>
        <Grid item xs={2} className={arrowWrapperStyle}>
          <Box ml={2} mr={2} className={myarrow}>
          <span className={line}></span>
          <span className={arrow}></span>
          </Box>
        </Grid>
        <Grid item xs={5}>
        {rightContent}
        </Grid>
      </Grid>
    </Box> 
  );
};

export default CardDash;
