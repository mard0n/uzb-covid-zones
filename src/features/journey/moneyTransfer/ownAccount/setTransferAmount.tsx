import React, { useState, useEffect } from "react";
import {
  UnderlineText,
  H2,
  SectionSplitter,
  Button,
  Box,
  Grid,
  H5,
  Caption,
  InfoCard,
  H4,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mashreq-digital/ui";
import BackButton from "../../../../common/backButton";
import { Rocket } from "@mashreq-digital/webassets";
import SuggestionBox from "../../../../common/suggetionBox/index";
import { useSelector, useDispatch } from "react-redux";
import useCurrencyConverter from "../../../../redux/hooks/useCurrencyConverter";
import * as Actions from "../../../../redux/actions/moneyTransfer/payListActions";
import { isValidFloatNumber } from "../../../../util/validations/ValidationUtils";
import { useHistory } from 'react-router-dom';
import {  MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_REVIEW, MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_START } from '../../../../router/config';


const SetTransferAmount = (props: any) => {

  const {  serviceType ,setStep} = props;

  const dispatch = useDispatch();
  let transfer = useSelector(
    (state: any) => state.moneyTransfer.other.transfer
  );
  const [exchangeRate, setExchangeRate] = useState("");
  const [enableButton, setEnableButton] = useState(true);
  const [maxAmounts, setMaxAmounts]: any = useState({});
  const [sourceAmount, setsourceAmount]: any = useState("");
  const [destinationAmount, setDestinationAmount]: any = useState("");
  const [fromTouched, setFromTouched] = useState(false);
  const [toTouched, setToTouched] = useState(false);
  let srcAmount = transfer.fromAccount.availableBalance;
  let dstAmount = transfer.toAccount.availableBalance;
  let srcCurrency = transfer.fromAccount.currency;
  let destCurrency = transfer.toAccount.currency;

  const currenciesAreDifferent = srcCurrency !== destCurrency;
  console.log("SetTransferAmount -> serviceType yeye inside ", serviceType);

  const history = useHistory();

  const {
    currencyConverterLoading,
    currencyConverterResponse,
    currencyConverterError,
    fetchDebounceCurrencyRate,
    fetchCurrencyRate,
    clearCurrencyRateState,
  } = useCurrencyConverter();

  const onNextStep = () => {
    console.log("onNextStep -> onNextStepc pyr");
    transfer = {
      ...transfer,
      amount: {
        total: currenciesAreDifferent
          ? sourceAmount
          : destinationAmount,
        type: srcCurrency,
      },
    };
    dispatch(Actions.setTransferObject(transfer));

    history.replace({
      pathname: MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_REVIEW,
      state: {serviceType:serviceType}
    });
    setStep(2);

  };

  const onHandleBack = () => {
    history.replace({
      pathname: MONEY_TRANSFER_JOURNEY_OWN_ACOUNT_START,
      state: {serviceType:serviceType}
    });
    setStep(0);
  };


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
    /* Patch - Don't remove the below comment otherwiser useeffect will expect a dependency. 
    We should add onChangeList as dependency then source api will get triggered infinitely */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyConverterResponse]);

  useEffect(() => {
    setMaxAmounts({ ...maxAmounts, from: srcAmount });
    if (currenciesAreDifferent) {
      const data: any = {
        accountNumber: transfer.fromAccount.accountNumber,
        accountCurrency: srcCurrency,
        accountCurrencyAmount: transfer.fromAccount.availableBalance,
        transactionCurrency: destCurrency, //TransferType.LOCAL == transferTypeCode ? 'AED' :
      };
      fetchCurrencyRate(data);
    }
    /* Patch - Don't remove the below comment otherwiser useeffect will expect a dependency. 
    We should add onChangeList as dependency then source api will get triggered infinitely */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeOfReciveAmount = (event: any) => {
    let value = event.target.value;
    console.log("onChangeOfReciveAmount -> value", value);
    console.log("!isNaN(value) ", !isNaN(value));
    console.log("onChangeOfReciveAmount -> !isNaN(value)", !isNaN(value));
    if (value === "" || isValidFloatNumber(value)) {
      setsourceAmount(value);
      setDestinationAmount((value / parseFloat(exchangeRate)).toFixed(2));

      if (value <= srcAmount && value > 0) {
        setEnableButton(false);
      } else {
        setEnableButton(true);
      }
    }
  };
  const onChangeOfTransferAmount = (event: any) => {
    let value = event.target.value;
    if (value === "" || isValidFloatNumber(value)) {
      setDestinationAmount(value);
      setsourceAmount((value * parseFloat(exchangeRate)).toFixed(2));

      if (
        value > 0 &&
        value <=
          (currenciesAreDifferent ? Math.floor(maxAmounts["to"]) : srcAmount)
      ) {
        setEnableButton(false);
      } else {
        setEnableButton(true);
      }
    }
  };

  console.log("SetTransferAmount -> serviceType", serviceType.maxAmount);
  return (
    <SectionSplitter
      height={"calc(100vh - 400px)"}
      top={
          <>
          <UnderlineText color="primary">
            <H2>What amount would you like to transfer?</H2>
          </UnderlineText>
          {currencyConverterLoading ? (
            <Box display="flex" mt={12} alignItems="baseline">
              <CircularProgress />
            </Box>
          ) : 
            <Grid container>
              <Grid item xs={6}>
                {
                  <>
                    <Box mt={10}>
                      <H5>The Receiving account will get</H5>
                      <TextField
                        fullWidth
                        label="Receiving Amount"
                        id="transferAmount"
                        variant="filled"
                        error={
                          destinationAmount >
                          (currenciesAreDifferent
                            ? Math.floor(maxAmounts["to"])
                            : srcAmount)
                        }
                        onFocus={() => {
                          setFromTouched(false);
                          setToTouched(true);
                        }}
                        value={destinationAmount || ""}
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
                        <Box pt={3}>
                          <SuggestionBox
                            activeStep={destinationAmount}
                            currency={destCurrency}
                            maxPrice={
                              currenciesAreDifferent
                                ? maxAmounts["to"]
                                : srcAmount
                            }
                          />
                        </Box>
                      )}
                    </Box>

                    {currenciesAreDifferent ? (
                      <Box mt={10}>
                        <H5>You will be debited</H5>
                        <TextField
                          fullWidth
                          label="Transfer amount"
                          value={sourceAmount || ""}
                          error={sourceAmount > Math.floor(maxAmounts["from"])}
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
                          <Box pt={3}>
                            <SuggestionBox
                              activeStep={sourceAmount}
                              currency={srcCurrency}
                              maxPrice={maxAmounts["from"]}
                            />
                          </Box>
                        )}
                        <Caption>
                          At an exchange rate of <b>{exchangeRate}</b>
                        </Caption>
                      </Box>
                    ) : null
                  }
                  </>
                }
                
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


           }
            </>
        } 
      bottom={
        <Box display="flex" justifyContent="space-between" mt={10}>
          <BackButton
            disableRoute
            onClickBack={() => {
              onHandleBack();
            }}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={enableButton}
            onClick={() => onNextStep()}
            size="large"
          >
            Review
          </Button>
        </Box>
      }
    />
  );
};
export default SetTransferAmount;

//handle enabling button if value is less than max amount
// && currenciesAreDifferent ? sourceAmount < Math.floor(maxAmounts["from"]):destinationAmount < Math.floor(maxAmounts["to"])
