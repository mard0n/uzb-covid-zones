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
    position: "absolute",
    top: 0,
    bottom: 0,
    transform: "rotate(90deg)",
  },
  line: {
    borderRight: "0.2rem dashed rgb(173, 184, 191)",
    display: "inline-block",
    height: "5rem",
  },
  arrow: {
    position: "absolute",
    top: "-0.3rem",
    bottom: 0,
    height: "1rem",
    borderRight: "0.2rem solid rgb(173, 184, 191)",
    display: "inline-block",
    right: "0.3rem",
    transform: "rotate(45deg)",
  },
}));

const CardDash = (props: CardDashProps) => {
  const { leftContent, rightContent } = props;
  const { myarrow, arrow, line } = useStyles();
  return (
    <Box mt={6} mb={6} display="flex" alignItems="center">
      <Box width="500px">{leftContent}</Box>
      <Box ml={3} mr={3}>
        <SvgIcon component={ArrowRight} />
      </Box>
      {
        // <Box ml={2} mr={2} className={myarrow}>
        // <span className={arrow}></span>
        // <span className={line}></span>
        // </Box>
      }

      <Box width="500px">{rightContent}</Box>
    </Box>
  );
};

export default CardDash;
