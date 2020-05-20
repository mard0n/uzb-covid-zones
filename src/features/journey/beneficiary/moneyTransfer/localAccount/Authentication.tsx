import React, { useEffect } from "react";
import { Box, Body2, CircleIcon } from "@mashreq-digital/ui";
import AuthOtp from "../../../../../components/authOtp";
import { CashPinMap } from "@mashreq-digital/webassets";
import { useHistory } from "react-router-dom";
import { UPDATE_BENEFICIARY_DETAILS } from "./store/types";
import { DispatchContext, StateContext } from "./store/context";
import { useFetch } from "../../../../kyc/store/hooks/useFetch";
import * as Endpoints from "../../../../../network/Endpoints";
import * as RoutePath from "../../../../../router/config";
import JourneySidebar from "../../../../../components/JourneySidebar";

const Authentication = () => {
  const history = useHistory();
  const steps = "beneficiary.moneyTransfer.manage.local.steps";
  const { localAccount } = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const { beneficiaryDetails } = localAccount;
  const {
    id,
    accountNumber,
    bankName,
    fullName,
    nickname,
  } = beneficiaryDetails;
  const url = Endpoints.ACTIVATE_BENEFICIARY_BY_ID_ENDPOINT.replace(
    "beneficiaryId",
    id ? id : ''
  );
  const { execute, response, loading } = useFetch(url, {
    method: "POST",
    data: {
      accountNumber: accountNumber,
      fullName: fullName,
      id: "",
      nickname: nickname,
      serviceTypeCode: "local",
    },
  });

  useEffect(() => {
    if (!loading && response) {
      if (response.data) {
        dispatch({ type: UPDATE_BENEFICIARY_DETAILS, payload: response.data });
        history.replace({
          pathname:
            RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL_CONFIRMATION,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, loading]);

  if (accountNumber) {
    return (
      <JourneySidebar steps={steps} currentStep={3}>
        <Box>
          <Box display="flex" alignItems="center">
            <CircleIcon icon={CashPinMap} />
            <Box ml={2.1}>
              <Body2>{bankName}</Body2>
            </Box>
          </Box>
          <AuthOtp
            enableBack={false}
            enableCard={false}
            onSuccess={() => execute()}
          />
        </Box>
      </JourneySidebar>
    );
  }
  return false;
};

export default Authentication;
