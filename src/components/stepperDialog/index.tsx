import React, { useEffect, useState, ReactChild } from 'react';
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
import MDialog from "../../common/dialog";
import VerticalStepper from "../../common/verticalStepper";
import { transitionModalProps } from '@mashreq-digital/ui/dist/types/components';
import ImageWithText from '../../common/imageWithText';

const useStyles = makeStyles((theme: Theme) => ({
  leftStyle: {
    backgroundColor: colors?.grey?.[300],
    maxWidth: "360px",
    padding: theme?.spacing(7)
  }
})); 

interface StepperDialogProps extends transitionModalProps {
  content? : ReactChild,
  stepperInit : string,
  onCloseCallback? : any,
  step : string,
  type : string,
  stepperOptions? : Array<string>
};

const StepperDialog = (props: StepperDialogProps) => {
  const { leftStyle } = useStyles();
  const [stepInit, setStepInit] = useState('');
  const { content, step, type, stepperOptions, stepperInit, onCloseCallback, ...rest } = props;

  useEffect(()=>{
    setStepInit(stepperInit)
  },[stepperInit]);
  console.log(stepperOptions, stepInit)
  return (
    <MDialog fullScreen {...rest}>
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
            {stepperOptions && stepperOptions.length > 0 && stepInit && 
            <VerticalStepper options={stepperOptions} init={stepInit}/>
          }
          </Box>
          
        </Grid>
        <Grid item xs={9}>
          <>
        {step && step !== "confirmation" && type && (
              <Box mb={6}>
                <ImageWithText name={type} />
              </Box>
            )}
          {content && 
          <Box pl={30} py={20.6} pr={10}>
            {content}
          </Box>
          }
          </>
        </Grid>
      </Grid>
    </MDialog>
  );
}

StepperDialog.defaultProps = {
  stepperOptions: []
}

export default StepperDialog;
