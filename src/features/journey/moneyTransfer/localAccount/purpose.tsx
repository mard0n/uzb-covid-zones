import React, { useState, useEffect } from "react";
import {
  Box,
  UnderlineText,
  H2,
  SectionSplitter,
  Button,
  Grid,
  H5,
  colors,
  makeStyles,
  SvgIcon,
  Body1,
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import BackButton from "../../../../common/backButton/index";
import CardDash from "../../../../common/cardDash/index";
import { useSelector, useDispatch } from "react-redux";
import PayListItem from "../../../../components/billpayment/review/payList/index";
import { ArrowDown } from "@mashreq-digital/webassets";
import CardPayNow from "../../../../common/card/CardPayNow";
import { getPayListFormattedData } from "../../../../util/getPayListFormattedData";
import {
  MONEY_TRANSFER_JOURNEY_LOCAL_SUCCES,
  MONEY_TRANSFER_JOURNEY_LOCAL_AMOUNT,
  MONEY_TRANSFER_JOURNEY_LOCAL_REVIEW,
} from "../../../../router/config";
import { useHistory } from "react-router-dom";
import * as Actions from "../../../../redux/actions/moneyTransfer/transaction";
import Loader from "../../../../common/loader/index";
import ImageWithText from "../../../../common/imageWithText/index";

const useStyles = makeStyles(() => ({
  iconStyle: {
    backgroundColor: "rgb(224, 224, 224)",
    "& > svg": {
      height: "15px",
      width: "15px",
    },
  },
}));

const Purpose = (props: any) => {
  const { serviceType, setStep } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const { iconStyle } = useStyles();
  const history = useHistory();

  const onSubmit = () => {

    history.replace({
        pathname: MONEY_TRANSFER_JOURNEY_LOCAL_REVIEW,
        state: {serviceType:serviceType}
      });
      setStep(3);
  };

  const onHandleBack = () => {
    history.replace({
      pathname: MONEY_TRANSFER_JOURNEY_LOCAL_AMOUNT,
      state: { serviceType: serviceType },
    });
    setStep(1);
  };

  return (
    <>
      <SectionSplitter
        height={"calc(100vh - 400px)"}
        top={
          <>
            <Box mb={6}>
              <ImageWithText
                description={serviceType.name}
                name={serviceType.code}
                iconType={true}
                logo={false}
                avtHight="40px"
                avtWidth="40px"
              />
            </Box>

            <UnderlineText color="primary">
              <H2>Let us know  the purpose of payment and charges</H2>
            </UnderlineText>
          </>
        }
        bottom={
          <Box display="flex" justifyContent="space-between">
            <BackButton
              disableRoute
              onClickBack={() => {
                onHandleBack();
              }}
            />

            <Button
              variant="contained"
              size="large"
              color="primary"
              disabled={false}
              onClick={() => onSubmit()}
            >
              Continue
            </Button>
          </Box>
        }
      />
      {loading && <Loader enable={true} />}
    </>
  );
};

export default Purpose;
// {currency} {rechargeAmount}
