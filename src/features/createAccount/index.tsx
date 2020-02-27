import React, { useEffect } from "react";
import { Box } from "@mashreq-digital/ui";
import { connect } from "react-redux";
import { ReduxAction, stepsID } from "../../reducers/createAcountReducer";
import { CreateAccountActions } from "../../actions/createAccountActions";
import { Dispatch } from "redux";
import AuthOtp from "./AuthOtp";
import { default as MobileInfo } from "./MobileNumber";
import PreLogin from "./PreLogin";
import Terms from "./Terms";
import PasswordScreen from "./PasswordScreen";

const PersonalInformatin = (props: any) => {
  const {
    match,
    history,
    activeStep,
    setActiveStep,
    isLastStep,
    isFirstStep
  } = props;

  console.log("PersonalInformatin");

  useEffect(() => {
    let routePath = match?.params?.stepId,
      getActiveID = stepsID.indexOf(routePath);
    setActiveStep(getActiveID > 0 ? getActiveID : 0);
  }, [match, setActiveStep]);

  const handleNextStep = () => {
    console.log({ activeStep, isLastStep, isFirstStep });

    // active step is the last step
    if (isLastStep) return;
    history.push(`/account/${stepsID[activeStep + 1]}`);
  };
  const handleBack = () => {
    // currently at the first step
    if (isFirstStep) return;
    history.goBack();
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <MobileInfo
            handleNextStep={handleNextStep}
            handleBack={handleBack}
            {...props}
          />
        );
      case 1:
        return (
          <PreLogin
            handleNextStep={handleNextStep}
            // handleBack={handleBack}
            {...props}
          />
        );
      case 2:
        return (
          <AuthOtp
            handleNextStep={handleNextStep}
            handleBack={handleBack}
            {...props}
          />
        );
      case 3:
        return (
          <Terms
            handleNextStep={handleNextStep}
            handleBack={handleBack}
            {...props}
          />
        );
      case 4:
        return (
          <PasswordScreen
            handleNextStep={handleNextStep}
            handleBack={handleBack}
            {...props}
          />
        );
      default:
        return (
          <MobileInfo
            handleNextStep={handleNextStep}
            handleBack={handleBack}
            {...props}
          />
        );
    }
  };

  return (
    <div>
      <Box>{getStepContent(activeStep)}</Box>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  activeStep: state.createAccount.activeStep,
  isFirstStep: state.createAccount.isFirstStep,
  isLastStep: state.createAccount.isLastStep
});

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => ({
  setActiveStep: (step: number) =>
    dispatch({ type: CreateAccountActions.setActiveStep, payload: step })
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformatin);
