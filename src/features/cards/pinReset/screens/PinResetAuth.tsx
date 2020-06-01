import React, { useContext, useState, useEffect } from "react";
import JourneySidebar from "../../../../components/JourneySidebar";
import {
  SectionSplitter,
  Box,
  UnderlineText,
  H1,
  Body1,
  MobileIconText,
  InfoCard,
  Caption,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Banner,
  Button,
  BackButton,
  Grid,
  makeStyles,
  SuccessFailureIcon,
  H2,
  H5,
} from "@mashreq-digital/ui";
import {
  SuccessTick,
  WarningCircle,
  Warning,
  CheckCircle,
} from "@mashreq-digital/webassets";
import { StateContext } from "../../store/context";
import { useFetch } from "../../../kyc/store/hooks/useFetch";
import * as Endpoint from "../../../../network/Endpoints";
import OtpInput from "../components/OtpInput";
import Loader from "../../../../common/loader";
import { useHistory } from "react-router-dom";
import { PIN_RESET_SUCCESS } from "../../routes/config";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "8px",
  },
  listItemIcon: {
    minWidth: "32px",
  },
}));

export interface PinResetAuthProps {}

const PinResetAuth: React.SFC<PinResetAuthProps> = () => {
  const { maskedMobileNumber } = useContext(StateContext).pinReset;
  const history = useHistory();
  const { t } = useTranslation();
  const tips: string[] = t("cards.pinReset.auth.infoCard.list", {
    returnObjects: true,
  });
  const classes = useStyles();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const {
    execute: validateOtp,
    response: validateOtpRes,
    loading: validateOtpLoading,
  } = useFetch(Endpoint.CARDS_PIN_RESET_AUTH_VALIDATE, {
    method: "POST",
    data: {
      cardNumber: "123",
    },
  });
  useEffect(() => {
    if (!validateOtpLoading && validateOtpRes) {
      // TODO: need to find a way to handle server errors to show error page
      console.log("validateOtpRes", validateOtpRes);
      if (validateOtpRes.errorCode) {
        setError(t("cards.otp.validateOtpError"));
      } else {
        setError("");
        history.replace({
          pathname: PIN_RESET_SUCCESS,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateOtpRes, validateOtpLoading]);
  const handleSubmit = () => {
    validateOtp();
    setOtp("");
  };
  return (
    <JourneySidebar steps={"cards.pinReset.steps"} currentStep={1}>
      <SectionSplitter
        top={
          <Box display="flex" justifyContent="space-between">
            <Grid item md={4}>
              <Box mb={5}>
                <UnderlineText>
                  <H2>{t("cards.pinReset.auth.title")}</H2>
                </UnderlineText>
              </Box>
              <Box mb={5}>
                <Body1>{t("cards.pinReset.auth.subTitle")}</Body1>
              </Box>

              <Box display="flex" flexDirection="column">
                <Box mb={4}>
                  <MobileIconText lastNumber={maskedMobileNumber} />
                </Box>
                <OtpInput
                  otp={otp}
                  handleOtpChange={(otp) => setOtp(otp)}
                  validateError={error}
                />
              </Box>
            </Grid>
            <Box style={{ maxWidth: "300px" }}>
              <InfoCard
                fullWidth
                content={
                  <>
                    <SuccessFailureIcon type="warning" />
                    <H5 gutterBottom>
                      {t("cards.pinReset.auth.infoCard.title")}
                    </H5>
                    <Caption gutterBottom>
                      {t("cards.pinReset.auth.infoCard.content")}
                    </Caption>
                    <List
                      className={classes.root}
                      dense={true}
                      disablePadding={true}
                    >
                      {tips.map((tip: string) => (
                        <ListItem
                          key={tip}
                          disableGutters={true}
                          alignItems="flex-start"
                        >
                          <ListItemIcon className={classes.listItemIcon}>
                            <CheckCircle />
                          </ListItemIcon>
                          <ListItemText primary={<Caption>{tip}</Caption>} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                }
                color={"primary"}
              ></InfoCard>
            </Box>
          </Box>
        }
        bottom={
          <Box display="flex" justifyContent="space-between">
            <BackButton
              label={t("cards.pinReset.auth.backBtnText")}
              onClick={() => {
                console.log("history clicked");
                history.goBack();
              }}
            />

            <Button
              variant="contained"
              size="large"
              color="primary"
              disabled={otp?.replace(/\s/g, "").length !== 6}
              onClick={handleSubmit}
            >
              {t("cards.pinReset.auth.mainBtnText")}
            </Button>
          </Box>
        }
      />
      {validateOtpLoading && <Loader enable={true} />}
    </JourneySidebar>
  );
};

export default PinResetAuth;
