import React, { useState } from "react";
import AuthOtp from "../../../../components/authOtp";
import StepperDialogModal from "../../../../components/stepperDialog/stepperDialogModal";
// import { useDispatch } from "react-redux";
import Review from "./Review";
import { useTranslation } from 'react-i18next';
import Success from "./Success";
import * as Endpoint from '../../../../network/Endpoints';

import StartPayments from "./startYourPayments";
import { API } from "../../../../mocks";
import Loader from "../../../../common/loader";
// import * as LandingActions from "../../../../redux/actions/beneficiary/billPayment/landingActions";

const ManageBillPayments = (props: any) => {
  const {
    children,
    billType,
    finalCallback,
    onCloseCallback,
    ...rest
  } = props;
  const leftSideOptions = ["Start Your Payment", "Review", "Authorization", "Confirmation"];
  const [options, setOptions] = useState(leftSideOptions);
  const [step, setStep] = useState("");
  const [startPayentData, setStartPaymentData] = useState({});
  const [success, setSuccess] = useState(true);
  const [loading, setLoading] = useState(false);
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

  const onSuccessOTP = (finalData?: any) => {
    setLoading(true);
      updateStep({step: "confirmation", stepInit: "Confirmation"});
      let getAllData = finalData ? finalData : startPayentData;
      const {accountNumber, salikPinCode, serviceTypeCode, billRefNo, rechargeAmount, selectedAccount} =getAllData as any, url = Endpoint.BILL_PAYMENT_PAY_BILL_ENDPOINT;
      let data: any = {
        "consumerId": accountNumber, //"0504930554",
        "billerType": serviceTypeCode, //"etisalat-prepaid",
        "billRefNo" : billRefNo, //"06120204224478456558",
        "paidAmount": rechargeAmount, //"20.00",
    };

    if(selectedAccount) {
      //salik
      if(salikPinCode) {
        let isValidNumber = !isNaN(Number(salikPinCode));
        data["checkDigit"] = isValidNumber ? btoa(salikPinCode) : salikPinCode;
      }
      if(selectedAccount.type === "cards" && selectedAccount.encryptedCardNumber) {
        data["debitAccountNo"] = selectedAccount.encryptedCardNumber; //cardNo
        data["paymentMode"] = "CARD"; //cardNo
      } else if(selectedAccount.accountNumber) {
        data["debitAccountNo"]= selectedAccount.accountNumber; //accountNumber
        data["paymentMode"] = "ACCOUNT";
      }
    }
    
      const config = {
        method: "POST",
        url,
        data,
      };
        API(config).then((val: any) => {
          setLoading(false);
          if (val && val.data && val.data.data) {
            // const resData = val.data.data;
          } else {
            setSuccess(false);
          }
        }).catch (() => {
        setSuccess(false);
        setLoading(false);
      });
  };

  const onSubmitReview = (item: any) => {
    let updateOptions = {step: "otp", stepInit: "Authorization"};
    if(options && options.length> 0 && options.indexOf("Authorization") === -1) {
      updateOptions = {step: "confirmation", stepInit: "Confirmation"};
      onSuccessOTP(item);
    }
    updateStep(updateOptions);
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
        if(!loading) {
          return (
            <Success
            success={success}
            data={startPayentData}
            type={billType}
            title={t(`billPayments.steps.confirmation.${success ? 'success' : 'failure'}.title`)}
            subTitle={!success ? t(`billPayments.steps.confirmation.failure.desc`) : ""}
            onDoneCallback={()=>successFailureCallback()}
            />
        );

        }else {
          return (<Loader enable={true} />);
        }

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
          <StartPayments data={startPayentData} type={billType} onHandleBeneficiary={()=>onHandleBeneficiary()} onSubmitPayment={onSubmitPayment} onHandleBack={()=>onHandleBack()}/>
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
