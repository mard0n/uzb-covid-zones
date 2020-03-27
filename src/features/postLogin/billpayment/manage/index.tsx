import React, { useState } from "react";
import AuthOtp from "../../../../components/authOtp";
import StepperDialog from "../../../../components/stepperDialog";
import { useDispatch } from "react-redux";
import * as Actions from "../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
import Review from "./Review";
import Confirmation from "../../../../common/confirmation";
import { useTranslation } from 'react-i18next';
import {H2} from "@mashreq-digital/ui";


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
          <Review
            data={{
              dueAmount: 150,
              accountNumber: "12312312",
              serviceTypeCode: "Etisalat Prepaid",
              nickname: "masas",
              id: "111"
            }}
            type="etisalat"
          />

          //For success
          // <Confirmation
          // success={true}
          // type="etisalat"
          // title={t(`billPayments.confirmation.success`)}
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
          // title={t(`billPayments.confirmation.fail`)}
          // subTitle= {t(`billPayments.confirmation.failSubHeading`)}
          // />

        );
    }
  };
  return (
    <StepperDialog
      {...rest}
      stepperOptions={[
        "Start Your Payment",
        "Review",
        "Authorization",
        "Confirmation"
      ]}
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
