import React, { useState, useEffect, useContext } from "react";
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
import useCurrencyConverter from "../../../../redux/hooks/useCurrencyConverter";
import { withinMashreq } from "../../../../util/constants";
import { isValidFloatNumber } from "../../../../util/validations/ValidationUtils";
import { useHistory } from "react-router-dom";
import {
  MONEY_TRANSFER_JOURNEY_INTERNATIONAL_PURPOSE,
  MONEY_TRANSFER_JOURNEY_INTERNATIONAL_START
} from "../../../../router/config";
import ImageWithText from "../../../../common/imageWithText/index";
import { DispatchContext, StateContext } from "../../../../redux/context";
import * as TransferActions from "../../../../redux/actions/moneyTransfer/transferAction";
import { useTranslation } from "react-i18next";
import JourneySidebar from '../../../../components/JourneySidebar/index';

const SetTransferAmount = (props: any) => {
  const transferDispatch = useContext(DispatchContext);
  const transferState = useContext(StateContext);
  let { transfer,serviceType } = transferState;
  const { t } = useTranslation();
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
  let destCurrency =  transfer.toAccount.beneficiaryCurrency;

  const currenciesAreDifferent = srcCurrency !== destCurrency;

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
    transfer = {
      ...transfer,
      amount: {
        total: currenciesAreDifferent ? sourceAmount : destinationAmount,
        type: srcCurrency,
      },
    };
    transferDispatch(TransferActions.setTransferObject(transfer));

    history.replace({
      pathname: MONEY_TRANSFER_JOURNEY_INTERNATIONAL_PURPOSE,
      state: { serviceType: serviceType },
    });

  };

  const onHandleBack = () => {
    history.replace({
      pathname: MONEY_TRANSFER_JOURNEY_INTERNATIONAL_START,
      state: { serviceType: serviceType },
    });

  };

  useEffect(() => {
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
        transactionCurrency: destCurrency, //TransferType.international == transferTypeCode ? 'AED' :
      };
      fetchCurrencyRate(data);
    }
    /* Patch - Don't remove the below comment otherwiser useeffect will expect a dependency. 
    We should add onChangeList as dependency then source api will get triggered infinitely */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeOfReciveAmount = (event: any) => {
    let value = event.target.value;
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

  return (
    <JourneySidebar steps={"moneytransfer.stepsPurpose"} currentStep={1}>
    <SectionSplitter
      height={"calc(100vh - 400px)"}
      top={
        <>
          <Box mb={6}>
            <ImageWithText
              description={serviceType.name}
              name={serviceType.code}
              iconType={true}
              logo={true}
              avtHight="40px"
              avtWidth="40px"
            />
          </Box>

          <UnderlineText color="primary">
            <H2>{t("moneytransfer.setTransferAmount.title")}</H2>
          </UnderlineText>
          {currencyConverterLoading ? (
            <Box display="flex" mt={12} alignItems="baseline">
              <CircularProgress />
            </Box>
          ) : (
            <Grid container>
              <Grid item xs={6}>
                {
                  <>
                    <Box mt={10}>
                      <H5>
                        {t("moneytransfer.setTransferAmount.recievingAmount")}
                      </H5>
                      <TextField
                        fullWidth
                        label={t("moneytransfer.setTransferAmount.amountLabel")}
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
                          "aria-label": t(
                            "moneytransfer.setTransferAmount.amountLabelAria"
                          ),
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
                        <H5>
                          {t("moneytransfer.setTransferAmount.debitedTitle")}
                        </H5>
                        <TextField
                          fullWidth
                          label={t(
                            "moneytransfer.setTransferAmount.debitedLabel"
                          )}
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
                            "aria-label": t(
                              "moneytransfer.setTransferAmount.debitedLabelAria"
                            ),
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
                          {t(
                            "moneytransfer.setTransferAmount.atAnExchangeRate"
                          )}{" "}
                          <b>{exchangeRate}</b>
                        </Caption>
                      </Box>
                    ) : null}
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
                              {t("moneytransfer.setTransferAmount.calcValues")}
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
          )}
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
            Next
          </Button>
        </Box>
      }
    />
    </JourneySidebar>
  );
};
export default SetTransferAmount;