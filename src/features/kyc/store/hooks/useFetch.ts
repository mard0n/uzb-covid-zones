import React from "react";
import axios from "axios";
import { DispatchContext } from "../context";
import { ERROR, RESET_ERROR } from "../../types";
import { createInstance } from "@mashreq-digital/network";
import * as Config from '../../../../network/constants';

const CancelToken = axios.CancelToken;
// let cancel: any;
let pending: any = {};

export const API = createInstance({ baseURL: Config.BASE_URL,  timeout: 20000 });

const delay = async () => new Promise(resolve => setTimeout(resolve,Math.floor((Math.random() * 3000) + 1)))  

export const useFetch = (url: string, options: object = {}) => {
  const [response, setResponse] = React.useState<any>(null);
  const [error, setError] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const dispatch = React.useContext(DispatchContext);
  const lastReqRef: any = React.useRef();

  const execute = async () => {
    try {
      setLoading(true);
      dispatch({ type: RESET_ERROR });
      if (pending[url] && lastReqRef.current) {
        lastReqRef.current();
        delete pending[url];
      }
      const wait = await delay();
      const res = await API(url, {
        ...options,
        cancelToken: new CancelToken(async (c) => {
          // cancel = c;
          lastReqRef.current = c;
          pending[url] = true;
        }),
      });

      setLoading(false);
      // TODO: check if res.data is the correct object thtz send and if not handle accordingly
      const data = await res.data;
      setResponse(data);
    } catch (error) {
      setLoading(false);

      // TODO: commenting  iscancel to align with new network changes ==> need updates in package
      // if (API.isCancel(error)) {
        // console.log("request was cancelled", pending);
        // TODO: If needed we can handle the cancelled request for any use
      // }
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError("Bad request");
            dispatch({ type: ERROR, error: error.message, errorCode: 400 });
            break;
          case 500:
            dispatch({ type: ERROR, error: error.message, errorCode: 500 });
            break;
          default:
            dispatch({ type: ERROR, error: error.message, errorCode: 500 });
        }
      } else {
        dispatch({ type: ERROR, error: error.message, errorCode: 500 });
      }
    }
  };
  return { execute, response, error, loading };
};
