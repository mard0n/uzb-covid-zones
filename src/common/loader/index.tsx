import React,  {useState, useEffect} from 'react';
import { Box, Portal, CircularProgress, H3, makeStyles, Theme, Backdrop } from "@mashreq-digital/ui";

const useStyles = makeStyles((theme: Theme)=>({
  // root: {
  //   position: 'fixed',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   height: "100%",
  //   width: "100%",
  //   backgroundColor: "rgba(0,0,0,0.4)",
  //   zIndex: 1200
  // },
  backdrop : {
    zIndex: theme.zIndex.modal + 5,
  },
  textStyle: {
    color: theme?.palette?.common?.white,
    marginTop: theme.spacing(2.5)
  }
}));

interface LoaderProps {
  enable: boolean
};

const Loader = (props: LoaderProps) => {
  const { enable } = props;
  const { textStyle } = useStyles();

  if(enable) {
    return (
      <Backdrop open={enable}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <CircularProgress/>
          <H3 className={textStyle}>Loading...</H3>
        </Box>
      </Backdrop>
    );
      // <Portal container={document.body}>
        
      // </Portal>
  }
  return null;
};

Loader.defaultProps = {
  enable: false
}

export default Loader;