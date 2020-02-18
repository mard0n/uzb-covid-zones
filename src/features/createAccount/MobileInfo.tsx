import React, {useState} from "react";
import {
  H2,
  TextField,
  Button,
  makeStyles,
  Caption,
  Box,
  Grid,
  SectionSplitter,
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


const LeftContent = (props:any) => {
  const {
    proceedButton,
  } = useStyles();

  const { history } = props;

  const handleBack = () => {
    history.push("/login");
  };

  const [isEnableProceed, enableProceed] = useState(false);

  const [values, setValues] = React.useState<State>({
    number: ""
    });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("sdsada");
    setValues({ ...values, [prop]: event.target.value });
    enableProceed(true);
  };

  return (
    <SectionSplitter
      top={
        <Grid 
        xs={8}
        sm={8}
        md={8}
        lg={8}
        xl={8}
        >
        <Box mt={20}>
          <H2>Let’s start with your mobile number.</H2>
          <Box mt={3}>
          <Caption>
            Please enter your mobile number <b>registered with Mashreq </b>. We will
            send you a text message with <br/> a 6 digit code for authentication.
          </Caption>
          </Box>
            <Box mt={4.5}>
              <TextField
                label="Mobile Number"
                id="mobile-number"
                autoFocus={true}
                type="tel"
                variant="filled"
                onChange={handleChange('number')}
              />
              </Box>
         </Box>
        </Grid>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">

          <Button variant="outlined" color="primary" onClick={handleBack} size="medium">
            <span color="primary"> Back </span>
          </Button>
          <Button
            className={proceedButton}
            variant="contained"
            size="medium"
            color="primary"
            onClick={props.handleNextStep}
            disabled={!isEnableProceed}
          >
            Proceed
          </Button>
        </Box>
      }
      borderTop={true}
    />
  );
};

const MobileInfo = (props:any) => {
    return (
    <SubMain content={<LeftContent {...props}/>} image={<Box></Box>} />
  );
};
export default MobileInfo;
