import React, { useState } from "react";
import AuthOtp from "../../../../components/authOtp";
import StepperDialogModal from "../../../../components/stepperDialog/stepperDialogModal";
import { useDispatch } from "react-redux";
import Review from "./Review";
import { useTranslation } from 'react-i18next';
import Success from "./Success";
import * as Endpoint from '../../../../network/Endpoints';

import StartPayments from "./startYourPayments";
import { API } from "../../../../mocks";
// import * as LandingActions from "../../../../redux/actions/beneficiary/billPayment/landingActions";

const ManageBillPayments = (props: any) => {
  const {
    children,
    billType,
    finalCallback,
    onCloseCallback,
    ...rest
  } = props;
  const dispatch = useDispatch();
  const leftSideOptions = ["Start Your Payment", "Review", "Authorization", "Confirmation"];
  const [options, setOptions] = useState(leftSideOptions);
  const [step, setStep] = useState("");
  const [startPayentData, setStartPaymentData] = useState({});
  const [stepInit, setStepInit] = useState("Start Your Payment");
  // const [draftData, setDraftData] = useState<any>({});
const {t} = useTranslation();

  // const onSubmitCallback = (data: any) => {
  //   if (data && data.id) {
  //     setDraftData(data);
  //     setStep("otp");
  //     setStepInit("Authorization");
  //   }
  // };

  const onSuccessOTP = () => {
    console.log(startPayentData, "final response =========");
      updateStep({step: "confirmation", stepInit: "Confirmation"});
      const {accountNumber, serviceTypeCode, billRefNo, rechargeAmount, selectedAccount} =startPayentData as any, url = Endpoint.BILL_PAYMENT_PAY_BILL_ENDPOINT,
      data= {
        "consumerId": accountNumber, //"0504930554",
        "billerType": serviceTypeCode, //"etisalat-prepaid",
        "billRefNo" : billRefNo, //"06120204224478456558",
        "paymentMode": "ACCOUNT",
        "paidAmount": rechargeAmount, //"20.00",
        "debitAccountNo": selectedAccount.accountNumber //"010490707201"
    };
      const config = {
        method: 'POST',
        url,
        data,
      };
      API(config).then((val: any) => {
        if (val && val.data && val.data.data) {
          const resData = val.data.data;
          console.log(resData, "final response =========");
        }
      });
  };

  const onSubmitReview = (item: any) => {
    updateStep({step: "otp", stepInit: "Authorization"});
    setStartPaymentData(item);
  }

  const successFailureCallback = () => {
    if (finalCallback && typeof finalCallback === "function") {
      finalCallback();
    }
  };

  const onHandleBeneficiary = () => {
    let updateOptions = [...options];
    updateOptions.splice(2, 1);
    setOptions(updateOptions);
  }

  const onHandleBack = () => {
    setOptions(leftSideOptions);
  }

  const updateStep = (data: any) => {
    setStep(data.step);
    setStepInit(data.stepInit);
  }

  /* Stary your payment submit */
  const onSubmitPayment = (data: any) => {
    setStartPaymentData(data);
    updateStep({step: "review", stepInit: "Review"});
    // if(data && data.id) {
      
    // } else {
    //   setStep("otp");
    //   setStepInit("Authorization");
    // }
    setStartPaymentData(data);
  }

  const switchComponent = () => {
    switch (step) {
      case "otp":
        return (
          <AuthOtp
            enableBack={false}
            enableCard={false}
            onSuccess={() => onSuccessOTP()}
          />
        );
      case "confirmation":
        return (
          <Success
          success={true}
          data={startPayentData}
          type={billType}
          title={t(`billPayments.steps.confirmation.success`)}
          onDoneCallback={()=>successFailureCallback()}
          />
      );

      case "review":
        return (  
         <Review
          data={startPayentData}
          type={billType}
          onHandleBack={()=>updateStep({step: "", stepInit: "Start Your Payment"})}
          onSubmit={onSubmitReview}
        />)
      default:
        return (
          <StartPayments type={billType} onHandleBeneficiary={()=>onHandleBeneficiary()} onSubmitPayment={onSubmitPayment} onHandleBack={()=>onHandleBack()}/>
        );
    }
  };

  return (
    <StepperDialogModal
      {...rest}
      stepperOptions={options}
      stepperInit={stepInit}
      step={step}
      type={billType}
      onCloseCallback={() => onCloseCallback()}
      content={switchComponent()}
    />
  );
};

ManageBillPayments.defaultProps = {
  billType: "sewa"
};

export default ManageBillPayments;
