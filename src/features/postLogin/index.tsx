import React from "react";
import { Switch } from "react-router-dom";
import { RouteConfig } from "../../router";
import BillPayment from "./beneficiaries/billPayment";
import BillPayments from "./billpayment";
import * as RoutePath from "../../router/config";
import {
  Box
} from "@mashreq-digital/ui";

const routes: any = [
  {
    path: RoutePath.BENIFICIARY_BILL_PAYMENT,
    component: BillPayment
  },
  {
    path: RoutePath.BILL_PAYMENTS,
    component: BillPayments
  }
];

const PostLogin = () => {
  return (
    <Box mb={8.5}>
      <Box pl={30} py={5} pr={10}>
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
