import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteConfig } from '../../router';
// import DetailedView from './billPayment/manage/DetailedView';
import BillPayment from './beneficiaries/billPayment';
import BillPayments from './billpayment';
// import AddUpdateBillPayment from './billPayment/manage/addUpdate/AddUpdateBillPayment';
import * as RoutePath from '../../router/config';
import { Main, Box, Drawer, makeStyles, createStyles, Theme } from '@mashreq-digital/ui';
import SideDrawer from '../../components/sidebar';

const routes: any = [
  {
    path: RoutePath.BENIFICIARY_BILL_PAYMENT,
    component: BillPayment
  },
  {
    path: RoutePath.BILL_PAYMENTS,
    component: BillPayments
  },
  // {
  //   path: RoutePath.BENIFICIARY_BILL_PAYMENT_ADD_EDIT,
  //   component: AddUpdateBillPayment
  // }
];

const drawerWidth = 360;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paperAnchorDockedLeft" : {
        width: drawerWidth,
        padding: `${theme?.spacing(6)}px ${theme?.spacing(8)}px`,
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

const PostLogin = () => {
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
      height="calc(100vh - 100px)"
      main={
        <Box pl={30} py={5} pr={10}>
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

export default PostLogin;