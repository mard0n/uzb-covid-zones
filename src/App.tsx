import React, { FunctionComponent, useEffect } from "react";
import Routes from "./router";
import { AppProps } from "./types";
import { Footer, Main, Box, Grid } from "@mashreq-digital/ui";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MOLHeader from "./features/header";
import { API } from "./mocks/index";
import * as Endpoints from "./network/Endpoints";
import SidebarNav from "./features/sidebar";

const App: FunctionComponent<AppProps> = (props: any): JSX.Element => {
  const { t } = useTranslation();

  useEffect(() => {
    /* API - Use the below endpoints 
      Posts - get employees list
      Test - example of how mock api works
    */
    // API.get(Endpoints.POSTS).then((val: any) => {
    //   console.log(val, "API Response =======");
    // });
  }, []);

  //   <Grid container>
  //   <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
  //     <SidebarNav />
  //   </Grid>
  //   <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
  //     <Routes />
  //   </Grid>
  // </Grid>

  const footerLinks: Array<string> = t("footer.links", { returnObjects: true });
  const exludePath = new RegExp("account");

  return (
    <Main
      header={<MOLHeader {...props} />}
      main={<Routes />}
      footer={
        <>
          {!exludePath.test(props.match.url) && (
            <Footer>
              <Box display="flex" justifyContent="space-between">
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
          )}
        </>
      }
    />
  );
};

export default withRouter(App);
