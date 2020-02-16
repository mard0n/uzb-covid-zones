import React from "react";
import {
  Header,
  Main,
  H2,
  Select,
  H5,
  TextField,
  IconButton,
  FormControl,
  Button,
  Grid,
  FormGroup,
  makeStyles,
  Caption,
  Box,
  SectionSplitter,
  SubMain
} from "@mashreq-digital/ui";
import { getMashreqLogo } from "@mashreq-digital/webassets";
import { Eye2, EyeCross } from "@mashreq-digital/webassets";
let landing = require("../../assets/images/landing.png");

interface State {
  username: string;
  password: string;
  showPassword: boolean;
  showKeyboard: boolean;
}

const useStyles = makeStyles(theme => ({
  signinButton: {
    width: theme.spacing(20.8)
  },
  formGroup: {
    width: theme.spacing(52.5)
  },
  inputBox: {
    marginTop: theme.spacing(4.3)
  }
}));
const LeftContent = () => {
  const { formGroup, inputBox } = useStyles();

  const [values, setValues] = React.useState<State>({
    username: "",
    password: "",
    showPassword: false,
    showKeyboard: false
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSwitchChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.target.checked });
  };
  const handleClickShowPassword = () => {
    console.log({ ...values, showPassword: !values.showPassword });
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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

    
      <H2>Let’s Login</H2>
      <Box mt={2}>
      <Caption> We’re making the process easier for our customers, let’s start with your current login details.</Caption>
      </Box>
      <FormGroup className={formGroup}>
        <FormControl className={inputBox} >
          <TextField
            id="username"
            value={values.username}
            label="Username"
            onChange={handleChange("username")}
            aria-describedby="username"
            inputProps={{
              "aria-label": "username"
            }}
          />
        </FormControl>
        <Caption color="primary">Forgot your Username?</Caption>

        <FormControl className={inputBox}>
          <TextField
            id="password"
            label="Password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            InputProps={{
              endAdornment: (<IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Eye2 /> : <EyeCross />}
            </IconButton>)
            }}

          />
        </FormControl>
        <Caption color="primary">Forgot your Password?</Caption>


      </FormGroup>

     </Grid>
      }
    bottom = {
      <Box borderTop={1} display="flex" justifyContent="space-between" borderColor="rgb(173, 184, 191)" pt={3}>
        <Button variant="outlined" color="primary">
          <span color="primary">Forgot your Username or Password </span>
        </Button>
        <Button
          variant="contained"
          color="primary">Signin</Button>
          </Box>
    }
    />
    
  );
};

const PreLogin = () => {

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
      main={
        <SubMain
          content={<LeftContent />}
          image={<Box></Box>}
        />
      }
      footer={<H5>Footer</H5>}
    />
  );
};
export default PreLogin;
