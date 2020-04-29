import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Check, Phone24, ArrowDown, User } from "@mashreq-digital/webassets";
// import getBeneficiariesAvatar from "../../../../util/getBeneficiariesAvatar";
import SucessFailureIcon from "../../../../common/successFailureIcon";
import CardPayNow from "../../../../common/card/CardPayNow";
import PaymentReceipt from "../../../../common/paymentReceipt/index";
import CardDash from "../../../../common/cardDash";
import { getPayListFormattedData } from "../../../../util/getPayListFormattedData";
import PayListItem from "../../../../common/payList/index";
import { withinMashreq } from "../../../../util/constants";

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
  // const { capitalize, cardPay } = useStyles();
  const {
    type,
    data,
    onDoneCallback,
    onReceiptCallback,
    title,
    success,
    subTitle,
  } = props;
  const { t } = useTranslation();

  const { successIconStyle } = useStyles();

  const [editModal, setEditModal] = useState(false);
  const [payRecieptModal, setPayRecieptModal] = useState(false);
  const [sucessModel, setSucessModel] = useState(false);
  const [saveData, setSaveData] = useState({});
  const addNew = useSelector(
    (state: any) => state.beneficiary.billPayment.addNew
  );

  let transfer = useSelector(
    (state: any) => state.moneyTransfer.other.transfer
  );
  let srcAcount = transfer.fromAccount;
  let destAcount = transfer.toAccount;

  const beneficiaryItemForEdit: any = {
    accountNumber: data.accountNumber,
    nickname: "",
    serviceTypeCode: data.serviceTypeCode,
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
    <SectionSplitter
      height="calc(100vh - 250px)"
      top={
        <>
          <SucessFailureIcon success={success} warning2 />
          <UnderlineText color="primary">
            <H2>{title}</H2>
          </UnderlineText>

          {subTitle && (
            <Box mt={6} mb={6}>
              <Caption>{success? "Your transaction with reference number ":null} <b> {subTitle} </b></Caption> <br/>
              <Caption>Please check the Transaction Queue tab to follow up on the status of the transaction.</Caption>
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
                    heading={<Body1>You are Transfering</Body1>}
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
                    noTag={true}
                    data={getPayListFormattedData(destAcount, type === withinMashreq?"benificiary":"accounts")}
                  />
                }

              />

              <Box mt={10} mb={10} display="flex" alignItems="center">
                <CardPayNow
                  icon={<SvgIcon color="primary" component={User} />}
                  style={{ justifyContent: "space-evenly" }}
                  arrow={true}
                  heading={"Frequent Payment?"}
                  subheading={"Set up as standing instruction"}
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
  );
};

Success.defaultProps = {
  success: true,
};

export default Success;
