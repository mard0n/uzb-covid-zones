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
  SubMain
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
          <Caption>
          Too many authentication attemps.
          For your security we have disabled this device for 15 min
          </Caption>

          <Box mt={3}>
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
        <Box display="flex" justifyContent="space-between">

          <Button
            className={signinButton}
            variant="contained"
            size="medium"
            color="primary"
          >
            Try again
          </Button>
        </Box>
      }
      borderTop={true}

    />
  );
};

const Locked = () => {
  return (
    <SubMain content={<LeftContent />} image={<Box></Box>} />
  );
};
export default Locked;
