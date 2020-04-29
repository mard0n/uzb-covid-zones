import React, { useState,useEffect } from "react";
import AuthOtp from "../../../../components/authOtp";
import StepperDialogModal from "../../../../components/stepperDialog/stepperDialogModal";
import Review from "./Review";
import { useTranslation } from "react-i18next";
import Success from "./Success";
import StartPayments from "./startYourPayments";
import Loader from "../../../../common/loader";
import SetTransferAmount from "./setTransferAmount";
import PickTime from "./pickTime";
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from "../../../../redux/actions/moneyTransfer/transaction";
import * as PayListActions from "../../../../redux/actions/moneyTransfer/payListActions";

import { withinMashreq } from "../../../../util/constants";
const ManageMoneyTransferModal = (props: any) => {
  const {
    children,
    serviceType,
    finalCallback,
    onCloseCallback,
    ...rest
  } = props;
  const leftSideOptions = [
    "Start Your Transfer",
    "Set transfer amount",
    "Pick a time",
    "Review",
    "Confirmation",
  ];

  console.log("ManageMoneyTransferModal -> serviceType", serviceType)
  const [options, setOptions] = useState(leftSideOptions);
  const [step, setStep] = useState("");
  const [startPayentData, setStartPaymentData] = useState({});
  const [success, setSuccess] = useState(true);
  const [successMessage, setSuccessMessage] = useState("Congradulations Your transaction was succesfull");
  const [loading, setLoading] = useState(false);
  const [stepInit, setStepInit] = useState("Start Your Transfer");
  const { t } = useTranslation();
const dispatch = useDispatch();

let transaction = useSelector(
  (state: any) => state.moneyTransfer.makeTransfer
);



  const onSubmitReview = (item: any) => {
    dispatch(Actions.moneyTransferInitiateTransfer(item));
    updateStep({ step: "confirmation", stepInit: "Confirmation" });
    setStartPaymentData(item);
  };

  useEffect(() => { 
    setLoading(transaction.loading);
    if(transaction.error){
      setSuccess(false);
    }else{
      setSuccessMessage(transaction && transaction.response && transaction.response.mwReferenceNo );
      setSuccess(true);
    }
  }, [transaction]);


  const successFailureCallback = () => {
    dispatch(PayListActions.setTransferObject({}));
    if (finalCallback && typeof finalCallback === "function") {
      finalCallback();
    }
  };

  const onHandleBack = () => {
    setOptions(leftSideOptions);
  };

  const updateStep = (data: any) => {
    setStep(data.step);
    setStepInit(data.stepInit);
  };

  const onSubmitPayment = (data: any) => {
    updateStep({
      step: "Set transfer amount",
      stepInit: "Set transfer amount",
    });
  };

  const onSubmitSetTransfer = (data: any) => {
    updateStep({ step: "Pick a time", stepInit: "Pick a time" });
  };

  const onSubmitPickTime = (data: any) => {
    updateStep({ step: "Review", stepInit: "Review" });
  };

  const switchComponent = () => {
    switch (step) {
      case "Pick a time":
        return (
          <PickTime
            onHandleBack={() =>
              updateStep({
                step: "Set transfer amount",
                stepInit: "Set transfer amount",
              })
            }
            onNextStep={onSubmitPickTime}
          />
        );
      case "Set transfer amount":
        return (
          <SetTransferAmount
            serviceType={serviceType}
            onHandleBack={() =>
              updateStep({
                step: "Start Your Transfer",
                stepInit: "Start Your Transfer",
              })
            }
            onNextStep={onSubmitSetTransfer}
          />
        );
      case "confirmation":
        if (!loading) {
          return (
            <Success
              success={success}
              data={startPayentData}
              type={serviceType.code}
              title={t(
                `billPayments.steps.confirmation.${
                  success ? "success" : "failure"
                }.title`
              )}
              subTitle={
                !success
                  ? "oops! somthing went wrong"
                  : successMessage
              }
              onDoneCallback={() => successFailureCallback()}
            />
          );
        } else {
          return <Loader enable={true} />;
        }

      case "Review":
        return (
          <Review
            data={startPayentData}
            type={serviceType.code}
            onHandleBack={() =>
              updateStep({ step: "Pick a time", stepInit: "Pick a time" })
            }
            onSubmit={onSubmitReview}
          />
        );
      default:
        return (
          <StartPayments
            data={startPayentData}
            type={serviceType.code}
            onSubmitPayment={onSubmitPayment}
            onHandleBack={() => onHandleBack()}
          />
        );
    }
  };

  return (
    <StepperDialogModal
      {...rest}
      iconType={serviceType.code !== withinMashreq}
      logo={serviceType.code === withinMashreq}
      stepperOptions={options}
      stepperInit={stepInit}
      step={step}
      type={serviceType.code}
      description={serviceType.name}
      onCloseCallback={() => onCloseCallback()}
      content={switchComponent()}
    />
  );
};

export default ManageMoneyTransferModal;
