import React from "react";
import {
  Header,
  Main,
  H1,
  Select,
  H5,
  FilledInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Description,
  H4,
  Box
} from "@mashreq-digital/ui";
import { getMashreqLogo } from "@mashreq-digital/webassets";
import { default as SubMain } from "./SubMain";
import { Eye2, EyeCross } from "@mashreq-digital/webassets";
let landing = require("../../assets/images/landing.png");

interface State {
  username: string;
  password: string;
  showPassword: boolean;
  showKeyboard: boolean;
}

const useStyles = makeStyles(theme => ({
  buttonBox: {
    marginTop: theme.spacing(20),
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(4),
    borderTop: `1px solid rgb(173, 184, 191)`
  },
  protectedBox: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(2),
    borderTop: `1px solid rgb(173, 184, 191)`
  },
  backgroundImg: {
    backgroundImage: `url(${landing})`,
    width:"100%",
    height:"100%"
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
const LeftContent = () => {
  const { buttonBox, formGroup, signinButton, inputBox, protectedBox } = useStyles();

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
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <H1>Welcome to Mashreq Online Banking</H1>
      <FormGroup className={formGroup}>
        <FormControl className={inputBox} variant="filled">
          <InputLabel htmlFor="filled-adornment-username">Uername</InputLabel>
          <FilledInput
            id="username"
            value={values.username}
            onChange={handleChange("username")}
            aria-describedby="username"
            inputProps={{
              "aria-label": "username"
            }}
          />
        </FormControl>

        <FormControl className={inputBox} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Eye2 /> : <EyeCross />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControlLabel
          className={inputBox}
          control={
            <Switch
              checked={values.showKeyboard}
              onChange={handleSwitchChange("showKeyboard")}
              value="showKeyboard"
            />
          }
          label="Virtual Keyboard"
        />

        <div className={protectedBox}>
        <H4> Ensure You are Always Protected </H4>
        <Description> Check out these security tips to protect yourself from being a victim of online threats. <span color="primary">Read More</span></Description>
       </div>
      </FormGroup>

      <div className={buttonBox}>
        <Button variant="outlined" color="primary" size="medium">
          <span color="primary">Forgot your Username or Password </span>
        </Button>
        <Button
          className={signinButton}
          variant="contained"
          size="medium"
          color="primary">Signin</Button>
      </div>
    </div>
  );
};

const Login = () => {
  const { backgroundImg } = useStyles();

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
          image={<Box className={backgroundImg}></Box>}
        />
      }
      footer={<H5>Footer</H5>}
    />
  );
};
export default Login;
