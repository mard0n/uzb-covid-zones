import React, { useState, useEffect } from "react";
import { Grid, H2, Box, UnderlineText, H5,SvgIcon } from "@mashreq-digital/ui";
import TransferTypeCard from "../../../common/card/TransferTypeCard";
import {
  getMashreqLogo,
  SingleNeutral,
  Earth1,
  CashPinMap,
  LoveHeartHandsHold3,
  NetworkArrowSync
} from "@mashreq-digital/webassets";
import { useTranslation } from "react-i18next";
import CardPayNow from "../../../common/card/CardPayNow";
import { useDispatch } from "react-redux";
import * as Action from "../../../redux/actions/moneyTransfer/landingActions";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { MONEY_TRANSFER_JOURNEY_WITHIN_START, MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_START } from "../../../router/config";
import { withinMashreq } from "../../../util/constants";

let serviceTypeCode = [
  { type: "local", icon: CashPinMap, logo: false },
  { type: "within-mashreq", icon: getMashreqLogo("symbol"), logo: true },
  { type: "international", icon: Earth1, logo: false },
  { type: "own-account", icon: SingleNeutral, logo: false },
];

const MoneyTransfer = (props: any) => {
  const { t } = useTranslation();
  const [serviceType, setServiceType] = useState("");
  let history = useHistory();
  // const [addEditModal, setaddEditModal] =  useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Action.fetchMoneyTransferLandingRequest());
  }, [dispatch]);

  // const closeDialogModal = () => {
  //   setaddEditModal(false);
  //   dispatch(PayListActions.fetchPayListClear());
  // };

  // const onSuccessCallback = () => {
  //       setaddEditModal(false)
  // };

  const onTransferSelection = (eachServiceType: any) => {
    console.log("onTransferSelection -> bla eachServiceType", eachServiceType);

    switch (eachServiceType.code) {
      case withinMashreq:
        history.push({
          pathname: MONEY_TRANSFER_JOURNEY_WITHIN_START,
          state: { serviceType: eachServiceType },
        });
        break;
      case "own-account":
        history.push({
          pathname: MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_START,
          state: { serviceType: eachServiceType },
        });
    }
  };
  
  const serviceTypes = useSelector(
    (state: any) => state?.moneyTransfer?.landing?.serviceTypesFT
  );
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
      <Grid container xs={10} sm={10} lg={10} xl={10}>
      <Grid container>
        {serviceTypes &&
          serviceTypes.filter((service:any)=>service.code !== "quick-remit").map((eachServiceType: any) => {
            let prop = serviceTypeCode.find(
              (el: any) => el.type === eachServiceType.code
            );
            return (
              <Grid item xs={6} sm={6} lg={3} xl={3}>
                <TransferTypeCard
                  Icon={prop?.icon}
                  logo={prop?.logo}
                  callbak={()=>onTransferSelection(eachServiceType)}
                  title={eachServiceType.name}
                />
              </Grid>
            );
          })}
      </Grid>
      <Box mb={40}></Box>

      <Grid container>
        <Grid item xs={12} sm={12} lg={6} xl={6}>
          <CardPayNow
            TIcon={LoveHeartHandsHold3}
            cardCallBack={() => {
              console.log("MoneyTransfer -> as");
            }}
            heading={"Every contribution counts"}
            subheading={"Pay towards a charity lorem ipsum dolor sit amet"}
          />
        </Grid>

        <Grid item xs={6} sm={6} lg={6} xl={6}>
          <CardPayNow
            TIcon={NetworkArrowSync}
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
      </Grid>

    </>
  );
};

export default MoneyTransfer;


// "serviceTypes": [
//     {
//         "code": "local",
//         "name": "Other Local Account",
//         "category": "Fund Transfer",
//         "coolingPeriodMin": 3,
//         "minAmount": "10",
//         "maxAmount": "10000",
//         "fractialPayment": true,
//         "partialPayment": null,
//         "overPayment": null,
//         "advancePayment": null,
//         "paymentRange": [],
//         "serviceGroup": "Fund Transfer",
//         "suggestedPosition": null
//     }