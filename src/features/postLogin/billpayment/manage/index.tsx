import React, { useState } from "react";
import AuthOtp from "../../../../components/authOtp";
// import Success from "./Success";
import StepperDialog from "../../../../components/stepperDialog";
import { useDispatch } from "react-redux";
import * as Actions from "../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
// import * as LandingActions from "../../../../redux/actions/beneficiary/billPayment/landingActions";

const ManageBillPayments = (props: any) => {
  const {
    children,
    billType,
    isAdd,
    resumeData,
    finalCallback,
    onCloseCallback,
    ...rest
  } = props;
  const dispatch = useDispatch();
  const [step, setStep] = useState("");
  const [stepInit, setStepInit] = useState("Start Your Payment");
  const [draftData, setDraftData] = useState<any>({});

  const onSubmitCallback = (data: any) => {
    if (data && data.id) {
      setDraftData(data);
      setStep("otp");
      setStepInit("Authorization");
    }
  };

  const onSuccessOTP = () => {
    if (draftData && draftData.id) {
      // dispatch(
      //   Actions.activateBeneficiaryRequest({ beneficiaryId: draftData.id })
      // );
      setStep("confirmation");
      setStepInit("Confirmation");
    }
  };

  const successFailureCallback = () => {
    if (finalCallback && typeof finalCallback === "function") {
      dispatch(Actions.clearBeneficiaryAddNew());
      finalCallback();
    }
  };

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
          // <Success
          //   type={billType}
          //   data={draftData}
          //   onButtonCallback={() => successFailureCallback()}
          // />
          <></>
        );
      default:
        return (
          // <AddUpdateBillPayment
          //   type={billType}
          //   isAdd={isAdd}
          //   edit={resumeData}
          //   onSubmitCallback={(data: any) => onSubmitCallback(data)}
          // />
          <></>
        );
    }
  };
  return (
    <StepperDialog
      {...rest}
      stepperOptions={["Start Your Payment", "Review", "Authorization", "Confirmation"]}
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
