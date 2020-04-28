
import React from 'react'
import { Box, Caption, LinearProgressBar, makeStyles } from '@mashreq-digital/ui';

const useStyles = makeStyles((theme: any) => ({
    transferBox: {
      borderRadius: "6px",
      background: "rgb(245, 245, 245)",
      height: "51px",
    },
  }));

 const SuggestionBox = (props:any) => {
    const { currency,activeStep,maxPrice }=props;
    const {transferBox} = useStyles();
    return (
        <>
        <Box
          className={transferBox}
          display="flex"
          pl={3}
          alignItems="center"
        >
          <Caption>
            You can transfer up to <b> { currency }  { maxPrice }</b>
          </Caption>
        </Box>
        <LinearProgressBar
          color={activeStep >= maxPrice? "secondary":"primary"}
          activeStep={activeStep}
          totalStep={maxPrice}
          variant={"determinate"}
        />
      </>
    );
}

export default SuggestionBox;