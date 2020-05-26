import React, { useState, useContext } from "react";
import {
  UnderlineText,
  Button,
  Box,
  H2,
  H4,
  makeStyles,
  colors,
  Caption,
  SectionSplitter,
  SvgIcon,
  Body1,
  H5,
} from "@mashreq-digital/ui";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Check, Phone24, User } from "@mashreq-digital/webassets";
import SucessFailureIcon from "../../../../common/successFailureIcon";
import CardPayNow from "../../../../common/card/CardPayNow";
import PaymentReceipt from "../../../../common/paymentReceipt/index";
import CardDash from "../../../../common/cardDash";
import { getPayListFormattedData } from "../../../../util/getPayListFormattedData";
import PayListItem from "../../../../components/billpayment/review/payList/index";
import { useHistory } from "react-router-dom";
import { StateContext, DispatchContext } from "../../../../redux/context";
import * as Actions from "../../../../redux/actions/moneyTransfer/payListActions";
import { MONEY_TRANSFER } from "../../../../router/config";
import * as TransferActions from "../../../../redux/actions/moneyTransfer/transferAction";
import * as Transaction from "../../../../redux/actions/moneyTransfer/transaction";
import JourneySidebar from '../../../../components/JourneySidebar/index';

type SuccessProps = {
  success: boolean;
  type: string;
  title: string;
  subTitle?: string;
  data?: any;
  onDoneCallback?: any;
  onReceiptCallback?: any;
};
const useStyles = makeStyles(() => ({
  successIconStyle: {
    backgroundColor: colors.green[100],
    "& > svg": {
      fill: colors.green[500],
    },
  },
}));

const Success = (props: SuccessProps) => {
  const {
    type = "",
    data,
    onReceiptCallback,
    title,
    success,
    subTitle,
  } = props;
  const { t } = useTranslation();
  const { successIconStyle } = useStyles();
  const [payRecieptModal, setPayRecieptModal] = useState(false);
  const dispatch = useDispatch();

  const transferDispatch = useContext(DispatchContext);
  const transferState = useContext(StateContext);
  let { transfer } = transferState;

  let transaction = useSelector(
    (state: any) => state.moneyTransfer.makeTransfer
  );
  

  let destAcount = transfer.toAccount;
  let history = useHistory();

  const beneficiaryItemForEdit: any = {
    accountNumber: data.accountNumber,
    nickname: "",
    serviceTypeCode: data.serviceTypeCode,
  };

  const onDoneCallback = () => {
    transferDispatch(TransferActions.setTransferObject({}));
    dispatch(Actions.fetchPayListClear());
    dispatch(Transaction.moneyTransferInitiateTransferClear());

    history.push({
      pathname: MONEY_TRANSFER,
    });
  };

  let payreceptData = {
    "Paid To": "Etisalat",
    "Etisalat Mobile Number": data.accountNumber,
    "Paid From": "**** **** **** 8347",
    "Amount Paid": data.rechargeAmount,
    "Paid On": data.accountNumber,
    "Transaction Status": "processed",
    "Payment Channel": "Online",
  };

  return (
    <JourneySidebar steps={"moneytransfer.stepsPurpose"} currentStep={4}>
    <SectionSplitter
      height="calc(100vh - 250px)"
      top={
        <>
          <SucessFailureIcon success={success} warning2 />
          <UnderlineText color="primary">
            <H2>{title}</H2>
          </UnderlineText>

         {success && <Box mt={6}>
          <Caption>Your transaction with reference number <b>#{transaction.response.mwReferenceNo}</b></Caption>
          </Box>}

          {subTitle && (
            <Box mt={6} mb={6}>
              <Caption>
                {success ? t("moneytransfer.success.withNumber") : null}{" "}
                <b> {subTitle} </b>
              </Caption>{" "}
              <br />
              <Caption>{t("moneytransfer.success.fallowup")}</Caption>
            </Box>
          )}

          {success ? (
            <>
              <CardDash
                leftContent={
                  <CardPayNow
                    icon={
                      <Box
                        className={successIconStyle}
                        p={1.6}
                        borderRadius="50%"
                        display="flex"
                      >
                        <SvgIcon height="1rem" width="1rem" component={Check} />
                      </Box>
                    }
                    heading={
                      <Body1>{t("moneytransfer.success.transferd")}</Body1>
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
                    active={false}
                    activeSelected={true}
                    data={getPayListFormattedData(destAcount, "benificiary")}
                  />
                }
              />

              <Box mt={10} mb={10} display="flex" alignItems="center">
                <CardPayNow
                  icon={<SvgIcon color="primary" component={User} />}
                  style={{ justifyContent: "space-evenly" }}
                  arrow={true}
                  heading={t("moneytransfer.success.frequent")}
                  subheading={t("moneytransfer.success.setupInstruction")}
                />
              </Box>
            </>
          ) : (
            <>
              <Box mt={10} display="flex" alignItems="center">
                <H4>Got question? Talk to us</H4>
              </Box>
              <Box mt={5} mb={5} display="flex" alignItems="center">
                <CardPayNow
                  icon={<SvgIcon color="primary" component={Phone24} />}
                  style={{ justifyContent: "space-evenly" }}
                  arrow={true}
                  heading={t(`billPayments.steps.confirmation.customerCare`)}
                  subheading={t(`billPayments.steps.confirmation.support`)}
                />
              </Box>
            </>
          )}
          {payRecieptModal && (
            <PaymentReceipt
              title={"Your invoice"}
              billRefNo={data.billRefNo}
              openModal={payRecieptModal}
              paymentSummary={payreceptData}
              onCloseModal={() => {
                setPayRecieptModal(false);
              }}
            />
          )}
        </>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">
          <Box>
            {success && (
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  setPayRecieptModal(true);
                  if (
                    onReceiptCallback &&
                    typeof onReceiptCallback === "function"
                  ) {
                    onReceiptCallback();
                  }
                }}
                color="primary"
              >
                {t(`common.action.receipt`)}
              </Button>
            )}
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => {
              onDoneCallback();
            }}
            color="primary"
          >
            {t(`common.action.done`)}
          </Button>
        </Box>
      }
    />
    </JourneySidebar>
  );
};

Success.defaultProps = {
  success: true,
};

export default Success;
