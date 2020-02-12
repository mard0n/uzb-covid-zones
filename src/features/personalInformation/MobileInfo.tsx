import React from "react";
import {
  Header,
  Main,
  H2,
  Select,
  H5,
  TextField,
  InputAdornment,
  FormControl,
  Button,
  FormGroup,
  makeStyles,
  Caption,
  Box,
  SectionSplitter
} from "@mashreq-digital/ui";
import { getMashreqLogo } from "@mashreq-digital/webassets";
import { default as SubMain } from "../authentication/SubMain";

interface State {
  number: string;
}

const useStyles = makeStyles(theme => ({
  signinButton: {
    width: theme.spacing(20.8)
  },
  formGroup: {
    width: theme.spacing(52.5)
  },
}));
const LeftContent = () => {
  const {
    formGroup,
    signinButton,
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
        <div>
          <H2>Let’s start with your mobile number.</H2>
          <Caption>
            Please enter your mobile number <b>registered with Mashreq </b>. We will
            send you a text message with a 6 digit code for authentication.
          </Caption>

          <FormGroup className={formGroup}>
            <FormControl>
            <Box mt={4.5}>
              <TextField
                label="Mobile Number"
                id="mobile-number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+971</InputAdornment>
                  )
                }}
                variant="filled"
              />
              </Box>
            </FormControl>
          </FormGroup>
        </div>
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
            Proceed
          </Button>
        </Box>
      }
    />
  );
};

const Terms = () => {
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
export default Terms;
