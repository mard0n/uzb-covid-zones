import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Box,
  CircleIcon,
  Body2,
  UnderlineText,
  H2,
  H4,
  Grid,
  InfoCard,
  Caption,
  InputAdornment,
  TextField,
  makeStyles,
  Theme,
  FormHelperText,
  SectionSplitter,
  Button,
} from "@mashreq-digital/ui";
import { CashPinMap } from "@mashreq-digital/webassets";
import { useTranslation } from "react-i18next";
import { replaceStr } from "../../../../../util/helper";
import { RegEx } from "../../../../../util/RegEx";
import { useHistory } from "react-router-dom";
import { BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL_BANKDETAILS } from "../../../../../router/config";
import { useFetch } from "../../../../kyc/store/hooks/useFetch";
import * as Endpoint from "../../../../../network/Endpoints";
import JourneySidebar from "../../../../../components/JourneySidebar";
import { DispatchContext } from "./store/context";
import { UPDATE_BANK_DETAILS } from "./store/types";

const useStyles = makeStyles((theme: Theme) => ({
  adornmentStyle: {
    color: "#738794",
  },
  infoTitleStyle: {
    fontWeight: "bold",
  },
}));

const AccountDetails = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { adornmentStyle, infoTitleStyle } = useStyles();
  const dispatch = React.useContext(DispatchContext);
  const [iban, setIban] = useState("");
  const [error, setError] = useState("");
  const steps = "beneficiary.moneyTransfer.manage.local.steps";
  const IbanMinLength = 8,
    IbanMaxLength = 50;
  const IbanHelperText = replaceStr(
    t("beneficiary.moneyTransfer.manage.local.accountDetails.field.helperText"),
    "--length--",
    23
  );
  const { execute, response, loading } = useFetch(
    Endpoint.MONEY_TRANSFER_IBAN,
    {
      method: "POST",
      data: {
        accountNumber: `AE${iban}`,
        serviceTypeCode: "local",
      },
    }
  );

  useEffect(() => {
    if (!loading && response) {
      if (response.data && response.data.id) {
        setError(
          t(
            `beneficiary.moneyTransfer.manage.local.accountDetails.field.beneficiaryExists`
          )
        );
      } else if (response.errorId) {
        const errorString = response.errorId;
        setError(t(`common.dbErrors.${errorString}`));
      } else {
        dispatch({ type: UPDATE_BANK_DETAILS, payload: response.data });
        history.replace({
          pathname: BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL_BANKDETAILS,
        });
        setError("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, loading, dispatch]);

  const onChangeIBAN = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value,
      minMaxRegex = replaceStr(
        replaceStr(RegEx.NUMERIC_LIMIT, "min", 8),
        "max",
        50
      ),
      regex = new RegExp(RegEx.NUMERIC_ONLY),
      checkMinMaxRegex = new RegExp(minMaxRegex);
    if (targetValue === "" || regex.test(targetValue)) {
      setIban(targetValue);
      if (!checkMinMaxRegex.test(targetValue)) {
        const errorSting = replaceStr(
          replaceStr(
            t("beneficiary.manage.errors.minMaxLength"),
            "--min--",
            IbanMinLength
          ),
          "--max--",
          IbanMaxLength
        );
        setError(errorSting);
      } else {
        setError("");
      }
    }
  };

  return (
    <JourneySidebar steps={steps} currentStep={0}>
      <SectionSplitter
        top={
          <Box>
            <Box mb={10} display="flex" alignItems="center">
              <CircleIcon icon={CashPinMap} />
              <Box ml={2.1}>
                <Body2>
                  {t("beneficiary.moneyTransfer.manage.local.title")}
                </Body2>
              </Box>
            </Box>
            <Box mb={10}>
              <UnderlineText>
                <H2 noWrap>
                  {t(
                    "beneficiary.moneyTransfer.manage.local.accountDetails.title"
                  )}
                </H2>
              </UnderlineText>
            </Box>
            <Grid container>
              <Grid item xs={12} sm={5}>
                <Box mb={4.3}>
                  <H4>
                    {t(
                      "beneficiary.moneyTransfer.manage.local.accountDetails.fieldTitle"
                    )}
                  </H4>
                </Box>

                <TextField
                  id="username"
                  autoFocus={true}
                  fullWidth
                  error={error ? true : false}
                  helperText={error}
                  value={iban}
                  label={t(
                    "beneficiary.moneyTransfer.manage.local.accountDetails.field.label"
                  )}
                  onChange={onChangeIBAN}
                  aria-describedby={t(
                    "beneficiary.moneyTransfer.manage.local.accountDetails.field.label"
                  )}
                  inputProps={{
                    "aria-label": t(
                      "beneficiary.moneyTransfer.manage.local.accountDetails.field.label"
                    ),
                    autoComplete: "off",
                    maxLength: IbanMaxLength,
                    minLength: IbanMinLength,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Body2 className={adornmentStyle}>
                          {t(
                            "beneficiary.moneyTransfer.manage.local.accountDetails.field.adornment"
                          )}
                        </Body2>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText>{IbanHelperText}</FormHelperText>
              </Grid>
              <Grid item xs="auto" sm={3} />
              <Grid item xs={12} sm={3}>
                <InfoCard
                  icon={CashPinMap}
                  minHeight={false}
                  fullWidth
                  content={
                    <>
                      <Body2 className={infoTitleStyle}>
                        {t(
                          "beneficiary.moneyTransfer.manage.local.accountDetails.info.title"
                        )}
                      </Body2>
                      <Caption>
                        {t(
                          "beneficiary.moneyTransfer.manage.local.accountDetails.info.desc"
                        )}
                      </Caption>
                    </>
                  }
                />
              </Grid>
            </Grid>
          </Box>
        }
        bottom={
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              disabled={!!error || !iban}
              onClick={execute}
              size="large"
            >
              {t(
                "beneficiary.moneyTransfer.manage.local.accountDetails.buttonLabel"
              )}
            </Button>
          </Box>
        }
      />
    </JourneySidebar>
  );
};

export default AccountDetails;
