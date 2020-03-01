import React from "react";
import {
  H2,
  TextField,
  IconButton,
  FormControl,
  Button,
  Grid,
  FormGroup,
  InfoCard,
  makeStyles,
  Caption,
  Box,
  SectionSplitter,
  SubMain,
  Snackbar,
  Toast,
  FormControlLabel,
  Switch,
  AlertTitle,
  UnderlineText,
  SvgIcon,
  Keyboard
} from "@mashreq-digital/ui";
import {
  Eye2,
  EyeCross,
  Rocket,
  ChevronLeft
} from "@mashreq-digital/webassets";
import { useTranslation } from "react-i18next";

interface State {
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
  const { history } = props;
  const { formGroup, inputBox } = useStyles();
  const [passwordFocus, setPasswordFocus] = React.useState(false);

  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
    showKeyboard: false
  });
  const [openError, setOpenError] = React.useState(false);

  const handleBack = () => {
    history.push("/account/personalinfo");
  };

  const handlePreSignin = () => {
    if (values.password === "demo") {
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
              <H2>{t("account.prelogin.title2")}</H2>
            </UnderlineText>

            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Box mt={2}>
                <Caption>{t("account.prelogin.desc")}</Caption>
              </Box>
              <FormGroup className={formGroup}>
                <FormControl className={inputBox}>
                  <TextField
                    id="password"
                    onFocus={() => setPasswordFocus(true)}
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

              <Box m={1} textAlign="center">
                {passwordFocus && values.showKeyboard && (
                  <Keyboard handleOnChange={handleErrorClose} />
                )}
              </Box>
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
            disabled={!values.password}
            color="primary"
          >
            {t("common.action.signin")}
          </Button>
        </Box>
      }
      borderTop={true}
    />
  );
};

const PasswordScreen = (props: any) => {
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

export default PasswordScreen;
