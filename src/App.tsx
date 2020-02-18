import React, { FunctionComponent } from "react";
import Routes from "./router";
import { AppProps } from "./types";
import {
  Footer,
  Main,
  Header,
  LinearProgressBar,
  Select,
  Box,
  Caption
} from "@mashreq-digital/ui";
import i18n from "./i18n";
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { stepsID } from "./reducers/createAcountReducer";
import { getMashreqLogo } from "@mashreq-digital/webassets";
const App: FunctionComponent<AppProps & { activeStepTitle: string }> = (
  props: any
): JSX.Element => {
  const { activeStep, activeStepTitle } = props;
  const { t } = useTranslation();

  const MashreqLogo = getMashreqLogo();

  let handleLanguageChange = (event:any) => {
    let newlang = event.target.value;
    i18n.changeLanguage(newlang);
  };

  return (
    <Main
      header={
        <div>
          <Header
            left={
              <Box display="flex" alignItems="center">
              <MashreqLogo width="40px" height="25px" />
                {props.match.url === "/account/*" ? (
                  <Box ml={2.5}>
                    <Caption>{activeStepTitle}</Caption>
                  </Box>
                ): null  }
              </Box>
            }
            right={
              <Box>
                {props.match.url === "/account/" ? (
                  <Caption> Need Help ? </Caption>
                ): (
                  <Select native onChange={handleLanguageChange}>
                    <option value="er">{t("common.language.english")}</option>
                    <option value="ar">{t("common.language.arabic")}</option>
                  </Select>
                ) }
              </Box>
            }
          />

          {props.match.url === "/account/" ? (
            <LinearProgressBar
              activeStep={activeStep}
              variant="determinate"
              totalStep={stepsID.length - 1}
            />
          ) : null
        }
        </div>
      }
      main={<Routes />}
      footer={
        <Footer>
          <Box>
            <Box style={{float:"left"}}>  
            <Caption> {t("Footer.copy")} </Caption>
            </Box>
            <Box style={{float:"right"}}>
              <Caption>
              {t("Footer.link")}
              </Caption>
            </Box>
          </Box>
        </Footer>
      }
    />
  );
};

const mapStateToProps = (state: any) => ({
  activeStepTitle: state.createAccount.activeStepTitle,
  activeStep: state.createAccount.activeStep
});

App.defaultProps = {
  activeStepTitle: "default"
};

export default connect(mapStateToProps)(App);
