import React, { useState, useEffect } from "react";
import { Box, UnderlineText, H2 } from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import PaymentNumber from "./PaymentNumber";
import RechargeAmount from "./RechargeAmount";

type StartPaymentsProps = {
  type: string | any;
  onHandleBeneficiary?: any;
  onHandleBack?: any;
  onSubmitPayment?: any
};

const StartPayments = (props: StartPaymentsProps) => {
  const { type, onHandleBeneficiary, onHandleBack, onSubmitPayment } = props;
  const [toggleView, setToggleView] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [activeBeneficiary, setActiveBaneficiary] = useState({});

  const { t } = useTranslation();

  useEffect(()=>{
    if(type && (type === "etisalat" || type === "du")) {
      setActiveTab("prepaid");
    }
  },[type]);

  const onChangeTab = (data: string) => {
    setActiveTab(data);
  }

  const onClickBackCallback = () => {
    setToggleView(false);
    if (onHandleBack && typeof onHandleBack === "function") {
      onHandleBack();
    }
  };
  const onProceedCallback = (res: any) => {
    setToggleView(true);
    setActiveBaneficiary(res);
  };
  const onClickBeneficiary = (item: any) => {
    setToggleView(true);
    setActiveBaneficiary(item);
    if (onHandleBeneficiary && typeof onHandleBeneficiary === "function") {
      onHandleBeneficiary();
    }
  };

  return (
    <Box>
      <UnderlineText color="primary">
        <H2>{t("billPayments.steps.startPayment.title")}</H2>
      </UnderlineText>
      {!toggleView ? (
        <PaymentNumber
          type={type}
          onClickBeneficiary={onClickBeneficiary}
          onProceed={(res: any) => onProceedCallback(res)}
          onChangeTab={onChangeTab}
        />
      ) : (
        <RechargeAmount
          type={type}
          activeTab={activeTab}
          activeBeneficiary={activeBeneficiary}
          onClickBackCallback={() => onClickBackCallback()}
          onSubmitPayment={onSubmitPayment}
        />
      )}
    </Box>
  );
};

export default StartPayments;
