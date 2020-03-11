import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteConfig } from '../../../router';
import DetailedView from './manage/DetailedView';
import AddBillPayment from './manage/AddBillPayment';
import BillPaymentLanding from './landing';
import * as RoutePath from '../../../router/config';

const routes: any = [
  {
    path: RoutePath.BENIFICIARY_BILL_PAYMENT_LANDING,
    component: BillPaymentLanding
  },
  {
    path: RoutePath.BENIFICIARY_BILL_PAYMENT_DETAILED,
    component: DetailedView
  },
  {
    path: RoutePath.BENIFICIARY_BILL_PAYMENT_ADD_EDIT,
    component: AddBillPayment
  }
];

const Beneficiaries = () => {
  return (
    <Switch>
    {routes.map((route: any, i: number) => {
      return <RouteConfig key={i} {...route} />;
    })}
    <Redirect from={RoutePath.BENIFICIARY_BILL_PAYMENT} to={RoutePath.BENIFICIARY_BILL_PAYMENT_LANDING} />
  </Switch>
  );
}

export default Beneficiaries;