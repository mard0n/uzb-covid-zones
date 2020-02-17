import React, { useState } from "react";
import {
  H1,
  Button,
  makeStyles,
  Caption,
  Box,
  OTP,
  Grid,
  SectionSplitter,
  MobileIconText,
  SubMain,
  ResendOTP
} from "@mashreq-digital/ui";

interface State {
  number: string;
}

const useStyles = makeStyles(theme => ({
  proceedButton: {
    width: theme.spacing(20.8)
  }
}));
const LeftContent = (props: any) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [onCompleteResendTimer, setOnCompleteResendTimer] = useState(false);
  const [enableResend, setEnableResend] = useState(false);

  const onChange = (val: any) => {
    setOtp(val);
    console.log(val.length);
    const trimValue = val;
    setTimeout(() => {
      if (trimValue && trimValue.length === 6) {
        let isError = val && val === "111111";
        setError(isError);
        setEnableResend(isError);
        setOtp("");
        if (!isError) {
          props.onFinish();
        }
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

  const renderButton = (renderButtonProps: any) => {
    const { ...rest } = renderButtonProps;
    return (
      <Box mt={1.8}>
        <Button {...rest} mt={1.8} color="primary" variant="contained">
          Resend
        </Button>
      </Box>
    );
  };

  const { proceedButton } = useStyles();

  const [values, setValues] = React.useState<State>({
    number: ""
  });

  const renderTime = (remainingTime: any) => {
    return <Caption>Resend OTP {remainingTime} sec </Caption>;
  };

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <SectionSplitter
      top={
        <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
          <Box pt={20}>
            <H1>Authentification</H1>
            <Box pt={3}>
              <Caption>
                Please enter the 6 digit code sent to your mobile number <br />
              </Caption>

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
              {error && <Caption>Please enter the valid OTP</Caption>}
              {enableResend && (
                <ResendOTP
                  renderButton={renderButton}
                  renderTime={renderTime}
                  onResendClick={onResendClick}
                  maxTime={5}
                  onTimerComplete={onTimerComplete}
                  style={{}}
                  className={{}}
                />
              )}
            </Box>
          </Box>
        </Grid>
      }
      bottom={
        <Box
          borderTop={1}
          display="flex"
          justifyContent="space-between"
          borderColor="rgb(173, 184, 191)"
          pt={3}
        >
          <Button variant="outlined" color="primary" size="medium">
            <span color="primary"> Back </span>
          </Button>
          <Button
            className={proceedButton}
            variant="contained"
            size="medium"
            color="primary"
          >
            Proceed
          </Button>
        </Box>
      }
    />
  );
};

const AuthOtp = () => {
  return <SubMain content={<LeftContent />} image={<Box></Box>} />;
};

export default AuthOtp;
