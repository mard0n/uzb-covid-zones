// import {initialCondition} from './conditions';
import DummyComponent from "../DummyComponent";
import Profile from "../profile/index";
import Login from "../login/Login";
import SalariedEmployment from "../employment/SalariedEmployment";
 //import Kyc from '../';
import { routeConfigType } from "../types";
import UnknownEmploymentView from "../employment/UnknownEmployment";
import SelfEmploymentView from "../employment/SelfEmployment";
import NoEmploymentView from "../employment/NoEmployment";
import EmploymentIncome from "../income/EmploymentIncome";

const routeConfigs: routeConfigType = [
  {
    path: "/kyc/login",
    exact: true,
    component: Login,
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
    component: DummyComponent,
    routes: [
      {
        path: "/kyc/employment/verify",
        component: UnknownEmploymentView,
        condition: () => ({ nextRoute: "/kyc/entity/verify" })
      },
      {
        path: "/kyc/employment/salaried",
        component: SalariedEmployment,
        routes : [
          {
            path: "/kyc/employment/salaried/verify",
            component: UnknownEmploymentView,
            condition: () => ({ nextRoute: "/kyc/entity/verify" })
          },
          {
            path: "/kyc/employment/salaried/income",
            component: EmploymentIncome,
            condition: () => ({ nextRoute: "/kyc/entity/verify" })
          }
        ]
      },
      {
        path: "/kyc/employment/selfEmployed",
        component: SelfEmploymentView,
        routes : [
          {
            path: "/kyc/employment/selfEmployed/verify",
            component: UnknownEmploymentView,
            condition: () => ({ nextRoute: "/kyc/entity/verify" })
          },
          {
            path: "/kyc/employment/selfEmployed/income",
            component: DummyComponent,
            condition: () => ({ nextRoute: "/kyc/entity/verify" })
          }
        ]
      },
      {
        path: "/kyc/employment/unemployed",
        component: NoEmploymentView,
        routes : [
          {
            path: "/kyc/employment/unemployed/verify",
            component: UnknownEmploymentView,
            condition: () => ({ nextRoute: "/kyc/entity/verify" })
          },
          {
            path: "/kyc/employment/unemployed/income",
            component: DummyComponent,
            condition: () => ({ nextRoute: "/kyc/entity/verify" })
          }
        ]  
      },
      {
        path: "/kyc/employment/unknown",
        component: UnknownEmploymentView,
        routes : [
          {
            path: "/kyc/employment/unknown/verify",
            component: DummyComponent,
            condition: () => ({ nextRoute: "/kyc/entity/verify" })
          },
          {
            path: "/kyc/employment/unknown/income",
            component: DummyComponent,
            condition: () => ({ nextRoute: "/kyc/entity/verify" })
          }
        ] 
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
  // TODO: Can be removed 
  //{ 
  //   path: "/kyc/income",
  //   component: DummyComponent,
  //   routes: [
  //     {
  //       path: "/kyc/income/employementIncome",
  //       component: DummyComponent,
  //       nextRoute: "/kyc/income/updateNotAvailable"
  //     },
  //     {
  //       path: "/kyc/income/updateNotAvailable",
  //       component: DummyComponent
  //     },
  //     {
  //       path: "/kyc/income/selfEmployedIncome",
  //       component: DummyComponent
  //     }
  //   ]
  // },
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
