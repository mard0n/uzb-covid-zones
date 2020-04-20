import React, { useState } from "react";
import { Grid, H2, Box, UnderlineText, H5 } from "@mashreq-digital/ui";
import TransferTypeCard from "../../../common/card/TransferTypeCard";
import {
  User,
  getMashreqLogo,
  Network,
  BillDollar,
} from "@mashreq-digital/webassets";
import { useTranslation } from "react-i18next";
import CardPayNow from "../../../common/card/CardPayNow";

const MoneyTransfer = (props: any) => {
  const { t } = useTranslation();

  return (
    <>
      <Box mb={10}>
        <UnderlineText>
          <H2 noWrap>{t("moneytransfer.landing.title")}</H2>
        </UnderlineText>
      </Box>
      <Box mb={5}>
        <H5>{t("moneytransfer.landing.choose")}</H5>
      </Box>

      <Grid container>
        <Grid item xs={6} sm={3} lg={3} xl={3}>
          <TransferTypeCard
            Icon={User}
            callbak={() => {
              console.log("MoneyTransfer -> console");
            }}
            title={t("moneytransfer.landing.within")}
          />
        </Grid>

        <Grid item xs={6} sm={3} lg={3} xl={3}>
          <TransferTypeCard
            logo={true}
            Icon={getMashreqLogo("symbol")}
            title={t("moneytransfer.landing.toAnother")}
          />
        </Grid>

        <Grid item xs={6} sm={3} lg={3} xl={3}>
          <TransferTypeCard
            Icon={BillDollar}
            title={t("moneytransfer.landing.local")}
          />
        </Grid>

        <Grid item xs={6} sm={3} lg={3} xl={3}>
          <TransferTypeCard
            Icon={Network}
            title={t("moneytransfer.landing.international")}
          />
        </Grid>
      </Grid>
      <Box mb={10}></Box>

      <Grid container>
        <Grid item xs={6} sm={6} lg={6} xl={6}>
          <CardPayNow
            TIcon={Network}
            cardCallBack={() => {
              console.log("MoneyTransfer -> as");
            }}
            heading={"Every contribution counts"}
            subheading={"Pay towards a charity lorem ipsum dolor sit amet"}
          />
        </Grid>

        <Grid item xs={6} sm={6} lg={6} xl={6}>
          <CardPayNow
            TIcon={Network}
            cardCallBack={() => {
                console.log("MoneyTransfer -> as");
              }}
            heading={"Quick Remit"}
            subheading={
              "A faster, cheaper and convenient way of sending money home"
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MoneyTransfer;
