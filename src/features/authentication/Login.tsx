import React from "react";
import {
  H1,
  TextField,
  IconButton,
  FormControl,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Caption,
  H4,
  Box,
  SectionSplitter,
  SubMain,
  Grid
} from "@mashreq-digital/ui";
import { Eye2, EyeCross } from "@mashreq-digital/webassets";
let landing = require("../../assets/images/landing.png");

interface State {
  username: string;
  password: string;
  showPassword: boolean;
  showKeyboard: boolean;
}

const useStyles = makeStyles(theme => ({
  backgroundImg: {
    backgroundImage: `url(${landing})`,
    backgroundSize: "cover",
    backgroundPosition: "100%"
 },
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
const LeftContent = (props:any) => {
  const { formGroup, signinButton, inputBox } = useStyles();
  const { history } = props;

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

  const onSignIn = () =>{
    if(values.username === "demo" && values.password === "demo")
  {
  console.log("demo signin");
  history.push("/account/personalinfo");

  }
  
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
      xs={10}
      sm={10}
      md={10}
      lg={10}
      xl={10}
      >  
      <Box mt={10}>
      <H1>Welcome to Mashreq Online Banking</H1>
      <Grid 
      xs={7}
      sm={7}
      md={7}
      lg={7}
      xl={7}
      > 

      <FormGroup>
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
            <Box ml={3}>
        <FormControlLabel
          className={inputBox}
          control={
            <Switch
              checked={values.showKeyboard}
              variant = "ios"
              onChange={handleSwitchChange("showKeyboard")}
              value="showKeyboard"
            />
          }
          label="Virtual Keyboard"
        />
        </Box>
        <Box mt={8} pt={2} borderTop={1} borderColor="rgba(151, 151, 151, 0.2)">
        <H4> Ensure You are Always Protected </H4>
        <Caption> Check out these security tips to protect yourself from being a victim of online threats. <span color="primary">Read More</span></Caption>
        </Box>
      </FormGroup>
      </Grid>
      </Box>
      </Grid>
    }
    bottom = {
      <Box display="flex" justifyContent="space-between">
        <Button variant="outlined" color="primary">
          <span color="primary">Forgot your Username or Password </span>
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!values.password || !values.username}
          onClick={onSignIn}
          >Signin</Button>
          </Box>
    }
    borderTop={true}

    />
  );
};

const Login = (props:any) => {
  const { backgroundImg } = useStyles();
  return (
    <SubMain
    content={<LeftContent {...props}/>}
    image={<Box width="100%" height = "100%" className={backgroundImg}></Box>}
  />
  );
};
export default Login;
