import React, { useState } from "react";
import AuthOtp from "../../../../components/authOtp";
import StepperDialogModal from "../../../../components/stepperDialog/stepperDialogModal";
import Review from "./Review";
import { useTranslation } from 'react-i18next';
import Success from "./Success";
import StartPayments from "./startYourPayments";
import Loader from "../../../../common/loader";
import SetTransferAmount from "./setTransferAmount";

const ManageMoneyTransferModal = (props: any) => {
  const {
    children,
    serviceType,
    finalCallback,
    onCloseCallback,
    ...rest
  } = props;
  const leftSideOptions = ["Start Your Transfer","Set transfer amount","Pick a time","Review", "Confirmation"];
  const [options, setOptions] = useState(leftSideOptions);
  const [step, setStep] = useState("");
  const [startPayentData, setStartPaymentData] = useState({});
  const [success, setSuccess] = useState(true);
  const [loading, setLoading] = useState(false);
  const [stepInit, setStepInit] = useState("Start Your Transfer");
  const {t} = useTranslation();

  const onSubmitReview = (item: any) => {
    let updateOptions = {step: "otp", stepInit: "Authorization"};
    if(options && options.length> 0 && options.indexOf("Authorization") === -1) {
      updateOptions = {step: "confirmation", stepInit: "Confirmation"};
      // onSuccessOTP(item);
    }
    updateStep(updateOptions);
    setStartPaymentData(item);
  }

  const successFailureCallback = () => {
    if (finalCallback && typeof finalCallback === "function") {
      finalCallback();
    }
  };


  const onHandleBack = () => {
    setOptions(leftSideOptions);
  }

  const updateStep = (data: any) => {
    setStep(data.step);
    setStepInit(data.stepInit);
  }

  const onSubmitPayment = (data: any) => {
    updateStep({step: "Set transfer amount", stepInit: "Set transfer amount"});
  }


  const switchComponent = () => {
    switch (step) {
      case "otp":
        return (
          <AuthOtp
            enableBack={false}
            enableCard={false}
            // onSuccess={() => onSuccessOTP()}
          />
        );
        case "Set transfer amount":
          return (
            <SetTransferAmount
            serviceType = {serviceType}
            onHandleBack={()=>updateStep({step: "Start Your Payment", stepInit: "Start Your Payment"})}
            />
          );
      case "confirmation":
        if(!loading) {
          return (
            <Success
            success={success}
            data={startPayentData}
            type={serviceType.code}
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
          type={serviceType.code}
          onHandleBack={()=>updateStep({step: "", stepInit: "Start Your Payment"})}
          onSubmit={onSubmitReview}
        />)
      default:
        return (
          <StartPayments data={startPayentData} type={serviceType.code} onSubmitPayment={onSubmitPayment} onHandleBack={()=>onHandleBack()}/>
        );
    }
  };

  return (
    <StepperDialogModal
      {...rest}
      iconType={true}
      stepperOptions={options}
      stepperInit={stepInit}
      step={step}
      type={serviceType.code}
      onCloseCallback={() => onCloseCallback()}
      content={switchComponent()}
    />
  );
};

export default ManageMoneyTransferModal;
