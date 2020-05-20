import React, { useEffect } from "react";
import {
  Box,
  CircleIcon,
  UnderlineText,
  H2,
  Caption,
  Body2,
  Grid,
  InfoCard,
  makeStyles,
  Theme,
  SectionSplitter,
  Button,
  BackButton,
} from "@mashreq-digital/ui";
import { CashPinMap, QuestionCircle } from "@mashreq-digital/webassets";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import * as RoutePath from "../../../../../router/config";
import { StateContext } from "./store/context";
import JourneySidebar from "../../../../../components/JourneySidebar";

const useStyles = makeStyles((theme: Theme) => ({
  adornmentStyle: {
    color: "#738794",
  },
  infoTitleStyle: {
    fontWeight: "bold",
  },
  detailsStyle: {
    display: "flex",
    "& > div": {
      padding: `0 ${theme.spacing(4)}px`,
      "&:first-child": {
        paddingLeft: 0,
      },
      "&:last-child": {
        paddingRight: 0,
      },
      "& .MuiTypography-caption": {
        color: "#738794",
      },
    },
  },
}));

const BankDetails = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { localAccount } = React.useContext(StateContext);
  const { bankDetails } = localAccount;
  const { bankName, accountNumber, swiftCode } = bankDetails;
  const steps = "beneficiary.moneyTransfer.manage.local.steps";
  const { detailsStyle, infoTitleStyle } = useStyles();

  const onClickButton = () => {
    history.replace({
      pathname:
        RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL_BENEFICIARYDETAILS,
    });
  };

  const onClickBack = () => {
    history.replace({
      pathname:
        RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL_ACCOUNTDETAILS,
    });
  };

  if (accountNumber) {
    return (
      <JourneySidebar steps={steps} currentStep={1}>
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
                      "beneficiary.moneyTransfer.manage.local.bankDetails.title"
                    )}
                  </H2>
                </UnderlineText>
              </Box>
              <Grid container>
                <Grid item xs={12} sm={5}>
                  <Box mb={4.3} className={detailsStyle}>
                    <Box>
                      <Caption>
                        {t(
                          "beneficiary.moneyTransfer.manage.local.bankDetails.iban"
                        )}
                      </Caption>
                      <Body2>{accountNumber}</Body2>
                    </Box>
                    <Box>
                      <Caption>
                        {t(
                          "beneficiary.moneyTransfer.manage.local.bankDetails.swiftcode"
                        )}
                      </Caption>
                      <Body2>{swiftCode}</Body2>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs="auto" sm={3} />
                <Grid item xs={12} sm={3}>
                  <InfoCard
                    icon={QuestionCircle}
                    minHeight={false}
                    fullWidth
                    content={
                      <>
                        <Body2 className={infoTitleStyle}>
                          {t(
                            "beneficiary.moneyTransfer.manage.local.bankDetails.info.title"
                          )}
                        </Body2>
                        <Caption>
                          {t(
                            "beneficiary.moneyTransfer.manage.local.bankDetails.info.desc"
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
            <Box display="flex" justifyContent="space-between">
              <BackButton
                label={t("common.action.back")}
                onClick={onClickBack}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={onClickButton}
                size="large"
              >
                {t(
                  "beneficiary.moneyTransfer.manage.local.bankDetails.buttonLabel"
                )}
              </Button>
            </Box>
          }
        />
      </JourneySidebar>
    );
  }
  return false;
};

export default BankDetails;
