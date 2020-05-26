import React, { FunctionComponent, useEffect } from "react";
import Routes from "./router";
import { AppProps } from "./types";
import { Footer, Main, Box, Body2, makeStyles, createStyles, Theme } from "@mashreq-digital/ui";
// import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MOLHeader from "./features/header";
import { globalStyle } from "./util/constants";
// import SideDrawer from "./components/sidebar";
// import { API } from "./mocks/index";
// import * as Endpoints from "./network/Endpoints";
// import SidebarNav from "./features/sidebar";

const { postLogin, footer, defaultGutter } = globalStyle;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerRoot: {
      "& > .MuiBox-root" : {
        minHeight: footer,
        padding: `${theme.spacing(3.6)}px ${defaultGutter}px`,
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        position: "fixed",
        left: 0,
        bottom: "0px",
        width: "100%"
      },
      "& .MuiTypography-body2": {
        fontSize: "0.8125rem",
        lineHeight: "0.8125rem"
      }
    },
    footerWithSidebar: {
      // "& > .MuiBox-root" : {
      //   borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      //   position: "fixed",
      //   left: 0,
      //   bottom: "0px",
      //   width: "100%"
      // }
    },
    // content: {
    //   flexGrow: 1
    // },
  }),
);

const App: FunctionComponent<AppProps> = (props: any): JSX.Element => {
  const { footerRoot, footerWithSidebar } = useStyles();
  const { t } = useTranslation();
  const currentUrl = props && props.match && props.match.url ? props.match.url : "";
  let sidebarCondition = ["dashboard", "beneficiaries", "billpayment","moneytransfer"],
  splitUrl = currentUrl.indexOf("/") > -1 ? currentUrl.split("/") : [],
  enableSidebar = splitUrl && splitUrl.length > 0 ? sidebarCondition.indexOf(splitUrl[1]) > -1 : false;

  useEffect(() => {
    /* API - Use the below endpoints 
      Posts - get employees list
      Test - example of how mock api works
    */
    // API.get(Endpoints.POSTS).then((val: any) => {
    //   console.log(val, "API Response =======");
    // });
  }, []);

  const footerLinks: Array<string> = t("footer.links", { returnObjects: true });
  const exludePath = new RegExp("account/");

  return (
    <Box display="flex">
    <Main
      removeMainGutter={enableSidebar}
      header={<MOLHeader  hasSidebar={enableSidebar} {...props} />}
      main={<Box height={postLogin.height} mt={`${postLogin.top}px`}><Routes /></Box>}
      footer={
        <>
          {currentUrl && !exludePath.test(props.match.url) && (
            <Box px={5} className={`${footerRoot} ${enableSidebar ? footerWithSidebar : ''}`}>
            <Footer>
              <Box display="flex" width="100%" justifyContent="space-between">
                <Box><Body2>&copy; {t("footer.copy")}</Body2></Box>
                <Box>
                {/* border */}
                  <ul className="list-style-none inline">
                    {footerLinks.map((list: string, i: number) => (
                      <li className="footerlist" key={"footerlist" + i}><Body2>{list}</Body2></li>
                    ))}
                  </ul>
                </Box>
              </Box>
            </Footer>
            </Box>
          )}
        </>
      }
    />
    </Box>
  );
};

export default App;
