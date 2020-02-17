import React, { FunctionComponent } from "react";
import Routes from "./router";
import { AppProps } from "./types";
import {
  Footer,
  Copyright,
  Main,
  Header,
  LinearProgressBar,
  Select,
  Box,
  Caption
} from "@mashreq-digital/ui";

import { connect } from "react-redux";
import { stepsID } from "./reducers/createAcountReducer";
import { getMashreqLogo } from "@mashreq-digital/webassets";
const App: FunctionComponent<AppProps & { activeStepTitle: string }> = (
  props: any
): JSX.Element => {
  const { activeStep, activeStepTitle } = props;

  console.log("stepsID", stepsID.length);
  console.log("activeStep", activeStep);

  const MashreqLogo = getMashreqLogo();

  return (
    <Main
      header={
        <div>
          <Header
            left={
              <Box>
              <MashreqLogo width="50px" height="25px" />

              {props.match.url === "/homepage" ? null : (
                <Caption>
                  {activeStepTitle}
                </Caption>
              )}
              </Box>
            }
            right={
              <Box>
                {props.match.url === "/login" ? (
                  <Select native onChange={() => {}}>
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                  </Select>
                ) : (
                  <Caption> Need Help ? </Caption>
                )}
              </Box>
            }
          />

          {props.match.url === "/login" ? null : (
            <LinearProgressBar
              activeStep={activeStep}
              variant="determinate"
              totalStep={stepsID.length - 1}
            />
          )}
        </div>
      }
      main={<Routes />}
      footer={
        <Footer>
          <Copyright fontSize="30">
            Copyright &copy; 2019 Mashreq | All Rights Reserved
          </Copyright>
        </Footer>
      }
    />
  );
};

const mapStateToProps = (state: any) => ({
  activeStepTitle: state.preLogin.activeStepTitle,
  activeStep: state.preLogin.activeStep
});

App.defaultProps = {
  activeStepTitle: "default"
};

export default connect(mapStateToProps)(App);
