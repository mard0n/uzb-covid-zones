import React from 'react'
import { makeStyles } from '@mashreq-digital/ui';
import JourneyPage from './index';

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

const JourneyLayout = (props: any) => {
  const { root } = useStyles();
  return (
    <JourneyPage  {...props}/>
  )
}

export default JourneyLayout;
