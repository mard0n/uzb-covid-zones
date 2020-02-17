import React from "react";
import {
  H2,
  Switch,
  FormControlLabel,
  Button,
  makeStyles,
  Caption,
  Grid,
  Box,
  SectionSplitter,
  SubMain,
  Timer
} from "@mashreq-digital/ui";

interface State {
  notify: Boolean;
}

const useStyles = makeStyles(theme => ({
  signinButton: {
    width: theme.spacing(20.8)
  },

}));
const LeftContent = () => {
  const {
    signinButton,
  } = useStyles();

  const [values, setValues] = React.useState<State>({
    notify: false
  });


  const handleSwitchChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.target.checked });
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
          <H2>You’ve been locked out</H2>
          <Grid 
        xs={8}
        sm={8}
        md={8}
        lg={8}
        xl={8}
        >   
        <Box mt={2.5}>
          <Caption>
          Too many authentication attemps.
          For your security we have disabled this device for 15 min
          </Caption>
          </Box>
        </Grid>
          <Box ml={3} mt={3}>
          <FormControlLabel
          control={
            <Switch
              // checked={values.notify}
              variant="ios"
              size="small"
              onChange={handleSwitchChange("notify")}
              value="showKeyboard"
            />
          }
          label="Notify me when ready"
        />
        </Box>
        </Box>
        </Grid>
      }
      bottom={
        <Box display="flex" justifyContent="flex-end">

          <Button
            className={signinButton}
            variant="contained"
            size="medium"
            color="primary"
            // disabled={true}
          >
            Try again
          </Button>
        </Box>
      }
      borderTop={true}

    />
  );
};

const Locked = (props:any) => {
  return (
    <SubMain content={<LeftContent {...props}/>} image={<Box mt={20} display="flex" justifyContent="center" alignContent="center" > <Timer {...props} /></Box>} />
  );
};
export default Locked;
