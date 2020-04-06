import React from 'react'
import StepperDialog from '.';
import { makeStyles } from '@mashreq-digital/ui';

const height = "calc(100vh - 51px)";
const useStyles = makeStyles(() => ({
  root: {
   height: height,
   "& > .MuiBackdrop-root, & .MuiDialog-container > .MuiPaper-root" : {
     height: height,
     boxShadow: "none"
   }
  }
}));

const StepperDialogModal = (props: any) => {
  const { root } = useStyles();
  return (
    <StepperDialog className={root} {...props}/>
  )
}

export default StepperDialogModal;
