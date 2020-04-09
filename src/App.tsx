import React, { FunctionComponent, useEffect } from "react";
import Routes from "./router";
import { AppProps } from "./types";
import { Footer, Main, Box, Drawer, makeStyles, createStyles, Theme } from "@mashreq-digital/ui";
// import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MOLHeader from "./features/header";
import SideDrawer from "./components/sidebar";
// import { API } from "./mocks/index";
// import * as Endpoints from "./network/Endpoints";
// import SidebarNav from "./features/sidebar";

const drawerWidth = 360, drawerHeight="calc(100vh - 51px)";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      height: drawerHeight,
      overflow: "auto",
      flexShrink: 0,
      "& .MuiDrawer-paperAnchorDockedLeft" : {
        width: drawerWidth,
        height: drawerHeight,
        overflow: "auto",
        padding: `${theme?.spacing(6)}px 0px ${theme?.spacing(6)}px ${theme?.spacing(8)}px`,
      }
    },
    footerWithSidebar: {
      "& > .MuiBox-root" : {
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        position: "fixed",
        left: 0,
        bottom: "0px",
        width: "100%",
        zIndex: 1400
      }
    },
    drawerPaper: {
      width: drawerWidth,
      height: drawerHeight,
      overflow: "auto",
    },
    content: {
      flexGrow: 1
    },
  }),
);

const App: FunctionComponent<AppProps> = (props: any): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const currentUrl = props && props.match && props.match.url ? props.match.url : "";
  let sidebarCondition = ["beneficiaries", "billpayment"],
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
  const exludePath = new RegExp("account");

  return (
    <Box display="flex">
      {enableSidebar && 
       <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <SideDrawer />
      </Drawer>
      }
    <Main
      header={<MOLHeader  hasSidebar={enableSidebar} {...props} />}
      main={<Routes />}
      footer={
        <>
          {currentUrl && !exludePath.test(props.match.url) && (
            <Box px={5} className={enableSidebar ? classes.footerWithSidebar : ''}>
            <Footer>
              <Box display="flex" justifyContent="space-between" px={2}>
                <Box>&copy; {t("footer.copy")}</Box>
                <Box>
                  <ul className="list-style-none inline border">
                    {footerLinks.map((list: string, i: number) => (
                      <li key={"footerlist" + i}>{list}</li>
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
