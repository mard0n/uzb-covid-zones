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
              <Box display="flex" alignItems="center">
              <MashreqLogo width="40px" height="25px" />
                {props.match.url === "/login" ? null : (
                  <Box ml={2.5}>
                    <Caption>{activeStepTitle}</Caption>
                  </Box>
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
          <Box>
            <Box style={{float:"left"}}>  
            <Caption> © 2019 Mashreq </Caption>
            </Box>
            <Box style={{float:"right"}}>
              <Caption>
                Requirements | Security | Privacy policy | Service Terms{" "}
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
