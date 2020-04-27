import React, { useState, useEffect } from "react";
import {
  UnderlineText,
  H2,
  SectionSplitter,
  Button,
  Box,
  SubMain,
  Grid,
  H5,
  Caption,
  InfoCard,
  H4,
  TextField,
  InputAdornment,
} from "@mashreq-digital/ui";
import BackButton from "../../../../common/backButton";
import { Rocket } from "@mashreq-digital/webassets";
import SuggestionBox from "../../../../common/suggetionBox/index";
import { useSelector,useDispatch } from "react-redux";
import useCurrencyConverter from "../../../../redux/hooks/useCurrencyConverter";
import * as Actions from "../../../../redux/actions/moneyTransfer/payListActions";

const SetTransferAmount = (props: any) => {
  let transfer = useSelector(
    (state: any) => state.moneyTransfer.other.transfer
  );
  const dispatch = useDispatch();

  const [exchangeRate, setExchangeRate] = useState("");
  const [maxAmounts, setMaxAmounts] = useState({});
  const { onHandleBack, serviceType,onNextStep } = props;
  const [sourceAmount, setsourceAmount]: any = useState();
  const [destinationAmount, setDestinationAmount]: any = useState();
  const [fromTouched, setFromTouched] = useState(false);
  const [toTouched, setToTouched] = useState(false);
  let srcAmount = transfer.fromAccount.availableBalance;
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
    console.log("currencyConverterResponse", currencyConverterResponse);
    if (currencyConverterResponse) {
      const { exchangeRate = "" } = currencyConverterResponse;
      setExchangeRate(exchangeRate);
      if (exchangeRate) {
        let amount = parseFloat(srcAmount) / parseFloat(exchangeRate);
        const newAmount = amount.toFixed(2);
        setMaxAmounts({ ...maxAmounts, to: newAmount });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyConverterResponse, srcAmount]);

  useEffect(() => {
    if (currenciesAreDifferent) {
      setMaxAmounts({ ...maxAmounts, from: srcAmount });
      const data: any = {
        accountNumber: transfer.fromAccount.accountNumber,
        accountCurrency: srcCurrency,
        accountCurrencyAmount: transfer.fromAccount.availableBalance,
        transactionCurrency: destCurrency, //TransferType.LOCAL == transferTypeCode ? 'AED' :
      };
      fetchCurrencyRate(data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeOfReciveAmount = (event: any) => {
    setsourceAmount(event.target.value);
    setDestinationAmount(
      (event.target.value / parseFloat(exchangeRate)).toFixed(2)
    );
  };
  const onChangeOfTransferAmount = (event: any) => {
    setDestinationAmount(event.target.value);
    setsourceAmount((event.target.value * parseFloat(exchangeRate)).toFixed(2));
  };

  console.log("SetTransferAmount -> serviceType",   serviceType.maxAmount  )
  return (
    <SectionSplitter
      height={"calc(100vh - 400px)"}
      top={
        <>
          <UnderlineText color="primary">
            <H2>What amount would you like to transfer?</H2>
          </UnderlineText>
          <Grid container>
            <Grid item xs={6}>
              
            <>
                <Box mt={10}>
                  <H5>The Recieving account will get</H5>
                  <TextField
                      fullWidth
                      label="Transfer amount"
                      id="transferAmount"
                      variant="filled"
                      onFocus={() => {
                        setFromTouched(false);
                        setToTouched(true);
                      }}
                      value={destinationAmount}
                      onChange={onChangeOfTransferAmount}
                      inputProps={{
                        "aria-label": "Transfer amount input box",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {destCurrency}
                          </InputAdornment>
                        ),
                      }}
                    />

                    {destinationAmount && toTouched && (
                      <SuggestionBox
                        activeStep={destinationAmount}
                        currency={destCurrency}
                        maxPrice={ currenciesAreDifferent?Math.floor((serviceType.maxAmount / parseFloat(exchangeRate))): Math.floor(serviceType.maxAmount)}

                      />
                    )}
 
                </Box>

                {currenciesAreDifferent ? (
                  <Box mt={10}>
                    <H5>You will be debited</H5>
                    <TextField
                    fullWidth
                    label="Recieving Amount"
                    value={sourceAmount}
                    id="recievingAmount"
                    onFocus={() => {
                      setToTouched(false);
                      setFromTouched(true);
                    }}
                    onChange={onChangeOfReciveAmount}
                    variant="filled"
                    inputProps={{
                      "aria-label": "Reciving amount input box",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {srcCurrency}
                        </InputAdornment>
                      ),
                    }}
                  />

                  {sourceAmount && fromTouched && (
                    <SuggestionBox
                      activeStep={sourceAmount}
                      currency={srcCurrency}
                      maxPrice={Math.floor(serviceType.maxAmount)}
                      />
                  )}
                  <Caption>
                  At an exchange rate of <b>{exchangeRate}</b>
                </Caption>
                  </Box>
                ) : null}
              </>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={4}>
            <>
                {currenciesAreDifferent ? (
                  <Box width={"300px"}>
                    <InfoCard
                      icon={Rocket}
                      fullWidth={true}
                      title="Exchange Rate"
                      content={
                        <>
                          <Caption>
                            Your exchange rate is calculated on the following
                            values
                          </Caption>
                          <Box mt={4}>
                            <H4>
                              {srcCurrency} 1.00 ={" "}
                              {destCurrency +
                                " " +
                                (1 / parseFloat(exchangeRate)).toFixed(2)}
                            </H4>
                            <Caption>
                              (
                              {srcCurrency +
                                " " +
                                (100000.0 * parseFloat(exchangeRate)).toFixed(
                                  2
                                )}{" "}
                              = {destCurrency} 100,000.00)
                            </Caption>
                          </Box>
                        </>
                      }
                    />
                  </Box>
                ) : null}
              </>
            </Grid>
          </Grid>

          {/* <SubMain
            content={
              <>
                <Box mt={10}>
                  <H5>The Recieving account will get</H5>
                  <TextField
                      fullWidth
                      label="Transfer amount"
                      id="transferAmount"
                      variant="filled"
                      onFocus={() => {
                        setFromTouched(false);
                        setToTouched(true);
                      }}
                      value={destinationAmount}
                      onChange={onChangeOfTransferAmount}
                      inputProps={{
                        "aria-label": "Transfer amount input box",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {destCurrency}
                          </InputAdornment>
                        ),
                      }}
                    />

                    {destinationAmount && toTouched && (
                      <SuggestionBox
                        activeStep={destinationAmount}
                        currency={destCurrency}
                        maxPrice={ currenciesAreDifferent?Math.floor((serviceType.maxAmount / parseFloat(exchangeRate))): Math.floor(serviceType.maxAmount)}

                      />
                    )}
 
                </Box>

                {currenciesAreDifferent ? (
                  <Box mt={10}>
                    <H5>You will be debited</H5>
                    <TextField
                    fullWidth
                    label="Recieving Amount"
                    value={sourceAmount}
                    id="recievingAmount"
                    onFocus={() => {
                      setToTouched(false);
                      setFromTouched(true);
                    }}
                    onChange={onChangeOfReciveAmount}
                    variant="filled"
                    inputProps={{
                      "aria-label": "Reciving amount input box",
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {srcCurrency}
                        </InputAdornment>
                      ),
                    }}
                  />

                  {sourceAmount && fromTouched && (
                    <SuggestionBox
                      activeStep={sourceAmount}
                      currency={srcCurrency}
                      maxPrice={Math.floor(serviceType.maxAmount)}
                      />
                  )}
                  <Caption>
                  At an exchange rate of <b>{exchangeRate}</b>
                </Caption>
                  </Box>
                ) : null}
              </>
            }
            image={
              <>
                {currenciesAreDifferent ? (
                  <Box width={"300px"}>
                    <InfoCard
                      icon={Rocket}
                      fullWidth={true}
                      title="Exchange Rate"
                      content={
                        <>
                          <Caption>
                            Your exchange rate is calculated on the following
                            values
                          </Caption>
                          <Box mt={4}>
                            <H4>
                              {srcCurrency} 1.00 ={" "}
                              {destCurrency +
                                " " +
                                (1 / parseFloat(exchangeRate)).toFixed(2)}
                            </H4>
                            <Caption>
                              (
                              {srcCurrency +
                                " " +
                                (100000.0 * parseFloat(exchangeRate)).toFixed(
                                  2
                                )}{" "}
                              = {destCurrency} 100,000.00)
                            </Caption>
                          </Box>
                        </>
                      }
                    />
                  </Box>
                ) : null}
              </>
            }
          /> */}
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
            disabled={!destinationAmount}
            onClick={()=>{
              transfer = { ...transfer, amount: { total: currenciesAreDifferent ? sourceAmount:destinationAmount, type: srcCurrency} };
              dispatch(Actions.setTransferObject(transfer));
              onNextStep()
            
            }}
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
