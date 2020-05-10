import React, { useState,useEffect } from "react";
import {
  Box,
  UnderlineText,
  H2,
  SectionSplitter,
  Button,
  Grid,
  H5,
  makeStyles,
  SvgIcon,
  Body1,
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import BackButton from "../../../../common/backButton/index";
import CardDash from "../../../../common/cardDash/index";
import { useSelector,useDispatch } from "react-redux";
import PayListItem from "../../../../components/billpayment/review/payList/index";
import { ArrowDown } from "@mashreq-digital/webassets";
import CardPayNow from "../../../../common/card/CardPayNow";
import { getPayListFormattedData } from '../../../../util/getPayListFormattedData';
import { MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_SUCCES, MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_AMOUNT } from "../../../../router/config";
import { useHistory } from 'react-router-dom';
import * as Actions from "../../../../redux/actions/moneyTransfer/transaction";
import Loader from '../../../../common/loader/index';



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
  const { serviceType,setStep } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [startPayentData, setStartPaymentData] = useState({});

  const { iconStyle } = useStyles();
  let transfer = useSelector(
    (state: any) => state.moneyTransfer.other.transfer
  );
  const financialTxnNumber = useSelector(
    (state: any) => state.moneyTransfer.other.payListData.financialTxnNumber
  );
 const history = useHistory();
 const dispatch = useDispatch();

  let transaction = useSelector(
    (state: any) => state.moneyTransfer.makeTransfer
  );
  console.log("Review -> transaction pyr", transaction)
  
  const onSubmit = () => {
    console.log("onSubmit -> item majama")
    let data = {
      "amount": transfer.amount.total,
    "currency": transfer.amount.type,
    "dealNumber": "",
    "finTxnNo": financialTxnNumber,
    "fromAccount": transfer.fromAccount.accountNumber,
    "purposeCode": "",
    "serviceType": serviceType.code,
    "toAccount": transfer.toAccount.accountNumber
    };
    dispatch(Actions.moneyTransferInitiateTransfer(data));    
    setStartPaymentData(data);
  };

  useEffect(() => {
    setLoading(transaction.loading);
    console.log("Review -> transaction pyr", transaction)
    if(transaction && transaction.error || transaction.response)
   { 
    if (transaction.error) {
      setSuccess(false);
    } else {
      setSuccessMessage(
        transaction &&
          transaction.response &&
          transaction.response.mwReferenceNo
      );
      setSuccess(true);
    }
    gotoConfirmation();
  }

      /* Patch - Don't remove the below comment otherwiser useeffect will expect a dependency. 
    We should add onChangeList as dependency then source api will get triggered infinitely */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction]);


const gotoConfirmation = () => {
  history.replace({
    pathname: MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_SUCCES,
    state: {
      serviceType:serviceType,
      success:success,
      data:startPayentData,
      type:serviceType.code,
      title:t(`billPayments.steps.confirmation.${success ? "success" : "failure"}.title`),
      subTitle:!success ? "oops! somthing went wrong" : successMessage
    }
  });
  setStep(3);
}
 

  const onHandleBack = () => {
    history.replace({
      pathname: MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_AMOUNT,
      state: {serviceType:serviceType}
    });
    setStep(1);
  };
  


  let srcAcount = transfer.fromAccount;
  let destAcount = transfer.toAccount;

  return (
    <>
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
            rightContent={
              <PayListItem data={
              getPayListFormattedData(destAcount, "accounts")            
            } />
      
          }
          />

          <H5>Paying from</H5>

          <Grid item xl={12} lg={6} md={5} sm={12} xs={12}>
            <PayListItem data={
              getPayListFormattedData(srcAcount, "accounts")            
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
            onClick={()=>onSubmit()}
          >
            {t("common.action.pay")} {transfer.amount.type} {Math.abs(transfer.amount.total)}
          </Button>
        </Box>
      }
    />
    {loading && <Loader enable={true} />}
  </>
  );

};

export default Review;
// {currency} {rechargeAmount}
