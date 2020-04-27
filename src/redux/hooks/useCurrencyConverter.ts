import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from '../actions/currencyConverterActions';

const useCurrencyConverter = () => {
  const dispatch = useDispatch();
  const currencyConverterLoading = useSelector(
    (state: any) =>
      state.moneyTransfer.currencyConverter.loading || false,
  );
  const currencyConverterResponse = useSelector(
    (state: any) =>
      state.moneyTransfer.currencyConverter.response,
  );
  const currencyConverterError = useSelector(
    (state: any) => state.moneyTransfer.currencyConverter.error,
  );

  const fetchDebounceCurrencyRate = (data: any) => {
    dispatch(Actions.debounceCurrencyRateRequest({data}));
  };

  const fetchCurrencyRate = (data: any) => {
    dispatch(Actions.fetchCurrencyRateRequest({data}));
  };

  const clearCurrencyRateState = () => {
    dispatch(Actions.clearCurrencyRateState());
  };

  return {
    currencyConverterLoading,
    currencyConverterResponse,
    currencyConverterError,
    fetchDebounceCurrencyRate,
    fetchCurrencyRate,
    clearCurrencyRateState,
  };
};

export default useCurrencyConverter;
