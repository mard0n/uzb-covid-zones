import React from "react";
import {
  H1,
  Button,
  makeStyles,
  Caption,
  Box,
  OTP,
  Grid,
  SectionSplitter,
  MobileIconText,
  SubMain
} from "@mashreq-digital/ui";

interface State {
  number: string;
}

const useStyles = makeStyles(theme => ({
  proceedButton: {
    width: theme.spacing(20.8)
  }
}));
const LeftContent = () => {
  const {
    proceedButton,
  } = useStyles();

  const [values, setValues] = React.useState<State>({
    number: ""
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <SectionSplitter
      top={
        <Grid 
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        >
        <Box pt={20}>
          <H1>Authentification</H1>
          <Box pt={3}>
          <Caption>
          Please enter the 6 digit code sent to your mobile number <br/>
          </Caption>

          <MobileIconText/>
          
          </Box>
            <Box mt={4.5}>
            <OTP/>
              </Box>
         </Box>
        </Grid>
      }
      bottom={
        <Box
          borderTop={1}
          display="flex"
          justifyContent="space-between"
          borderColor="rgb(173, 184, 191)"
          pt={3}
        >
          <Button variant="outlined" color="primary" size="medium">
            <span color="primary"> Back </span>
          </Button>
          <Button
            className={proceedButton}
            variant="contained"
            size="medium"
            color="primary"
          >
            Proceed
          </Button>
        </Box>
      }
    />
  );
};

const AuthOtp = () => {
  return (
    <SubMain content={<LeftContent />} image={<Box></Box>} />
  );
};


export default AuthOtp;
