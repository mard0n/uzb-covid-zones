import React from "react";
import { OTP, H5, Box } from "@mashreq-digital/ui";

export interface PinInputProps {
  label: string;
  value: string;
  onPinChange: (pin: string) => void;
  error: boolean;
  autoFocus?: boolean;
}

const PinInput: React.SFC<PinInputProps> = (props) => {
  const { label, autoFocus = false, value, onPinChange, error } = props;
  return (
    <Box mb={"40px"}>
      <H5 gutterBottom>{label}</H5>
      <OTP
        autoFocus={autoFocus}
        secure // TODO: Issue with " 2 4"(not empty value) and password type
        value={value}
        onChange={onPinChange}
        OTPLength={4}
        otpType="number"
        inputClassName={error ? "error" : ""}
      />
    </Box>
  );
};

export default PinInput;
