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
  Avatar,
  FormGroup,
  FormControl
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
    let reg = /^$|^(\s*|\d+)$/;
    console.log("event.target.value ", event.target.value);
    console.log(
      "event.target.value.match(reg) ",
      event.target.value.match(reg)
    );

    if (event.target.value.match(reg) != null) {
      setValues({ ...values, [prop]: event.target.value });
    }
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
              <Caption>
                {t("mobileinfo.tipstitle")}
                <b> {t("mobileinfo.boldpart")}</b>
                {t("mobileinfo.message6")}
              </Caption>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                <FormGroup>
                  <Box mt={3}></Box>
                  <FormControl>
                    <TextField
                      label={t("common.label.mobileNumber")}
                      id="mobile-number"
                      autoFocus={true}
                      type="tel"
                      value={values.number}
                      variant="filled"
                      onChange={handleChange("number")}
                      inputProps={{
                        "aria-label": t("common.label.mobileNumber"),
                        maxLength: 9
                      }}
                    />
                  </FormControl>
                </FormGroup>
              </Grid>
              <Box
                mt={15}
                pt={2}
                display="flex"
                borderColor="rgba(151, 151, 151, 0.2)"
              >
                <Avatar>
                  <SvgIcon component={Shield} />
                </Avatar>

                <Box ml={3}>
                  <H4> {t("login.ensure")} </H4>
                  <Caption> {t("login.securityTips")}</Caption>
                  <Button size="small" color="primary">
                    {t("common.action.rm")}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Grid>
      }
      bottom={
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Caption>
            {t("account.personalinfo.new") + "  "}
            <Button color="primary" to="#" component={Link}>
              <u> {t("common.action.signup")} </u>
            </Button>
          </Caption>

          <Button
            size="medium"
            onClick={handelSubmit}
            variant="contained"
            color="primary"
            disabled={!(values.number.length === 9)}
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
