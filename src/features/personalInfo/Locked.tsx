import React from "react";
import {
  Header,
  Main,
  H2,
  Select,
  H5,
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
import { getMashreqLogo } from "@mashreq-digital/webassets";

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
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
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
            className={signinButton}
            variant="contained"
            size="medium"
            color="primary"
          >
            Try again
          </Button>
        </Box>
      }
    />
  );
};

const Locked = () => {
  let LogoSimbol = getMashreqLogo();
  return (
    <Main
      header={
        <Header
          left={<LogoSimbol width="40px" height="40px" />}
          right={
            <Select native onChange={() => {}}>
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </Select>
          }
        />
      }
      main={<SubMain content={<LeftContent />} image={<Box></Box>} />}
      footer={<H5>Footer</H5>}
    />
  );
};
export default Locked;
