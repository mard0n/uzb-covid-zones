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
  ResendOTP,
  Toast,
  AlertTitle,
  Snackbar
} from "@mashreq-digital/ui";
import Locked from "./Locked";

interface State {
  number: string;
}

const LeftContent = (props: any) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [otpCount, setOtpCount] = useState(0);
  const [onCompleteResendTimer, setOnCompleteResendTimer] = useState(false);
  const [enableResend, setEnableResend] = useState(false);
  const { history } = props;
  const [open, setOpen] = React.useState(false);

  const handleBack = () => {
    history.push("/account/personalinfo");
  };

  const onChange = (val: any) => {
    setOtp(val);
    console.log(val.length);
    const trimValue = val;
    setTimeout(() => {
      if (trimValue && trimValue.length === 6) {
        if (val === "555555") {
          console.log("submit netw page");
          props.handleNextStep();
        }
        let isError = val && val === "111111";
        isError ? setOtpCount(otpCount + 1) : setOtpCount(otpCount);
        if(otpCount === 2) { props.onLock(false) };
        setError(isError);
        setEnableResend(isError);
        setOtp("");
        setOpen(true);
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
      <Box mt={3}>
        <Button {...rest}  size="small">
         <Caption color="primary"> Resend OTP Code </Caption>
        </Button>
      </Box>
    );
  };

  const [values, setValues] = React.useState<State>({
    number: ""
  });

  const renderTime = (remainingTime: any) => {
    return (
      <Box mt={2}>
        <CircularProgressAnimation color="primary"></CircularProgressAnimation>
        Resend possible in <Caption color="primary">{remainingTime} sec </Caption>
      </Box>
    );
  };

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <SectionSplitter
     borderTop={false}
      top={
        <Box mt={20}>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={100}
          >
            <Toast severity="error">
              <AlertTitle>Ooops!</AlertTitle>
             <Box> Sorry it seems like you’ve made a mistake in your OTP. You have <b>{ 3 - otpCount} attempts left.</b> </Box>
            </Toast>
          </Snackbar>

          <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
            <Box pt={10}>
              <H1>Authentification</H1>
              <Box pt={3}>
                <Caption>
                  Please enter the 6 digit code sent to your mobile number 
                  <br />
                </Caption>
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
                    className={{}}
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

  return ( locked ? <SubMain content={<LeftContent {...props} onLock={(lock:any)=>setLocked(lock)}/>} image={<Box></Box>} /> : <Locked {...props}/>);
};

export default AuthOtp;
