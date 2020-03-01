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
  InfoCard,
  Box,
  SectionSplitter,
  SubMain,
  Snackbar,
  Toast,
  Keyboard,
  FormControlLabel,
  Switch,
  AlertTitle,
  UnderlineText,
  SvgIcon
} from "@mashreq-digital/ui";
import {
  Eye2,
  EyeCross,
  Rocket,
  ChevronLeft
} from "@mashreq-digital/webassets";
import { useTranslation } from "react-i18next";

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

const LeftContent = (props: any) => {
  const { t } = useTranslation();
  const { formGroup, inputBox } = useStyles();

  const [values, setValues] = React.useState<State>({
    username: "",
    password: "",
    showPassword: false,
    showKeyboard: false
  });
  const [openError, setOpenError] = React.useState(false);
  const [textFocus, setFocus] = React.useState(false);
  // const [inputData, setInput] = React.useState("");
  const { history } = props;

  const handleBack = () => {
    history.push("/account/personalinfo");
  };

  const handlePreSignin = () => {
    if (values.username === "demo" && values.password === "demo") {
      props.handleNextStep();
    } else {
      setOpenError(true);
    }
  };

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

  const handleErrorClose = () => {
    setOpenError(false);
  };

  return (
    <SectionSplitter
      borderTop={true}
      top={
        <Box>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={openError}
            onClose={handleErrorClose}
            autoHideDuration={5000}
          >
            <Toast severity="error">
              <AlertTitle>{t("error.title")}</AlertTitle>
              <Box>{t("error.desc")} </Box>
            </Toast>
          </Snackbar>

          <Box mt={10}>
            <UnderlineText color="primary">
              <H2>{t("account.prelogin.title")}</H2>
            </UnderlineText>

            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Box mt={2}>
                <Caption>{t("account.prelogin.desc")}</Caption>
              </Box>
              <FormGroup className={formGroup}>
                <FormControl className={inputBox}>
                  <TextField
                    id="username"
                    error={openError}
                    autoFocus={true}
                    value={values.username}
                    label={t("common.label.username")}
                    onChange={handleChange("username")}
                    aria-describedby={t("common.label.username")}
                    inputProps={{
                      "aria-label": t("common.label.username"),
                      maxLength: 80
                    }}
                  />
                </FormControl>
                <Box mt={2}>
                  <Caption color="primary">
                    {t("common.links.forgetUsername")}
                  </Caption>
                </Box>
                <FormControl className={inputBox}>
                  <TextField
                    id="password"
                    onFocus={() => setFocus(true)}
                    error={openError}
                    label={t("common.label.password")}
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label={t("common.label.password")}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? <Eye2 /> : <EyeCross />}
                        </IconButton>
                      )
                    }}
                    inputProps={{
                      "aria-label": t("common.label.password"),
                      maxLength: 80
                    }}
                  />
                </FormControl>

                <Box m={1} textAlign="center">
                  {textFocus && values.showKeyboard && (
                    <Keyboard handleOnChange={handleErrorClose} />
                  )}
                </Box>

                <Box mt={2}>
                  <Caption color="primary">
                    {t("common.links.forgetPassword")}
                  </Caption>
                </Box>
                <Box ml={2} mt={3}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.showKeyboard}
                        variant="ios"
                        onChange={handleSwitchChange("showKeyboard")}
                        value="showKeyboard"
                      />
                    }
                    label={t("login.keyboard")}
                  />
                </Box>
              </FormGroup>
            </Grid>
          </Box>
        </Box>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">
          <Button color="primary" onClick={handleBack} size="medium">
            <SvgIcon color="primary" component={ChevronLeft} />
            <span color="primary">{t("common.action.back")} </span>
          </Button>
          <Button
            variant="contained"
            onClick={handlePreSignin}
            disabled={!values.password || !values.username}
            color="primary"
          >
            {t("common.action.signin")}
          </Button>
        </Box>
      }
    />
  );
};

const PreLogin = (props: any) => {
  return (
    <SubMain
      content={<LeftContent {...props} />}
      image={
        <Box mt={18}>
          <InfoCard
            icon={Rocket}
            title="We are upgrading"
            content="As a part of Masheq 2.0, we are creating a better experience for our customers"
          />
        </Box>
      }
    />
  );
};

export default PreLogin;
