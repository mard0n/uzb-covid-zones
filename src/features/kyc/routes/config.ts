// import {initialCondition} from './conditions';
import DummyComponent from "../DummyComponent";
import Profile from "../profile/index";
import Employment from "../employment/index";
 //import Kyc from '../';
import { routeConfigType } from "../types";

const routeConfigs: routeConfigType = [
  {
    path: "/kyc/login",
    exact: true,
    component: DummyComponent,
  },
  {
    // this should be equivalent to current profile page and default route
    path: "/kyc/profile",
    exact: true,
    component: Profile,
    condition: () => ({ nextRoute: "/kyc/entity/verify" })
  },
  {
    path: "/kyc/employment",
    component: Employment,
    routes: [
      {
        path: "/kyc/employment/verify",
        component: DummyComponent,
        condition: () => ({ nextRoute: "/kyc/entity/verify" })
      }
    ]
  },
  {
    path: "/kyc/entity",
    component: DummyComponent,
    routes: [
      {
        path: "/kyc/entity/verify",
        component: DummyComponent,
        condition: () => ({ nextRoute: "/kyc/entity/verify" })
      }
    ]
  },
  {
    path: "/kyc/income",
    component: DummyComponent,
    routes: [
      {
        path: "/kyc/income/employementIncome",
        component: DummyComponent,
        nextRoute: "/kyc/income/updateNotAvailable"
      },
      {
        path: "/kyc/income/updateNotAvailable",
        component: DummyComponent
      },
      {
        path: "/kyc/income//selfEmployedIncome",
        component: DummyComponent
      }
    ]
  },
  {
    path: "/kyc/business",
    component: DummyComponent,
    routes: [
      {
        path: "/kyc/business/verifyIndustry",
        component: DummyComponent
      }
    ]
  },
  {
    // this flow is hardcoded
    path: "/kyc/wealth",
    component: DummyComponent,
    routes: [
      {
        path: "/kyc/wealth/netWorth",
        component: DummyComponent
      },
      {
        path: "/kyc/wealth/assetDeclaration",
        component: DummyComponent
      },
      {
        path: "/kyc/wealth/incomeSource",
        component: DummyComponent
      }
    ]
  },
  {
    path: "/kyc/document",
    component: DummyComponent,
    routes: [
      {
        path: "/kyc/document/verifyResidency",
        component: DummyComponent
      },
      {
        path: "/kyc/document/passport",
        component: DummyComponent
      },
      {
        path: "/kyc/document/eid",
        component: DummyComponent
      },
      {
        path: "/kyc/document/updateAddress", // not part of wealth
        component: DummyComponent
      }
    ]
  }
];
export default routeConfigs;
