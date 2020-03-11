import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteConfig } from '../../router';
import DetailedView from './billPayment/manage/DetailedView';
import BillPayment from './billPayment/';
import AddBillPayment from './billPayment/manage/AddBillPayment';
import * as RoutePath from '../../router/config';
import { Main, Box, Drawer, makeStyles, createStyles } from '@mashreq-digital/ui';
import SideDrawer from '../sidebar';

const routes: any = [
  {
    path: RoutePath.BENIFICIARY_BILL_PAYMENT,
    component: BillPayment
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

const drawerWidth = 300;

const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paperAnchorDockedLeft" : {
        width: drawerWidth,
      }
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1
    },
  }),
);

const Beneficiaries = () => {
  const classes = useStyles();
  return (
    <Box display="flex">
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
    <Main 
      main={
        <Box mx={3.5}>
          <Switch>
          {routes.map((route: any, i: number) => {
            return <RouteConfig key={i} {...route} />;
          })}
        </Switch>
        </Box>
        }
    />
    </Box>
  );
}

export default Beneficiaries;



