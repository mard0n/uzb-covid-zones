import React, { useContext, useState, useEffect } from "react";
import JourneySidebar from "../../../../components/JourneySidebar";
import {
  SectionSplitter,
  Box,
  UnderlineText,
  Body1,
  MobileIconText,
  InfoCard,
  Caption,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  BackButton,
  Grid,
  makeStyles,
  SuccessFailureIcon,
  H2,
  H5,
} from "@mashreq-digital/ui";
import {
  CheckCircle,
} from "@mashreq-digital/webassets";
import { StateContext } from "../../store/context";
import { useFetch } from "../../../kyc/store/hooks/useFetch";
import * as Endpoint from "../../../../network/Endpoints";
import OtpInput from "../components/OtpInput";
import Loader from "../../../../common/loader";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "8px",
  },
  listItemIcon: {
    minWidth: "32px",
  },
}));

export interface AuthProps {
  immediateApiCall: {
    endpoint: any;
    data: any;
    routeOnSuccess: any;
    routeOnFail: any;
  };
  steps: string;
  currentStep: number;
}

const Auth: React.SFC<AuthProps> = (props) => {
  const {
    immediateApiCall: { endpoint, data, routeOnSuccess, routeOnFail },
    steps,
    currentStep,
  } = props;
  const { maskedMobileNumber } = useContext(StateContext);
  // const maskedMobileNumber = 971521231234
  const history = useHistory();
  const { t } = useTranslation();
  const tips: string[] = t("cards.auth.infoCard.list", {
    returnObjects: true,
  });
  const classes = useStyles();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const {
    execute: validateOtp,
    response: validateOtpRes,
    loading: validateOtpLoading,
  } = useFetch(endpoint, {
    method: "POST",
    data: {
      cardNumber: "123",
    },
  });
  const {
    execute: immediateApiCall,
    response: immediateApiCallRes,
    loading: immediateApiCallLoading,
  } = useFetch(Endpoint.CARDS_PIN_RESET, {
    method: "POST",
    data,
  });
  useEffect(() => {
    if (!validateOtpLoading && validateOtpRes) {
      // TODO: need to find a way to handle server errors to show error page
      console.log("validateOtpRes", validateOtpRes);
      if (validateOtpRes.status === 'error') {
        setError(t("cards.otp.validateOtpError"));
      } else {
        setError("");
        immediateApiCall();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateOtpRes, validateOtpLoading]);
  useEffect(() => {
    if (!immediateApiCallLoading && immediateApiCallRes) {
      // TODO: need to find a way to handle server errors to show error page
      console.log("immediateApiCallRes", immediateApiCallRes);
      if (immediateApiCallRes.status === "error") {
        history.replace({
          pathname: routeOnFail,
        });
      } else {
        history.replace({
          pathname: routeOnSuccess,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediateApiCallRes, immediateApiCallLoading]);
  const handleSubmit = () => {
    validateOtp();
    setOtp("");
  };
  return (
    <JourneySidebar steps={steps} currentStep={currentStep}>
      <SectionSplitter
        top={
          <Box display="flex" justifyContent="space-between">
            <Grid item md={4}>
              <Box mb={5}>
                <UnderlineText>
                  <H2>{t("cards.auth.title")}</H2>
                </UnderlineText>
              </Box>
              <Box mb={5}>
                <Body1>{t("cards.auth.subTitle")}</Body1>
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
                    <H5 gutterBottom>{t("cards.auth.infoCard.title")}</H5>
                    <Caption gutterBottom>
                      {t("cards.auth.infoCard.content")}
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
              label={t("cards.auth.backBtnText")}
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
              {t("cards.auth.mainBtnText")}
            </Button>
          </Box>
        }
      />
      {(validateOtpLoading || immediateApiCallLoading) && (
        <Loader enable={true} />
      )}
    </JourneySidebar>
  );
};

export default Auth;
