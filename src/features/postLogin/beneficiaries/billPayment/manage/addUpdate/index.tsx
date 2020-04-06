import React, { useState } from "react";
import AddUpdateBillPayment from "./AddUpdateBillPayment";
import AuthOtp from "../../../../../../components/authOtp";
import Success from "./Success";
import StepperDialogModal from "../../../../../../components/stepperDialog/stepperDialogModal";
import { useDispatch } from "react-redux";
import * as Actions from "../../../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
import * as LandingActions from "../../../../../../redux/actions/beneficiary/billPayment/landingActions";

const AddUpdateDialog = (props: any) => {
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
  const [stepInit, setStepInit] = useState("Beneficiary Details");
  const [draftData, setDraftData] = useState<any>({});
  // const addNew = useSelector(
  //   (state: any) => state?.beneficiary?.billPayment?.addNew
  // );

  const onSubmitCallback = (data: any) => {
    if (data && data.id) {
      setDraftData(data);
      setStep("otp");
      setStepInit("Authorization");
    }
  };

  const onSuccessOTP = () => {
    if (draftData && draftData.id) {
      dispatch(
        Actions.activateBeneficiaryRequest({ beneficiaryId: draftData.id })
      );
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
          <Success
            type={billType}
            data={draftData}
            onButtonCallback={() => successFailureCallback()}
          />
        );
      default:
        return (
          <AddUpdateBillPayment
            type={billType}
            isAdd={isAdd}
            edit={resumeData}
            onSubmitCallback={(data: any) => onSubmitCallback(data)}
          />
        );
    }
  };
  return (
    <StepperDialogModal
      {...rest}
      stepperOptions={["Beneficiary Details", "Authorization", "Confirmation"]}
      stepperInit={stepInit}
      step={step}
      type={billType}
      onCloseCallback={() => onCloseCallback()}
      content={switchComponent()}
    />
  );
};

AddUpdateDialog.defaultProps = {
  billType: "sewa"
};

export default AddUpdateDialog;
