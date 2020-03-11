import React, { useEffect, useRef, useState } from "react";
import {
  H2,
  TextField,
  IconButton,
  FormControl,
  Button,
  Grid,
  FormGroup,
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

interface StyleProps {
  checked: any;
  topPos: any;
  leftPos: any;
}

const useStyles = (props: any) => ({
  root: {
    outline: props.checked ? "2px solid black" : 0,
    "& :focus": {
      caretColor: props.checked ? "transparent" : "auto"
    }
  },
  keyboardStyle: {
    top: `${props.topPos}px`,
    left: `${props.leftPos}px`,
    position: "fixed"
  }
});

function useComponentVisible(initialIsVisible: Boolean) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const [topPos, setTop] = useState(-1000);
  const [leftPos, setLeft] = useState(-1000);
  const keyboard = useRef(null);

  const handleClickOutside = (e: any) => {
    const { className, type } = e.target;

    if (type === "text" || type === "password") {
      const { bottom, left } = e.target.getBoundingClientRect();

      setTop(e.target.offsetTop + bottom + 1);
      setLeft(left);
    }
    if (!className.includes("hg-button")) {
      setIsComponentVisible(prev =>
        ["text", "password"].indexOf(type) < 0 ? false : true
      ); // check if clicked outside, must not show the keyboard, so set the  `isComponentVisible=false `
    }
    console.log("classNameclassName", isComponentVisible);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return {
    topPos,
    setTop,
    setLeft,
    leftPos,
    keyboard,
    isComponentVisible,
    setIsComponentVisible
  };
}

/*  
Let Component 
*/

const LeftContent = (props: any) => {
  const { t } = useTranslation();
  const {
    topPos,
    leftPos,
    keyboard,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false);
  console.log("____type_in1", isComponentVisible);

  const [checked, setKeyboardActive] = useState(false);
  const { inputBox, root, keyboardStyle }: any = useStyles({
    checked,
    topPos,
    leftPos
  });

  const [values, setValues] = React.useState<State>({
    username: "",
    password: "",
    showPassword: false,
    showKeyboard: false
  });
  const [openError, setOpenError] = React.useState(false);
  // const [textFocus, setFocus] = React.useState(false);
  const { history } = props;
  const [activeText, setCurrentState] = useState();

  // const resetKeyboard = ()=>{

  //   // if (!className.includes("hg-button")) {

  //   console.log("Blurrrrrrr ");
  //   setTop(-1000)
  //   setLeft(-1000)
  //   }
  // }

  const onChangeInput = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("onchange ", event);

    setCurrentState(prop);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleOnFocus = (input: any) => {
    setCurrentState(input);
    console.log("root ", root);
    console.log("keyboardStyle ", keyboardStyle);
  };

  const changeAt = (event: any) => {
    setValues({ ...values, [activeText]: event });
  };

  const handleBack = () => {
    history.push("/mobileinfo");
  };

  const handlePreSignin = () => {
    if (values.username === "demo" && values.password === "demo") {
      props.handleNextStep();
    } else {
      setOpenError(true);
    }
  };

  const handleSwitchChange = () => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeyboardActive(event.target.checked);
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
  console.log("____risComponentVisible_", isComponentVisible);
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

            <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
              <Box mt={2}>
                <Caption>{t("account.prelogin.desc")}</Caption>
              </Box>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                <FormGroup>
                  <FormControl className={inputBox}>
                    <TextField
                      id="username"
                      autoComplete="off"
                      error={openError}
                      autoFocus={true}
                      value={values.username}
                      label={t("common.label.username")}
                      aria-describedby={t("common.label.username")}
                      onChange={(e: any) => {
                        if (checked) {
                          return;
                        } else {
                          onChangeInput("username");
                        }
                      }}
                      onFocus={() => {
                        handleOnFocus("username");
                        setIsComponentVisible(true);
                      }}
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
                      autoComplete="off"
                      id="password"
                      error={openError}
                      label={t("common.label.password")}
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={(e: any) => {
                        if (checked) {
                          return;
                        } else {
                          onChangeInput("password");
                        }
                      }}
                      onFocus={() => {
                        handleOnFocus("password");
                        setIsComponentVisible(true);
                      }}
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
                    {console.log("inside switch ", checked)}
                    <FormControlLabel
                      control={
                        <Switch
                          checked={checked}
                          variant="ios"
                          onChange={handleSwitchChange()}
                          value="showKeyboard"
                        />
                      }
                      label={t("login.keyboard")}
                    />
                  </Box>
                </FormGroup>
              </Grid>
            </Grid>
          </Box>
          {console.log("____isComponentVisible", isComponentVisible, checked)}

          <div style={keyboardStyle}>
            {isComponentVisible && checked && (
              <Keyboard keyboard={keyboard} onChange={changeAt} />
            )}
          </div>
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
