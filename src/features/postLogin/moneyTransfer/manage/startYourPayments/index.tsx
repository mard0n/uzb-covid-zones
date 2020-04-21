import React, { useState, useEffect } from "react";
import { Box, UnderlineText, H2 } from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";

type StartPaymentsProps = {
  type: string | any;
  onHandleBeneficiary?: any;
  onHandleBack?: any;
  data? : any;
  onSubmitPayment?: any
};

const StartPayments = (props: StartPaymentsProps) => {
  const { type, data, onHandleBeneficiary, onHandleBack, onSubmitPayment } = props;

  const { t } = useTranslation();


  return (
    <Box>
      <UnderlineText color="primary">
        <H2>Start your transfer</H2>
      </UnderlineText>

   
    </Box>
  );
};

export default StartPayments;
