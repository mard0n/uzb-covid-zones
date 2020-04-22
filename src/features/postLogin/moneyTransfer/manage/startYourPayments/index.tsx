import React, { useState, useEffect } from "react";
import { Box, UnderlineText, H2, Grid } from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import PayFromList from '../../../../../components/billpayment/review/PayFromList';

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
    <>
    <Box mb={10}>
      <UnderlineText color="primary">
        <H2>Start your transfer</H2>
      </UnderlineText>
    </Box>

    <Grid item xl={12} lg={6} md={5} sm={12} xs={12}>
    <PayFromList onChangeList={()=>{}} />
  </Grid>
  </>
  );
};

export default StartPayments;
