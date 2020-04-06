import React, { useState } from "react";
import {
  Box,
  UnderlineText,
  H2,
  SectionSplitter,
  Button,
  Grid
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import { ArrowDown } from "@mashreq-digital/webassets";
import BackButton from "../../../../common/backButton/index";
import PayFromList from "../../../../components/billpayment/review/PayFromList";
import ReviewAmountType from "../../../../components/billpayment/reviewAmountType";

const Review = (props: any) => {
  const { data, type, onHandleBack, onSubmit } = props;
  const { rechargeAmount } = data;
  const { t } = useTranslation();
  const [ selectedAccount, setSelectedAccount ] = useState({});
  const { currency, availableBalance } = selectedAccount as any;
  const parsedAmount = parseInt(rechargeAmount);
  const isDisabled = !(parsedAmount !== 0 && parsedAmount > 0 && availableBalance > parsedAmount);
  


  const onChangeList = (item: any) => {
    setSelectedAccount(item)
  }
  
  return (
    <SectionSplitter
      height={"calc(100vh - 400px)"}
      top={
        <>
          <UnderlineText color="primary">
            <H2>{t("billPayments.steps.review.title")}</H2>
          </UnderlineText>
          {rechargeAmount && (
            <ReviewAmountType data={data} type={type} leftIcon={ArrowDown} title={t("billPayments.steps.review.youarePaying")} />
          )}

          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
            <PayFromList onChangeList={onChangeList} />
          </Grid>
        </>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">
          <BackButton disableRoute onClickBack={() => {
              onHandleBack()
            }}/>
            {rechargeAmount &&
          <Button
            variant="contained"
            size="large"
            color="primary"
            disabled={isDisabled}
            onClick={()=>onSubmit({...data, selectedAccount})}
          >
            {t("common.action.pay")} {currency} {rechargeAmount}
          </Button>
          }
        </Box>
      }
    />
  );
};

export default Review;
