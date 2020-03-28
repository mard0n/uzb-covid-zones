import React, { useState } from "react";
import { Box, UnderlineText, H2 } from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import PaymentNumber from "./PaymentNumber";
import RechargeAmount from "./RechargeAmount";

type StartPaymentsProps = {
  type: string | any;
  onHandleBeneficiary?: any;
  onHandleBack?: any;
};

const StartPayments = (props: StartPaymentsProps) => {
  const { type, onHandleBeneficiary, onHandleBack } = props;
  const [toggleView, setToggleView] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const { t } = useTranslation();

  const onClickBackCallback = () => {
    setToggleView(false);
    if (onHandleBack && typeof onHandleBack === "function") {
      onHandleBack();
    }
  };
  const onSubmitCallback = (currentTab: string) => {
    setToggleView(true);
    setActiveTab(currentTab);
  };
  const onClickBeneficiary = (currentTab: string) => {
    setToggleView(true);
    setActiveTab(currentTab);
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
          onClickBeneficiary={(currentTab: string) =>
            onClickBeneficiary(currentTab)
          }
          onSubmit={(currentTab: string) => onSubmitCallback(currentTab)}
        />
      ) : (
        <RechargeAmount
          type={type}
          activeTab={activeTab}
          onClickBackCallback={() => onClickBackCallback()}
        />
      )}
    </Box>
  );
};

export default StartPayments;
