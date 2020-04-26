import React, { useState } from "react";
import {
  UnderlineText,
  Button,
  Box,
  H2,
  H4,
  Caption,
  SectionSplitter,
  SvgIcon,
} from "@mashreq-digital/ui";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Check, Phone24 } from "@mashreq-digital/webassets";
// import getBeneficiariesAvatar from "../../../../util/getBeneficiariesAvatar";
import SucessFailureIcon from "../../../../common/successFailureIcon";
import ReviewAmountType from "../../../../components/billpayment/reviewAmountType";
import CardPayNow from "../../../../common/card/CardPayNow";
import PaymentReceipt from "../../../../common/paymentReceipt/index";

type SuccessProps = {
  success: boolean;
  type: string;
  title: string;
  subTitle?: string;
  data?: any;
  onDoneCallback?: any;
  onReceiptCallback?: any;
};

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

  const [editModal, setEditModal] = useState(false);
  const [payRecieptModal, setPayRecieptModal] = useState(false);
  const [sucessModel, setSucessModel] = useState(false);
  const [saveData, setSaveData] = useState({});
  const addNew = useSelector((state:any) => state.beneficiary.billPayment.addNew);


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



  // if(addNew == "" && benErrorOnSave !== "" ){
  //   console.log("error in creating benificiary");
  //   alert("error in creating benificiary == " + benErrorOnSave);
  // }else{
  //   console.log("addnew is pushpa ", addNew);
  //   setSucessModel(true);
  // }

  return (
    <SectionSplitter
      height="calc(100vh - 250px)"
      top={
        <>
          <SucessFailureIcon success={success} warning/>
          <UnderlineText color="primary">
            <H2>{title}</H2>
          </UnderlineText>

          {subTitle && (
            <Box mt={6} mb={6}>
              <Caption>{subTitle}</Caption>
            </Box>
          )}
          {success ? (data && type && (
            <>
              <ReviewAmountType
                data={data}
                type={type}
                leftIcon={Check}
                isSuccess
                title={"Debited"}
              />
              <Box mt={6}>
                <Button onClick={() => setEditModal(true)}>
                  <CardPayNow
                    style={{ justifyContent: "space-evenly" }}
                    arrow={true}
                    heading={t(`billPayments.steps.confirmation.payment`)}
                    subheading={t(`billPayments.steps.confirmation.saveIt`)}
                  />
                </Button>
              </Box>
            </>
          ))
          :
            <>
            <Box mt={10} display="flex" alignItems="center">
            <H4>{t(`billPayments.steps.confirmation.contactus`)} </H4>
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
          }



    
          {payRecieptModal && (
            <PaymentReceipt
              title={"Your invoice"}
              billRefNo = {data.billRefNo}
              openModal={payRecieptModal}
              paymentSummary={payreceptData}
              onCloseModal={() => { setPayRecieptModal(false)}}
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
                setPayRecieptModal(true)
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
