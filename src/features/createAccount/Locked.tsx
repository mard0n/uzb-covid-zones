import React from "react";
import {
  H2,
  Switch,
  FormControlLabel,
  Button,
  makeStyles,
  Caption,
  Grid,
  Box,
  SectionSplitter,
  SubMain,
  Timer
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";

interface State {
  notify: Boolean;
}

const useStyles = makeStyles(theme => ({
  signinButton: {
    width: theme.spacing(20.8)
  }
}));

const LeftContent = (props: any) => {
  const { t } = useTranslation();
  const { signinButton } = useStyles();

  const [values, setValues] = React.useState<State>({
    notify: false
  });
  const { history, tryAgain } = props;

  const handleTryAgain = () => {
    // window.location.reload();
    history.push("/account/authentication");
  };

  const handleSwitchChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.target.checked });
  };

  return (
    <SectionSplitter
      top={
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <Box mt={20}>
            <H2>{t("account.authentication.locked.title")}</H2>
            <Grid xs={8} sm={8} md={8} lg={8} xl={8}>
              <Box mt={2.5}>
                <Caption>{t("account.authentication.locked.desc")}</Caption>
              </Box>
            </Grid>
            <Box ml={3} mt={3}>
              <FormControlLabel
                control={
                  <Switch
                    // checked={values.notify}
                    variant="ios"
                    size="small"
                    onChange={handleSwitchChange("notify")}
                    value="showKeyboard"
                  />
                }
                label={t("account.authentication.locked.nofity")}
              />
            </Box>
          </Box>
        </Grid>
      }
      bottom={
        <Box display="flex" justifyContent="flex-end">
          <Button
            className={signinButton}
            variant="contained"
            size="medium"
            color="primary"
            disabled={!tryAgain}
            onClick={handleTryAgain}
          >
            {t("common.action.tryAgain")}
          </Button>
        </Box>
      }
      borderTop={true}
    />
  );
};

const Locked = (props: any) => {
  const [tryAgain, EnableTryAgain] = React.useState(false);

  const handleTimerUpdate = (time: any) => {
    if (time === 1) {
      console.log("unlock it is ", time);
      EnableTryAgain(true);
    }
  };

  return (
    <SubMain
      content={<LeftContent {...props} tryAgain={tryAgain} />}
      image={
        <Box
          mt={20}
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <Timer
            {...props}
            initialMsg="Locked"
            finishMsg="Unlocked!"
            minutes={0.1}
            handleTimerUpdate={handleTimerUpdate}
          />
        </Box>
      }
    />
  );
};
export default Locked;
