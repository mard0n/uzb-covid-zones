import React from "react";
import {
  H2,
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
  SubMain,
  Snackbar,
  Toast,
  AlertTitle
} from "@mashreq-digital/ui";
import { Eye2, EyeCross } from "@mashreq-digital/webassets";

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
const LeftContent = (props:any) => {
  const { history } = props;
  const { formGroup, inputBox } = useStyles();

  const [values, setValues] = React.useState<State>({
    username: "",
    password: "",
    showPassword: false,
    showKeyboard: false
  });
  const [openError, setOpenError] = React.useState(false);

  const handleBack = () => {
    history.push("/account/personalinfo");
  };

  const handlePreSignin = () => {
  if(values.username === "demo" && values.password === "demo"){
    props.handleNextStep();
   }else{
    setOpenError(true);
   }
 
  };


  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
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

      <Box>
         
      <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openError}
      onClose={handleErrorClose}
      autoHideDuration={5000}
    >
      <Toast severity="error">
        <AlertTitle>Ooops!</AlertTitle>
       <Box> Sorry it seems like you’ve made a mistake</Box>
      </Toast>
    </Snackbar>

      <Box mt={20}>
      <H2>Let’s Login</H2>
      <Box mt={2}>
      <Caption> We’re making the process easier for our customers, let’s start with your current login details.</Caption>
      </Box>
      <Grid 
      xs={6}
      sm={6}
      md={6}
      lg={6}
      xl={6}
      >     


      <FormGroup className={formGroup}>
        <FormControl className={inputBox} >
          <TextField
            id="username"
            error={openError}
            autoFocus={true}
            value={values.username}
            label="Username"
            onChange={handleChange("username")}
            aria-describedby="username"
            inputProps={{
              "aria-label": "username"
            }}
          />
        </FormControl>
        <Box mt={2}>
        <Caption color="primary">Forgot your Username?</Caption>
        </Box>
        <FormControl className={inputBox}>
          <TextField
            id="password"
            error={openError}
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

        <Box mt={2}>
        <Caption color="primary">Forgot your Password?</Caption>
        </Box>
      </FormGroup>
     </Grid>

     </Box>
     </Box>

      }
    bottom = {
      <Box display="flex" justifyContent="space-between">
        <Button variant="outlined" color="primary" onClick={handleBack}>
          <span color="primary">Back </span>
        </Button>
        <Button
          variant="contained"
          onClick={ handlePreSignin}
          disabled={!values.password || !values.username}
          color="primary">Signin</Button>
          </Box>
    }
    borderTop={true}

    />
    
  );
};

const PreLogin = (props : any) => {
  return (
    <SubMain
    content={<LeftContent {...props}/>}
    image={<Box></Box>}
  />
  );
};
export default PreLogin;
