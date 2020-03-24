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
import { useDispatch } from "react-redux";
import * as Actions from "../../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
// import * as LandingActions from "../../../../../redux/actions/beneficiary/billPayment/landingActions";
//import FilledStaticStepper from "../../../../../common/filledStaticStepper";

const useStyles = makeStyles((theme: Theme) => ({
  leftStyle: {
    backgroundColor: colors?.grey?.[300],
    padding: theme?.spacing(7)
  }
}));

const AddUpdateDialog = (props: any) => {
  const { leftStyle } = useStyles();
  const { children, billType, isAdd, resumeData, finalCallback, onCloseCallback, ...rest } = props;
  const dispatch = useDispatch();
  const [step, setStep] = useState("");
  const [draftData, setDraftData] = useState<any>({});
  // const addNew = useSelector(
  //   (state: any) => state?.beneficiary?.billPayment?.addNew
  // );

  const onSubmitCallback = (data: any) => {
    if(data && data.id) {
      setDraftData(data);
      setStep("otp");
    }
  };

  const onSuccessOTP = () => {
    if(draftData && draftData.id) {
      dispatch(Actions.activateBeneficiaryRequest({beneficiaryId : draftData.id}));
      setStep("confirmation");
    }
  };

  const successFailureCallback = () => {
    if(finalCallback && typeof finalCallback === "function") {
    dispatch(Actions.clearBeneficiaryAddNew());
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
        return <Success type={billType} data={draftData} onButtonCallback={()=> successFailureCallback()}/>;
      default:
        return (
          <AddUpdateBillPayment type={billType} isAdd={isAdd} edit={resumeData} onSubmitCallback={(data: any) => onSubmitCallback(data)} />
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
          {/* Left Content */}
          {/* <FilledStaticStepper options={["123123","123123123","123123123123"]} init="123123"/> */}
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
