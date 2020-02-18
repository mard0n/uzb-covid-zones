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
  Grid,
  Snackbar,
  Toast,
  AlertTitle
} from "@mashreq-digital/ui";
import { Eye2, EyeCross } from "@mashreq-digital/webassets";
import { useTranslation } from 'react-i18next';

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
  inputBox: {
    marginTop: theme.spacing(4.3)
  }
}));
const LeftContent = (props:any) => {
  const { inputBox } = useStyles();
  const { history } = props;
  const { t } = useTranslation();

  const [values, setValues] = React.useState<State>({
    username: "",
    password: "",
    showPassword: false,
    showKeyboard: false
  });

  const [openError, setOpenError] = React.useState(false);


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

  }else{
    setOpenError(true);
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
  const handleErrorClose = ()=>{
    setOpenError(false);

  }

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
      
      <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openError}
      onClose={handleErrorClose}
      autoHideDuration={5000}
    >
      <Toast severity="error">
        <AlertTitle>{t("Error.ErrorTitle")}</AlertTitle>
       <Box>{t("Error.LoginErrorHeading")} </Box>
      </Toast>
    </Snackbar>

      <Box mt={10}>
      <H1>{t("Login.title")}</H1>
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
            error = {openError}
            value={values.username}
            label={t("common.username")}
            onChange={handleChange("username")}
            aria-describedby={t("common.username")}
            inputProps={{
              "aria-label": "username"
            }}
          />
        </FormControl>

        <FormControl className={inputBox}>
          <TextField
            id="password"
            error = {openError}
            label={t("common.password")}
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
          label={t("Login.keyboard")} 
        />
        </Box>
        <Box mt={8} pt={2} borderTop={1} borderColor="rgba(151, 151, 151, 0.2)">
        <H4> {t("Login.ensure")} </H4>
        <Caption> {t("Login.securityTips")}</Caption>
        </Box>
      </FormGroup>
      </Grid>
      </Box>
      </Grid>
    }
    bottom = {
      <Box display="flex" justifyContent="space-between">
        <Button variant="outlined" color="primary">
          <span color="primary">{t("Login.forgot")} </span>
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!values.password || !values.username}
          onClick={onSignIn}
          >
          {t("common.signin")}
          
          </Button>
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
