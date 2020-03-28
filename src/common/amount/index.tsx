import React from "react";
import { Box, colors, Caption, makeStyles, Theme } from "@mashreq-digital/ui";
const useStyles = makeStyles((theme: Theme) => ({
  valueStyle: {
    fontWeight: "bold",
    fontSize: "14px"
  },
  adornmentStule: {
    color: colors.blueGrey[500]
  },
  amountStyle: {
    border: "1px solid " + colors.grey[900],
    "& .MuiTypography-caption": {
      color: colors.blueGrey[700]
    }
  },
  activeStyle: {
    backgroundColor: colors.grey[900],
    "& .MuiTypography-caption": {
      color: "#fff"
    }
  }
}));

type AmountProps = {
 value: string | number;
 active?: boolean
}

const Amount = (props: AmountProps) => {
  const { value, active } = props;
  const { amountStyle, activeStyle, valueStyle } = useStyles();
  return (
    <Box
      className={`${amountStyle} ${active ? activeStyle: ''}`}
      display="inline-block"
      borderRadius={16}
      px={2}
      pt={1}
      pb={0.5}
    >
      <Box display="inline" mr={1}>
        <Caption>AED</Caption>
      </Box>
      <Caption className={valueStyle}>{value}</Caption>
    </Box>
  );
};

Amount.defaultProps = {
  active: false
}

export default Amount;
