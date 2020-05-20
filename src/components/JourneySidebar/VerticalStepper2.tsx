import React from "react";
import { Box, makeStyles, Theme , H5} from "@mashreq-digital/ui";

/**
 * @prop {array} steps     - Pass array of string [string]
 * @prop {number} currentStep     - number - Active Step
 * @return {Component}
 */

const useStyle = makeStyles((theme: Theme) => ({
  verticalStep: {
    position: "relative",
    height: (props: any) => {
      const calcFont = 18 * props.steps.length;
      const calcMargin = 24 * (props.steps.length - 1);
      return `${calcFont + calcMargin}px`;
    },
    background: "#dde0e9",
    width: "8px",
    marginRight: theme.spacing(4),
    borderRadius: "8px",

    "& .step-process": {
      position: "absolute",
      top: 0,
      left: 0,
      height: (props: any) => {
        if (props.currentStep > props.steps.length) {
          return 0;
        }
        const calcFont = (props.currentStep + 1) * 18;
        const calcMargin = props.currentStep * 24;
        return `${calcFont + calcMargin}px`;
      },
      width: "8px",
      background: theme.palette.primary.main,
      borderRadius: "8px",
    },
  },

  stepText: {
    marginBottom: theme.spacing(4),
    color: "#313131",
    fontWeight: 500,
    lineHeight: theme.typography.pxToRem(18),

    "&:last-child": {
      marginBottom: theme.spacing(0),
    },

    "&.step-current": {
      color: theme.palette.primary.main,
    },

    "&.step-text-prev": {
      fontWeight: "bold",
    },
  },
}));

const VerticalStepper2 = (props: any) => {
  const { currentStep, steps } = props;
  const { verticalStep, stepText } = useStyle(props);
  return (
    <Box display="flex" flexDirection="row">
      <Box className={verticalStep}>
        <Box className="step-process"></Box>
      </Box>
      <Box>
        {steps.map((step: string, key: any): any => {
          return (
            <H5
              key={step}
              className={`${stepText} ${key === currentStep ? "step-current" : ""} ${
                key <= currentStep ? "step-text-prev" : ""
              }`}
            >
              {step}
            </H5>
          );
        })}
      </Box>
    </Box>
  );
};

export default VerticalStepper2;
