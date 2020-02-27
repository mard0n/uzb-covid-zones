import React from "react";
import {
  Header,
  LinearProgressBar,
  Select,
  Box,
  Caption
} from "@mashreq-digital/ui";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { getMashreqLogo } from "@mashreq-digital/webassets";
import { stepsID } from "../../reducers/createAcountReducer";
import i18n from "../../config/i18n";
import { changeLocalization } from "../../actions/globalSetupAction";

const MOLHeader = (props: any) => {
  const { t } = useTranslation();
  const steps = t("account.steps", { returnObjects: true });
  const { activeStep } = useSelector((state: any) => ({
    activeStep: state.createAccount.activeStep
  }));
  const dispatch = useDispatch();

  const handleLanguageChange = (event: any) => {
    let newlang = event.target.value,
      dir = newlang && newlang === "ar" ? "rtl" : "ltr";
    i18n.changeLanguage(newlang);
    dispatch(changeLocalization(dir));
    document.body.setAttribute("dir", dir);
  };

  //update regex for any other path
  const exludePath = new RegExp("account");

  const MashreqLogo = getMashreqLogo();

  return (
    <div>
      <Header
        left={
          <Box display="flex" alignItems="center">
            <MashreqLogo width="40px" height="25px" />
            {!exludePath.test(props.match.url) ? null : (
              <Box ml={2.5}>
                <Caption>{steps[activeStep]}</Caption>
              </Box>
            )}
          </Box>
        }
        right={
          <Box>
            {!exludePath.test(props.match.url) ? (
              <Select native onChange={handleLanguageChange}>
                <option value="er">{t("common.language.english")}</option>
                <option value="ar">{t("common.language.arabic")}</option>
              </Select>
            ) : (
              <Caption>{t("common.links.needHelp")}</Caption>
            )}
          </Box>
        }
      />

      {!exludePath.test(props.match.url) ? null : (
        <LinearProgressBar
          activeStep={activeStep}
          variant="determinate"
          totalStep={stepsID.length - 1}
        />
      )}
    </div>
  );
};

export default MOLHeader;
