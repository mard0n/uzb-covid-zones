import React, { useState, useEffect } from "react";
import {
  Box,
  CircleIcon,
  UnderlineText,
  H2,
  H4,
  Body2,
  Grid,
  SectionSplitter,
  Button,
} from "@mashreq-digital/ui";
import { CashPinMap } from "@mashreq-digital/webassets";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../../../kyc/store/hooks/useFetch";
import { FormFields } from "../formData";
import * as Endpoint from "../../../../../network/Endpoints";
import * as RoutePath from "../../../../../router/config";
import { UPDATE_BENEFICIARY_DETAILS } from "./store/types";
import { DispatchContext, StateContext } from "./store/context";
import InputWrapper from "../../../../../common/inputWrapper";
import JourneySidebar from "../../../../../components/JourneySidebar";

const BeneficiaryDetails = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const steps = "beneficiary.moneyTransfer.manage.local.steps";
  const { localAccount } = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);
  const { bankDetails } = localAccount;
  const { accountNumber, bankName } = bankDetails;
  const [disabled, setDisabled] = useState(true);
  const [fields, setFields] = useState({});
  const [formData, setFormData] = useState<any>({});
  const { accountname, nickname } = formData;
  const { execute, response, loading } = useFetch(
    Endpoint.BILL_PAYMENT_ADD_EDIT_BENEFICIARY_ENDPOINT,
    {
      method: "POST",
      data: {
        accountNumber: accountNumber,
        fullName: accountname,
        id: "",
        nickname: nickname,
        serviceTypeCode: "local",
      },
    }
  );

  useEffect(() => {
    const initFieldProps = () => {
      const beneificiaryField: any = FormFields.beneficiaryDetails.fields;
      for (const field in beneificiaryField) {
        beneificiaryField[field]["config"]["value"] = "";
        beneificiaryField[field]["config"]["error"] = false;
        beneificiaryField[field]["config"]["errorText"] = "";
      }
      return beneificiaryField;
    };
    setFields(initFieldProps());
  }, []);

  useEffect(() => {
    if (!loading && response) {
      if (response.data) {
        dispatch({ type: UPDATE_BENEFICIARY_DETAILS, payload: response.data });
        history.replace({
          pathname:
            RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL_AUTHENTICATION,
        });
      }
      if(response.errorId) {
        const beneificiaryField: any = fields, errorId = response.errorId, errorStr = t(`common.dbErrors.${errorId}`);
        beneificiaryField["nickname"]["config"]["error"] = true;
        beneificiaryField["nickname"]["config"]["errorText"] = errorStr;
        console.log(response.errorId, beneificiaryField)
        setFields({...beneificiaryField});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, loading]);

  const onChangeOfEditFiled = (data: any, formChanges: any) => {
    setFormData(formChanges);
    setDisabled(!formChanges.valid);
  };

  if (accountNumber) {
    return (
      <JourneySidebar steps={steps} currentStep={2}>
        <SectionSplitter
          top={
            <Box>
              <Box mb={10} display="flex" alignItems="center">
                <CircleIcon icon={CashPinMap} />
                <Box ml={2.1}>
                  <Body2>{bankName}</Body2>
                </Box>
              </Box>
              <Box mb={10}>
                <UnderlineText>
                  <H2 noWrap>
                    {t(
                      "beneficiary.moneyTransfer.manage.local.beneficiaryDetails.title"
                    )}
                  </H2>
                </UnderlineText>
              </Box>
              <Box mb={2}>
                <H4>
                  {t(
                    "beneficiary.moneyTransfer.manage.local.accountDetails.fieldTitle"
                  )}
                </H4>
              </Box>
              <Grid container>
                <Grid item xs={12} sm={5}>
                  <InputWrapper
                    initialState={fields}
                    onChangeFields={onChangeOfEditFiled}
                  />
                </Grid>
              </Grid>
            </Box>
          }
          bottom={
            <Box display="flex" justifyContent="flex-end">
              {/* <BackButton
            label={t("common.action.back")}
            onClick={onClickBack}
          /> */}
              <Button
                variant="contained"
                color="primary"
                disabled={disabled}
                onClick={execute}
                size="large"
              >
                {t("common.action.submit")}
              </Button>
            </Box>
          }
        />
      </JourneySidebar>
    );
  }
  return false;
};

export default BeneficiaryDetails;
