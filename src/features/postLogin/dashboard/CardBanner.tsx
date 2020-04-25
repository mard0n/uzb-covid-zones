import React from "react";
import { makeStyles, Box, Button, Caption, Body1 } from "@mashreq-digital/ui";
import CardIcon from "../../../common/cardIcon";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  creditCardBanneStyle: {
    display: "flex",
    background:
      "linear-gradient(-135deg, rgb(79, 86, 106) 0%, rgb(46, 47, 53) 100%)",
    borderRadius: "6px",
    padding: `${theme.spacing(2.4)}px ${theme.spacing(4)}px`,
    "& .MuiTypography-body1": {
      color: "#fff",
    },
    "& .MuiTypography-caption": {
      color: "#afabad",
    },
    "& button": {
      height: "100%",
    },
  },
}));

const CardBanner = () => {
  const {t} = useTranslation();
  const { creditCardBanneStyle } = useStyles();
  return (
    <Box className={creditCardBanneStyle}>
      <CardIcon linearGradient size={30} />
      <Box mx={4}>
        <Box component="div" lineHeight="initial">
          <Body1>Hurray!</Body1>
        </Box>
        <Box component="div" lineHeight="initial">
          <Caption>You qualify for the Solitaire Credit Card,</Caption>
        </Box>
        <Box component="div" lineHeight="initial">
          <Caption>zero paperwork, no signatures.</Caption>
        </Box>
      </Box>
      <Box display="flex" flex="1" justifyContent="flex-end">
        <Button variant="contained" color="primary">
          {t("common.action.applyNow")}
        </Button>
      </Box>
    </Box>
  );
};

export default CardBanner;
