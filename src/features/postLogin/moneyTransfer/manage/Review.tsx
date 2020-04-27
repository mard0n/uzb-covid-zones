import React, { useState } from "react";
import {
  Box,
  UnderlineText,
  H2,
  SectionSplitter,
  Button,
  Grid,
  H5,
  colors,
  makeStyles,
  SvgIcon,
  Body1,
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import BackButton from "../../../../common/backButton/index";
import CardPayList from "../../../../common/cardPayList/index";
import CardDash from "../../../../common/cardDash/index";
import { useSelector } from "react-redux";
import PayListItem from "../../../../components/billpayment/review/payList/index";
import ReviewAmountType from "../../../../components/billpayment/reviewAmountType/index";
import { ArrowDown } from "@mashreq-digital/webassets";
import CardPayNow from "../../../../common/card/CardPayNow";
import { getPayListFromattedData } from '../../../../util/getPayListFormattedData';

const useStyles = makeStyles(() => ({
  iconStyle: {
    backgroundColor: "rgb(224, 224, 224)",
    "& > svg": {
      height: "15px",
      width: "15px",
    },
  }
}));

const Review = (props: any) => {
  const { type, onHandleBack, onSubmit, currency } = props;
  const { t } = useTranslation();
  const { iconStyle } = useStyles();
  let transfer = useSelector(
    (state: any) => state.moneyTransfer.other.transfer
  );
  const financialTxnNumber = useSelector(
    (state: any) => state.moneyTransfer.other.payListData.financialTxnNumber
  );

  let srcAcount = transfer.fromAccount;
  let destAcount = transfer.toAccount;

  return (
    <SectionSplitter
      height={"calc(100vh - 400px)"}
      top={
        <>
          <UnderlineText color="primary">
            <H2>Review your transfer</H2>
          </UnderlineText>

          <CardDash
            leftContent={
              <CardPayNow
                icon={
                  <Box
                    className={iconStyle}
                    p={1.6}
                    borderRadius="50%"
                    display="flex"
                  >
                    <SvgIcon height="1rem" width="1rem" component={ArrowDown} />
                  </Box>
                }
                heading={<Body1>You are Transfering</Body1>}
                subheading={<H5>{transfer.amount.type} {Math.abs(transfer.amount.total)}</H5>}
              />
            }
            rightContent={<PayListItem data={
              getPayListFromattedData(destAcount, "accounts")            
            } />}
          />

          <H5>Paying from</H5>

          <Grid item xl={12} lg={6} md={5} sm={12} xs={12}>
            <PayListItem data={
              getPayListFromattedData(srcAcount, "accounts")            
            } />
          </Grid>
        </>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">
          <BackButton
            disableRoute
            onClickBack={() => {
              onHandleBack();
            }}
          />

          <Button
            variant="contained"
            size="large"
            color="primary"
            disabled={false}
            onClick={()=>{
              let data = {
                "amount": transfer.amount.total,
              "currency": transfer.amount.type,
              "dealNumber": "",
              "finTxnNo": financialTxnNumber,
              "fromAccount": transfer.fromAccount.accountNumber,
              "purposeCode": "",
              "serviceType": type,
              "toAccount": transfer.toAccount.accountNumber
              };
              
              onSubmit(data)}
            }
          >
            {t("common.action.pay")} {transfer.amount.type} {Math.abs(transfer.amount.total)}
          </Button>
        </Box>
      }
    />
  );
};

export default Review;
// {currency} {rechargeAmount}
