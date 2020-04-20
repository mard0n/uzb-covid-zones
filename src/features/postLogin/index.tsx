import React from "react";
import { Switch } from "react-router-dom";
import { RouteConfig } from "../../router";
import BillPayment from "./beneficiaries/billPayment";
import BillPayments from "./billpayment";
import * as RoutePath from "../../router/config";
import {
  Box, makeStyles, Theme
} from "@mashreq-digital/ui";
import SideDrawer from "../../components/sidebar";
import { globalStyle } from "../../util/constants";
import MoneyTransfer from './moneyTransfer/index';

const { postLogin, sidebarWidth, defaultGutter } = globalStyle;
const routes: any = [
  {
    path: RoutePath.BENIFICIARY_BILL_PAYMENT,
    component: BillPayment
  },
  {
    path: RoutePath.BILL_PAYMENTS,
    component: BillPayments
  },
  {
    path: RoutePath.MONEYTRANSFER,
    component: MoneyTransfer
  },
];

const useStyles = makeStyles((theme: Theme)=>({
  mainLayout: {
    width: `calc( 100vw - ${sidebarWidth}px)`,
    height: "100%",
    overflow: "auto",
    padding: `${theme.spacing(10.6)}px ${defaultGutter}px ${theme.spacing(10.6)}px ${theme.spacing(8)}px`
  }
}))
const PostLogin = () => {
  console.log("postlogin ====== ")
  const { mainLayout } = useStyles();
  return (
    <Box display="flex" height={postLogin.height} mt={`${postLogin.top}px`}>
      <SideDrawer />
      <Box className={mainLayout}>
        <Switch>
          {routes.map((route: any, i: number) => {
            return <RouteConfig key={i} {...route} />;
          })}
        </Switch>
      </Box>
    </Box>
  );
};

export default PostLogin;
