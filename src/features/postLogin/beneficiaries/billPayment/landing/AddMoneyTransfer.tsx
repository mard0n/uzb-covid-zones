import React, { useState, useEffect } from "react";
import { Modals, UnderlineText, H3, Caption, Grid } from "@mashreq-digital/ui";
import { useDispatch, useSelector } from "react-redux";
import BeneficiaryList from "../../../../../components/beneficiary/billPayment/BeneficiaryList";
import * as Action from "../../../../../redux/actions/moneyTransfer/landingActions";
import Loader from "../../../../../common/loader";
import { useTranslation } from "react-i18next";
import * as RoutePath from "../../../../../router/config";
import { withinMashreq } from "../../../../../util/constants";
import { useHistory } from "react-router-dom";
import TransferTypeCard from '../../../../../common/card/TransferTypeCard';
import {
  getMashreqLogo,
  SingleNeutral,
  Earth1,
  CashPinMap,
} from "@mashreq-digital/webassets";

let serviceTypeCode = [
  { type: "local", icon: CashPinMap, logo: false },
  { type: "within-mashreq", icon: getMashreqLogo("symbol"), logo: true },
  { type: "international", icon: Earth1, logo: false },
  { type: "own-account", icon: SingleNeutral, logo: false },
];
export default function AddMoneyTransfer(props: any) {
  const { openModal, handleClose, onClickService } = props;
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  useEffect(() => {
    dispatch(Action.fetchMoneyTransferLandingRequest());

  }, []);
  //TODO : push your URL 
  const onTransferSelection = (eachServiceType: any) => {
    switch (eachServiceType.code) {
      case withinMashreq:
        history.push({
          pathname: RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_WITHIN_BENEFICIARYDETAILS,
          state: { serviceType: eachServiceType },
        });
        break;
      case "own-account":
        // history.push({
        //   pathname: RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_WITHIN_BENEFICIARYDETAILS
        //   // state: { serviceType: eachServiceType },
        // });
        break;
      case "local":
        history.push({
          pathname: RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL_ACCOUNTDETAILS
          // state: { serviceType: eachServiceType },
        });
        break;
      case "international":
        // history.push({
        //   pathname: MONEY_TRANSFER_JOURNEY_INTERNATIONAL_START,
        //   state: { serviceType: eachServiceType },
        // });
    }
  };

  const serviceTypes = useSelector(
    (state: any) => state?.moneyTransfer?.landing?.serviceTypesFT
  );
  console.log("AddMoneyTransfer -> serviceTypes atest", serviceTypes)

  if (serviceTypes && serviceTypes.length > 0) {
    return (
      <>
        <Loader />
        <Modals
          heading={
            <UnderlineText>
              <H3 noWrap>Choose a Beneficiary Type</H3>
            </UnderlineText>
          }
          open={open}
          onBackdropClick={e => handleClose()}
          onClose={handleClose}
        >
          <>

          <Grid spacing={2} container>
          {serviceTypes &&
            serviceTypes
              .filter((service: any) => service.code !== "quick-remit")
              .map((eachServiceType: any) => {
                let prop = serviceTypeCode.find(
                  (el: any) => el.type === eachServiceType.code
                );
                return (
                  <Grid item xs={4} sm={4} lg={4} xl={4}>
                    <TransferTypeCard
                      Icon={prop?.icon}
                      logo={prop?.logo}
                      callbak={() => onTransferSelection(eachServiceType)}
                      title={eachServiceType.name}
                    />
                  </Grid>
                );
              })}
        </Grid>


          </>
        </Modals>
      </>
    );
  } else {
    return <Loader enable={serviceTypes && serviceTypes.length > 0} />;
  }
}
