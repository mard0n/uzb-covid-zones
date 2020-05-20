import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  UnderlineText,
  H2,
  SectionSplitter,
  Button,
  Grid,
  H5,
  makeStyles,
  SvgIcon,
  Body1,
  Caption,
  H4,
  Body2,
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
  MONEY_TRANSFER_JOURNEY_LOCAL_PURPOSE,
} from "../../../../router/config";
import { useHistory } from "react-router-dom";
import * as Actions from "../../../../redux/actions/moneyTransfer/transaction";
import Loader from "../../../../common/loader/index";
import ImageWithText from "../../../../common/imageWithText/index";
import { StateContext } from "../../../../redux/context";

const useStyles = makeStyles(() => ({
  iconStyle: {
    backgroundColor: "rgb(224, 224, 224)",
    "& > svg": {
      height: "15px",
      width: "15px",
    },
  },
}));

const Review = (props: any) => {
  const { setStep } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [startPayentData, setStartPaymentData] = useState({});

  const { iconStyle } = useStyles();
  const transferState = useContext(StateContext);
  let { transfer, serviceType } = transferState;
  console.log("Review -> transfer yedek", transfer);

  const financialTxnNumber = useSelector(
    (state: any) => state.moneyTransfer.other.payListData.financialTxnNumber
  );
  const history = useHistory();
  const dispatch = useDispatch();

  let transaction = useSelector(
    (state: any) => state.moneyTransfer.makeTransfer
  );

  //   {
  //     "fromAccount": "019010000993",
  //     "toAccount": "AE120260001015673975601",
  //     "amount": "11.00",
  //     "serviceType": "local",
  //     "chargeBearer": "O",
  //     "purposeCode": "FAM",
  //     "purposeDesc": "Family Support",
  //     "dealNumber": "",
  //     "finTxnNo": "12345612803699",
  //     "beneficiaryId": "18"
  // }

  const onSubmit = () => {
    let beniData = {
      amount: transfer.amount.total,
      currency: transfer.amount.type,
      dealNumber: "",
      finTxnNo: financialTxnNumber,
      fromAccount: transfer.fromAccount.accountNumber,
      purposeCode: transfer.purpose.selected.purposeCode,
      purposeDesc: transfer.purpose.selected.purposeDesc,
      chargeBearer: transfer.purpose.chargeBearer,
      serviceType: "local",
      beneficiaryId: transfer.toAccount.id,
      toAccount: transfer.toAccount.accountNumber,
    };
    dispatch(Actions.moneyTransferInitiateTransfer(beniData));
    setStartPaymentData(beniData);
  };

  useEffect(() => {
    setLoading(transaction.loading);
    if ((transaction && transaction.error) || transaction.response) {
      if (transaction.error) {
        gotoConfirmation(false);
      } else {
        setSuccessMessage(
          transaction &&
            transaction.response &&
            transaction.response.mwReferenceNo
        );
        gotoConfirmation(true);
      }
    }

    /* Patch - Don't remove the below comment otherwiser useeffect will expect a dependency. 
    We should add onChangeList as dependency then source api will get triggered infinitely */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction]);

  const gotoConfirmation = (confirmation: boolean) => {
    history.replace({
      pathname: MONEY_TRANSFER_JOURNEY_LOCAL_SUCCES,
      state: {
        serviceType: serviceType,
        success: confirmation,
        data: startPayentData,
        type: serviceType.code,
        title: t(
          `billPayments.steps.confirmation.${
            confirmation ? "success" : "failure"
          }.title`
        ),
        subTitle: !confirmation ? "oops! somthing went wrong" : successMessage,
      },
    });
    setStep(4);
  };

  const onHandleBack = () => {
    history.replace({
      pathname: MONEY_TRANSFER_JOURNEY_LOCAL_PURPOSE,
      state: { serviceType: serviceType },
    });
    setStep(2);
  };

  let srcAcount = transfer.fromAccount;
  let destAcount = transfer.toAccount;

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
                logo={true}
                avtHight="40px"
                avtWidth="40px"
              />
            </Box>

            <UnderlineText color="primary">
              <H2>{t("moneytransfer.review.title")}</H2>
            </UnderlineText>

            <CardDash
              leftContent={
                <CardPayNow
                  icon={
                    <Box
                      className={iconStyle}
                      p={1.6}
                      borderRadius="50%"
                      display="flex"
                    >
                      <SvgIcon
                        height="1rem"
                        width="1rem"
                        component={ArrowDown}
                      />
                    </Box>
                  }
                  heading={
                    <Body1> {t("moneytransfer.review.transfering")}</Body1>
                  }
                  subheading={
                    <H5>
                      {transfer.amount.type} {Math.abs(transfer.amount.total)}
                    </H5>
                  }
                />
              }
              rightContent={
                <PayListItem
                  activeSelected={true}
                  data={getPayListFormattedData(destAcount, "benificiary")}
                />
              }
            />
            <hr />
            <Box mt={5} mb={3} display="flex">
              <Box mr={3}>
                <H4>{t("moneytransfer.review.purp")} </H4>{" "}
              </Box>
              <Body2>
                
                <span style={{ color: "rgb(110, 110, 110)" }}>
                  {transfer.purpose.selected.purposeDesc}
                </span>
              </Body2>
            </Box>

            <Box mt={3} mb={3} display="flex">
              <Box mr={6}>
                <H4>{t("moneytransfer.review.payCharge")}</H4>
              </Box>
              <Body2>

                <span style={{ color: "rgb(110, 110, 110)" }}>
                  {transfer.purpose.chargeBearerDesc}
                </span>
              </Body2>
            </Box>

            <hr />
            <Box mt={4}>
              <H5>{t("moneytransfer.review.payingFrom")}</H5>
            </Box>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <PayListItem
                activeSelected={true}
                data={getPayListFormattedData(srcAcount, "accounts")}
              />
            </Grid>

            <Box mt={4}>
              <Caption>
                <span style={{ color: "rgb(173, 184, 191)" }}>
                {t("moneytransfer.review.ack")} 
                  <span style={{ color: "rgb(255, 94, 0)" }}>
                  {t("moneytransfer.review.terms")}
                  </span>
                  {t("moneytransfer.review.appl")}
                </span>
              </Caption>
            </Box>
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
              {t("common.action.pay")} {transfer.amount.type}{" "}
              {Math.abs(transfer.amount.total)}
            </Button>
          </Box>
        }
      />
      {loading && <Loader enable={true} />}
    </>
  );
};

export default Review;
