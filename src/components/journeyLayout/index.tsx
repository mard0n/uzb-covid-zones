import React, { useEffect, useState, ReactChild } from 'react';
import {
  Grid,
  Box,
  IconButton,
  SvgIcon,
  makeStyles,
  Theme,
  colors
} from "@mashreq-digital/ui";
import { Cross } from "@mashreq-digital/webassets";
import MDialog from "../../common/dialog";
import VerticalStepper from "../../common/verticalStepper";
import { transitionModalProps } from '@mashreq-digital/ui/dist/types/components';
import ImageWithText from '../../common/imageWithText';

const useStyles = makeStyles((theme: Theme) => ({
  leftStyle: {
    backgroundColor:colors?.grey?.[300],
    // padding: theme?.spacing(7)
  },
  rightStyle: {
    maxWidth: "calc(100vw - 360px)",
    flexBasis: "calc(100vw - 360px)"
  }
})); 

interface journeyPageProps extends transitionModalProps {
  content? : ReactChild,
  stepperInit : string,
  onCloseCallback? : any,
  step : string,
  description?:any,
  logo?:any,
  iconType?:any,
  type : string,
  stepperOptions? : Array<string>
};

const JourneyPage = (props: journeyPageProps) => {
  const { leftStyle, rightStyle } = useStyles();
  const [stepInit, setStepInit] = useState('');
  // const [options, setOptions] = useState('');
  const { content, step, type,description, stepperOptions, stepperInit, onCloseCallback,logo, iconType,...rest } = props;

  useEffect(()=>{
    setStepInit(stepperInit)
  },[stepperInit]);

  return (
      <Grid container style={{ height: "100%", flexWrap:"nowrap",padding:0 }}>
      
        <Grid item xs={3} className={leftStyle}>
          <Box>
            <IconButton aria-label="close" onClick={()=>onCloseCallback()}>
              <SvgIcon
                // className={cursor}
                component={Cross}
                htmlColor={colors.blueGrey?.[500]}
                fontSize="small"
              />
            </IconButton>
            {stepperOptions && stepperOptions.length > 0 && stepInit && 
            <VerticalStepper options={stepperOptions} init={stepInit}/>
          }
          </Box>
        </Grid>

        <Grid item xs={9} className={rightStyle}>
          <Box pl={20} py={10.6} pr={10}>
            {step !== "confirmation" && type && (
              <Box mb={6}>
                <ImageWithText description={description} name={type} iconType = {iconType} logo={logo}/>
              </Box>
            )}
            {content}
          </Box>
        </Grid>
      </Grid>
  );
}

JourneyPage.defaultProps = {
  stepperOptions: [],
  open: false
}

export default JourneyPage;
