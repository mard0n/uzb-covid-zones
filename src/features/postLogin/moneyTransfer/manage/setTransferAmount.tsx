import React, { useState ,useEffect} from "react";
import {
  UnderlineText,
  H2,
  SectionSplitter,
  Button,
  Box,
  SubMain,
  H5,
  Caption,
  InfoCard,
  H4,
} from "@mashreq-digital/ui";
import BackButton from "../../../../common/backButton";
import InputWrapper from "../../../../common/inputWrapper/index";
import { FormFields } from "./formData/index";
import { Rocket } from "@mashreq-digital/webassets";
import SuggestionBox from "../../../../common/suggetionBox/index";
import { useSelector } from 'react-redux';
import useCurrencyConverter from "../../../../redux/hooks/useCurrencyConverter";

const SetTransferAmount = (props: any) => {

  let transfer = useSelector(
    (state: any) => state.moneyTransfer.other.transfer
  );


  const [exchangeRate, setExchangeRate] = useState('');
  const [maxAmounts, setMaxAmounts] = useState({});
  const { onHandleBack, serviceType } = props;
  const [recieveAmount, setRecieveAmount] :any = useState();
  const [transferAmount, setTransferAmount]:any = useState();
  const [fromTouched, setFromTouched] = useState(false);
  const [toTouched, setToTouched] = useState(false);
  let srcAmount  = transfer.fromAccount.availableBalance;
  let srcCurrency = transfer.fromAccount.currency;
  let destCurrency = transfer.toAccount.currency;
  const currenciesAreDifferent = srcCurrency !== destCurrency;
  const {
    currencyConverterLoading,
    currencyConverterResponse,
    currencyConverterError,
    fetchDebounceCurrencyRate,
    fetchCurrencyRate,
    clearCurrencyRateState,
  } = useCurrencyConverter();



  useEffect(() => {
    console.log('currencyConverterResponse', currencyConverterResponse);
    if (currencyConverterResponse) {
      const {exchangeRate = ''} = currencyConverterResponse;
      setExchangeRate(exchangeRate);
      if (exchangeRate) {
        let amount = parseFloat(srcAmount) / parseFloat(exchangeRate);
        const newAmount = amount.toFixed(2);
        setMaxAmounts({...maxAmounts, "to":newAmount});
      }
    }
  }, [currencyConverterResponse, maxAmounts, srcAmount]);

 

  useEffect(() => {
    if (currenciesAreDifferent) {
      setMaxAmounts({...maxAmounts,"from": srcAmount});
      const data: any = {
        accountNumber: transfer.fromAccount.accountNumber,
        accountCurrency: srcCurrency,
        accountCurrencyAmount: transfer.fromAccount.availableBalance,
        transactionCurrency: destCurrency, //TransferType.LOCAL == transferTypeCode ? 'AED' :
      };
      fetchCurrencyRate(data);
    }
  }, [currenciesAreDifferent, destCurrency, fetchCurrencyRate, maxAmounts, srcAmount, srcCurrency, transfer.fromAccount.accountNumber, transfer.fromAccount.availableBalance]);

  // accountNumber

  const onChangeOfReciveAmount = (obj: any) => {
    setRecieveAmount(obj.customAmount.config.value);
    setTransferAmount(obj.customAmount.config.value / parseFloat(exchangeRate));
    setFromTouched(obj.customAmount.touched);

  };
  const onChangeOfTransferAmount = (obj: any) => {
    setTransferAmount(obj.customAmount.config.value);
    setRecieveAmount(obj.customAmount.config.value * parseFloat(exchangeRate));
    setToTouched(obj.customAmount.touched);
  };

  return (
    <SectionSplitter
      height={"calc(100vh - 400px)"}
      top={
        <>
          <UnderlineText color="primary">
            <H2>What amount would you like to transfer?</H2>
          </UnderlineText>

          <SubMain
            content={
              <>
              {
                currencyConverterError && 
                <h1>{ currencyConverterError }</h1>
              } 


              <Box mt={10}>
                  <H5>The Recieving account will get {recieveAmount}</H5>
                  <InputWrapper
                    initialState={FormFields.recievingAmount.fields}
                    // onBlur={onBlurFields}
                    onChangeFields={onChangeOfReciveAmount}
                  />
                  {recieveAmount && fromTouched && (
                    <SuggestionBox
                      activeStep={recieveAmount}
                      currency={srcCurrency}
                      maxPrice={Math.floor(serviceType.maxAmount)}
                    />
                  )}
                </Box>


               {currenciesAreDifferent? <Box mt={10}>
                  <H5>You will be debited { transferAmount}</H5>
                  <InputWrapper
                    initialState={FormFields.transferAmount.fields}
                    // onBlur={onBlurFields}
                    onChangeFields={onChangeOfTransferAmount}
                  />
                  {transferAmount && toTouched && (
                    <SuggestionBox
                      activeStep={transferAmount}
                      currency={destCurrency}
                      maxPrice={Math.floor(serviceType.maxAmount)}
                    />
                  )}
                  <Caption>
                    At an exchange rate of <b>{exchangeRate}</b>
                  </Caption>
                </Box> :null}
              </>
            }
            image={
              <>
             {currenciesAreDifferent?<Box width={"300px"}>
                <InfoCard
                  icon={Rocket}
                  fullWidth={true}
                  title="Exchange Rate"
                  content={
                    <>
                      <Caption>
                        Your exchange rate is calculated on the following values
                      </Caption>
                      <Box mt={4}>
                        <H4>{srcCurrency}  1.00 = { destCurrency + " " + (1/parseFloat(exchangeRate)).toFixed(2)}</H4>
                        <Caption>({srcCurrency  + " " +  (100000.00 * parseFloat(exchangeRate)).toFixed(2)} = {destCurrency} 100,000.00)</Caption>
                      </Box>
                    </>
                  }
                />
              </Box>:null
            }
            </>
            }
          />
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
            color="primary"
            disabled={true}
            onClick={() => {}}
            size="large"
          >
            Pick a Time
          </Button>
        </Box>
      }
    />
  );
};
export default SetTransferAmount;
