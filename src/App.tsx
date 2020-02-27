import React, { FunctionComponent, useEffect } from "react";
import Routes from "./router";
import { AppProps } from "./types";
import { Footer, Main, Box } from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import MOLHeader from "./features/header";
import { API } from "./mocks/index";
import * as Endpoints from "./network/Endpoints";

const App: FunctionComponent<AppProps> = (props: any): JSX.Element => {
  const { t } = useTranslation();

  useEffect(() => {
    /* API - Use the below endpoints 
      Posts - get employees list
      Test - example of how mock api works
    */
    API.get(Endpoints.POSTS).then((val: any) => {
      console.log(val, "API Response =======");
    });
  }, []);

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
