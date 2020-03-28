import React, { useState } from "react";
import AuthOtp from "../../../../components/authOtp";
import StepperDialog from "../../../../components/stepperDialog";
import { useDispatch } from "react-redux";
import * as Actions from "../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
import Review from "./Review";
import Confirmation from "../../../../common/confirmation";
import { useTranslation } from 'react-i18next';
import {H2} from "@mashreq-digital/ui";

import StartPayments from "./startYourPayments";
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
  const leftSideOptions = ["Start Your Payment", "Review", "Authorization", "Confirmation"];
  const [options, setOptions] = useState(leftSideOptions);
  const [step, setStep] = useState("asdfsadf");
  const [stepInit, setStepInit] = useState("Start Your Payment");
  const [draftData, setDraftData] = useState<any>({});
const {t} = useTranslation();

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

  const onHandleBeneficiary = () => {
    let updateOptions = [...options];
    updateOptions.splice(2, 1);
    setOptions(updateOptions);
  }

  const onHandleBack = () => {
    setOptions(leftSideOptions);
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
          // <Success
          //   type={billType}
          //   data={draftData}
          //   onButtonCallback={() => successFailureCallback()}
          // />
          <></>
        );

      case "Review":
        return (  
         <Review
          data={{
            dueAmount: 150,
            accountNumber: "12312312",
            serviceTypeCode: "Etisalat Prepaid",
            nickname: "masas",
            id: "111"
          }}
          type="etisalat"
        />)
      default:
        return (
          // <Review
          //   data={{
          //     dueAmount: 150,
          //     accountNumber: "12312312",
          //     serviceTypeCode: "Etisalat Prepaid",
          //     nickname: "masas",
          //     id: "111"
          //   }}
          //   type="etisalat"
          // />
          <StartPayments type={billType} onHandleBeneficiary={()=>onHandleBeneficiary()} onHandleBack={()=>onHandleBack()}/>

          //For success
          // <Confirmation
          // success={true}
          // type="etisalat"
          // title={t(`billPayments.steps.confirmation.success`)}
          // data={{
          //   dueAmount: 150,
          //   accountNumber: "12312312",
          //   serviceTypeCode: "Etisalat Prepaid",
          //   nickname: "masas",
          //   id: "111"
          // }}
          // />

//For Failure 
          // <Confirmation
          // type="etisalat"
          // title={t(`billPayments.steps.confirmation.fail`)}
          // subTitle= {t(`billPayments.steps.confirmation.failSubHeading`)}
          // />

        );
    }
  };

  return (
    <StepperDialog
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
