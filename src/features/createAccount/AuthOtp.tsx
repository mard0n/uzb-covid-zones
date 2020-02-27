import React, { useState } from "react";
import {
  H1,
  Button,
  CircularProgressAnimation,
  Caption,
  Box,
  OTP,
  Grid,
  SectionSplitter,
  MobileIconText,
  SubMain,
  InfoCard,
  ResendOTP,
  Toast,
  AlertTitle,
  Snackbar
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import Locked from "./Locked";
import { Rocket } from "@mashreq-digital/webassets";

interface State {
  number: string;
}

const LeftContent = (props: any) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [otpCount, setOtpCount] = useState(0);
  const [onCompleteResendTimer, setOnCompleteResendTimer] = useState(false);
  const [enableResend, setEnableResend] = useState(false);
  const [open, setOpenError] = React.useState(false);

  const onChange = (val: any) => {
    setOtp(val);
    const trimValue = val;
    setTimeout(() => {
      if (trimValue && trimValue.length === 6) {
        if (val === "555555") {
          props.handleNextStep();
        }
        let isError = val && val === "111111";
        isError ? setOtpCount(otpCount + 1) : setOtpCount(otpCount);
        if (otpCount === 2) {
          props.onLock(false);
        }
        setError(isError);
        setEnableResend(isError);
        setOtp("");
        setOpenError(true);
      }
    }, 100);
  };

  const onResendClick = () => {
    setError(false);
    setOnCompleteResendTimer(true);
  };

  const onTimerComplete = () => {
    setOnCompleteResendTimer(false);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const renderButton = (renderButtonProps: any) => {
    const { ...rest } = renderButtonProps;
    return (
      <Box mt={3}>
        <Button {...rest}>
          {t("account.authentication.resendOtp.action")}
        </Button>
      </Box>
    );
  };

  const renderTime = (remainingTime: any) => {
    return (
      <Box mt={2}>
        <CircularProgressAnimation color="primary"></CircularProgressAnimation>
        {t("account.authentication.resendOtp.desc")}{" "}
        <Caption color="primary">
          {remainingTime} {t("account.authentication.resendOtp.sec")}{" "}
        </Caption>
      </Box>
    );
  };

  return (
    <SectionSplitter
      borderTop={false}
      top={
        <Box>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            onClose={handleErrorClose}
            autoHideDuration={5000}
          >
            <Toast severity="error">
              <AlertTitle>
                {t("account.authentication.errors.title")}
              </AlertTitle>
              <Box>
                {t("account.authentication.errors.desc")}{" "}
                <b>
                  {3 - otpCount}{" "}
                  {t("account.authentication.errors.attemptsLeft")}
                </b>{" "}
              </Box>
            </Toast>
          </Snackbar>

          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Box pt={10}>
              <H1>{t("account.authentication.title")}</H1>
              <Box pt={3}>
                <Caption>{t("account.authentication.desc")}</Caption>
              </Box>
              <Box pt={3}>
                <MobileIconText />
              </Box>

              <Box mt={4.5}>
                <OTP
                  inputClassName={error ? "error" : ""}
                  autoFocus
                  disabled={onCompleteResendTimer}
                  value={otp}
                  otpType="number"
                  onChange={onChange}
                />
                {enableResend && (
                  <ResendOTP
                    renderButton={renderButton}
                    renderTime={renderTime}
                    onResendClick={onResendClick}
                    maxTime={5}
                    onTimerComplete={onTimerComplete}
                    style={{}}
                    className=""
                  />
                )}
              </Box>
            </Box>
          </Grid>
        </Box>
      }
      bottom={<Box></Box>}
    />
  );
};

const AuthOtp = (props: any) => {
  const [locked, setLocked] = useState(true);

  return locked ? (
    <SubMain
      content={
        <LeftContent {...props} onLock={(lock: any) => setLocked(lock)} />
      }
      image={
        <Box mt={18}>
          <InfoCard
            icon={Rocket}
            title="We are upgrading"
            content="As a part of Masheq 2.0, we are creating a better experience for our customers"
          />
        </Box>
      }
    />
  ) : (
    <Locked {...props} />
  );
};

export default AuthOtp;
