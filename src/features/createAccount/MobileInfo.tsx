import React, { useState } from "react";
import {
  H2,
  TextField,
  Button,
  makeStyles,
  Caption,
  Box,
  Grid,
  SectionSplitter,
  SubMain
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";

interface State {
  number: string;
}

const useStyles = makeStyles(theme => ({
  proceedButton: {
    width: theme.spacing(20.8)
  }
}));

const LeftContent = (props: any) => {
  const { t } = useTranslation();
  const { proceedButton } = useStyles();
  console.log(props);

  const { history } = props;

  const handleBack = () => {
    history.push("/login");
  };

  const [isEnableProceed, enableProceed] = useState(false);

  const [values, setValues] = React.useState<State>({
    number: ""
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
    enableProceed(true);
  };

  return (
    <SectionSplitter
      top={
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <Box mt={20}>
            <H2>{t("account.personalinfo.title")}</H2>
            <Box mt={3}>
              <Caption>
                {t("account.personalinfo.descStart")}{" "}
                <b>{t("account.personalinfo.descBold")} </b>.
                {t("account.personalinfo.descEnd")}
              </Caption>
            </Box>
            <Box mt={4.5}>
              <TextField
                label={t("common.label.mobileNumber")}
                id="mobile-number"
                autoFocus={true}
                type="tel"
                variant="filled"
                onChange={handleChange("number")}
                inputProps={{
                  "aria-label": t("common.label.mobileNumber"),
                  maxLength: 9
                }}
              />
            </Box>
          </Box>
        </Grid>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleBack}
            size="medium"
          >
            <span color="primary"> {t("common.action.back")} </span>
          </Button>
          <Button
            className={proceedButton}
            variant="contained"
            size="medium"
            color="primary"
            onClick={props.handleNextStep}
            disabled={!isEnableProceed}
          >
            {t("common.action.proceed")}
          </Button>
        </Box>
      }
      borderTop={true}
    />
  );
};

const MobileInfo = (props: any) => {
  return <SubMain content={<LeftContent {...props} />} image={<Box></Box>} />;
};

export default MobileInfo;
