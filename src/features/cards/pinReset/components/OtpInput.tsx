import React, { useState, useEffect } from "react";
import {
  Box,
  Caption,
  OTP,
  ResendOTP,
  CircularProgressAnimation,
} from "@mashreq-digital/ui";
import * as Endpoint from "../../../../network/Endpoints";
import { useFetch } from "../../../kyc/store/hooks/useFetch";
import { useTranslation } from "react-i18next";

export interface OtpInputProps {
  otp: string;
  handleOtpChange: (otp: string) => void;
  validateError: string;
}

const OtpInput: React.SFC<OtpInputProps> = (props) => {
  const { otp, handleOtpChange, validateError } = props;
  const { t } = useTranslation();
  const [onCompleteResendTimer, setOnCompleteResendTimer] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError(validateError);
    return () => {
      setError("");
    };
  }, [validateError]);

  const {
    execute: sendOtp,
    response: sendOtpRes,
    loading: sendOtpLoading,
  } = useFetch(Endpoint.CARDS_PIN_RESET_AUTH_SEND, {
    method: "POST",
    data: {
      cardNumber: "123",
    },
  });
  const {
    execute: resendOtp,
    response: resendOtpRes,
    loading: resendOtpLoading,
  } = useFetch(Endpoint.CARDS_PIN_RESET_AUTH_RESEND, {
    method: "POST",
    data: {
      cardNumber: "123",
    },
  });

  useEffect(() => {
    if (!sendOtpLoading && sendOtpRes) {
      console.log("sendOtpRes", sendOtpRes);
      if (sendOtpRes.errorCode) {
        setError(t("cards.otp.sendOtpError"));
      } else {
        // setError("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendOtpRes, sendOtpLoading]);

  useEffect(() => {
    if (!resendOtpLoading && resendOtpRes) {
      console.log("resendOtpRes", resendOtpRes);
      if (resendOtpRes.errorCode) {
        setError(t("cards.otp.resendOtpError"));
      } else {
        // setError("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resendOtpRes, resendOtpLoading]);

  useEffect(() => {
    sendOtp();
  }, []);

  const onResendClick = () => {
    resendOtp();
    setError("");
    setOnCompleteResendTimer(true);
  };

  const onTimerComplete = () => {
    setOnCompleteResendTimer(false);
  };

  const renderTime = (remainingTime: any) => {
    return (
      <Caption>
        <CircularProgressAnimation color="primary"></CircularProgressAnimation>
        {t("cards.otp.resendPossible")}
        <Caption color="primary">{remainingTime} sec </Caption>
      </Caption>
    );
  };
  return (
    <div className="OTPInput">
      <Box mb={3}>
        <OTP
          autoFocus
          inputClassName={error ? "error" : ""}
          disabled={onCompleteResendTimer}
          value={otp}
          otpType="number"
          onChange={handleOtpChange}
        />
      </Box>
      {error && <Caption color="error">{error}</Caption>}
      <ResendOTP
        renderTime={renderTime}
        onResendClick={onResendClick}
        maxTime={90}
        onTimerComplete={onTimerComplete}
      />
    </div>
  );
};

export default OtpInput;
