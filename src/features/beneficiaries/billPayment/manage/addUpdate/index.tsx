import React, { useState } from "react";
import {
  Grid,
  colors,
  Box,
  IconButton,
  SvgIcon,
  makeStyles,
  Theme
} from "@mashreq-digital/ui";
import { Cross } from "@mashreq-digital/webassets";
import MDialog from "../../../../../common/dialog";
import AddUpdateBillPayment from "./AddUpdateBillPayment";
import AuthOtp from "../../../../../components/authOtp";
import Success from "./Success";
import ImageWithText from "../../../../../common/imageWithText";

const useStyles = makeStyles((theme: Theme) => ({
  leftStyle: {
    backgroundColor: colors?.grey?.[300],
    padding: theme?.spacing(7)
  }
}));

const AddUpdateDialog = (props: any) => {
  const { leftStyle } = useStyles();
  const { children, billType, isAdd, finalCallback, onCloseCallback, ...rest } = props;
  const [step, setStep] = useState("");

  const onSubmitCallback = () => {
    setStep("otp");
  };

  const onSuccessOTP = () => {
    setStep("confirmation");
  };

  const successFailureCallback = () => {
    if(finalCallback && typeof finalCallback === "function") {
    finalCallback();
  }
  };

  const switchComponent = () => {
    switch (step) {
      case "otp":
        return (
          <AuthOtp
            enableBack={false}
            enableCard={false}
            onSuccess={() => onSuccessOTP()}
          />
        );
      case "confirmation":
        return <Success type={billType} onButtonCallback={()=> successFailureCallback()}/>;
      default:
        return (
          <AddUpdateBillPayment type={billType} onSubmitCallback={() => onSubmitCallback()} />
        );
    }
  };
  return (
    <MDialog {...rest}>
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={3} className={leftStyle}>
          <Box>
            <IconButton aria-label="close" onClick={()=>onCloseCallback()}>
              <SvgIcon
                // className={cursor}
                component={Cross}
                htmlColor={colors?.blueGrey?.[500]}
                fontSize="small"
              />
            </IconButton>
          </Box>
          Left Content
        </Grid>
        <Grid item xs={9}>
          <Box pl={20} py={20.6} pr={10}>
            {step !== "confirmation" && (
              <Box mb={6}>
                <ImageWithText name={billType} />
              </Box>
            )}
            {switchComponent()}
          </Box>
        </Grid>
      </Grid>
    </MDialog>
  );
};

AddUpdateDialog.defaultProps = {
  billType: "sewa"
};

export default AddUpdateDialog;
