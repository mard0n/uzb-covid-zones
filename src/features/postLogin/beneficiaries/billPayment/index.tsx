import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import DetailedView from './manage/DetailedView';
import BillPaymentLanding from './landing';
import * as Actions from "../../../../redux/actions/beneficiary/billPayment/landingActions";
import * as RoutePath from '../../../../router/config';
import { useDispatch } from 'react-redux';
// import AddUpdateBillPayment from './manage/addUpdate/AddUpdateBillPayment';
import { Route } from 'react-router-dom';

const routes: any = [
  {
    path: RoutePath.BENIFICIARY_BILL_PAYMENT_LANDING,
    component: BillPaymentLanding
  },
  {
    path: RoutePath.BENIFICIARY_BILL_PAYMENT_DETAILED,
    component: DetailedView
  },
  // {
  //   path: RoutePath.BENIFICIARY_BILL_PAYMENT_ADD_EDIT,
  //   component: AddUpdateBillPayment
  // }
];


const Beneficiaries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.fetchBillPaymentBeneficiariesRequest());
  }, [dispatch]);

  
  return (
    <Switch>
    {routes.map((route: any, i: number) => {
      return  <Route key={i} path={route.path}>
      <route.component />
    </Route>
      ;
    })}
    <Redirect from={RoutePath.BENIFICIARY_BILL_PAYMENT} to={RoutePath.BENIFICIARY_BILL_PAYMENT_LANDING} />
  </Switch>
  );
}

export default Beneficiaries;