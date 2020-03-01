import React from "react";
import {
  H1,
  TextField,
  Button,
  makeStyles,
  Caption,
  H4,
  Box,
  SectionSplitter,
  SubMain,
  Grid,
  UnderlineText,
  SvgIcon,
  Avatar
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Shield } from "@mashreq-digital/webassets";

let landing = require("../../assets/images/landing.png");

interface State {
  number: string;
  showKeyboard: Boolean;
}

const useStyles = makeStyles(theme => ({
  backgroundImg: {
    backgroundImage: `url(${landing})`,
    backgroundSize: "cover",
    backgroundPosition: "100%"
  }
}));
const LeftContent = (props: any) => {
  const { t } = useTranslation();
  const { history } = props;

  // const [isEnableProceed, enableProceed] = React.useState<State>(false);

  const [values, setValues] = React.useState<State>({
    number: "",
    showKeyboard: false
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  let handelSubmit = () => {
    if (values.number === "111111111") {
      console.log("demo for migrated user enter username and password");
      history.push("/account/personalinfo");
    } else {
      console.log("demo for migrated user enter username and password");
      history.push("/account/personalinfo");
    }
  };
  return (
    <SectionSplitter
      top={
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
          <Box mt={10}>
            <UnderlineText color="primary">
              <H1>{t("login.title")}</H1>
            </UnderlineText>
            <Box mt={8}></Box>
            <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
              <Caption> {t("mobileinfo.tipstitle")}</Caption>

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
              <Box ml={3}></Box>
              <Box
                mt={8}
                pt={2}
                borderTop={1}
                borderColor="rgba(151, 151, 151, 0.2)"
              >
                <Avatar>
                  {" "}
                  <SvgIcon component={Shield} />
                </Avatar>

                <H4> {t("login.ensure")} </H4>
                <Caption> {t("login.securityTips")}</Caption>
              </Box>
            </Grid>
          </Box>
        </Grid>
      }
      bottom={
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Caption>
            {t("account.personalinfo.new") + "  "}
            <Link to={`#`} color="primary">
              {t("common.action.signup")}
            </Link>
          </Caption>

          <Button
            size="medium"
            onClick={handelSubmit}
            variant="contained"
            color="primary"
          >
            {t("common.action.started")}
          </Button>
        </Box>
      }
      borderTop={true}
    />
  );
};

const MobileNumber = (props: any) => {
  const { backgroundImg } = useStyles();
  return (
    <SubMain
      content={<LeftContent {...props} />}
      image={<Box width="100%" height="100%" className={backgroundImg}></Box>}
    />
  );
};
export default MobileNumber;
