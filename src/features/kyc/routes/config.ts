import {initialCondition} from './conditions';
import DummyComponent from '../DummyComponent';
import { TRouteConfig } from '../interface';
import Kyc from '..';

const routeConfigs: TRouteConfig = [
{
    component: DummyComponent,
    path: '/kyc',
    routes: [
      {
        path: '/kyc/login',
        ...initialCondition,
        exact: true,
        component: DummyComponent,
        nextRoute: '/kyc/profile'
      },
      { // this should be equivalent to current profile page and default route
        path: '/kyc/profile',
        exact: true,
        ...initialCondition,
        component: DummyComponent,
        nextRoute: '/kyc/entity/verify'      
      },
      {
        path: '/kyc/employment',
        component: DummyComponent,
        routes: [
          {
            path: '/kyc/employment/verify',
            component: DummyComponent,
            nextRoute: '/kyc/entity/verify'      
          }
        ],
      },
      {
        path: '/kyc/entity',
        component: DummyComponent,
        routes: [
          {
            path: '/kyc/entity/verify',
            component: DummyComponent,
            nextRoute: '/kyc/income/verify'      
          }
        ],
      },
      {
        path: '/kyc/income',
        component: DummyComponent,
        routes: [
          {
            path: '/kyc/income/employementIncome',
            component: DummyComponent,
            nextRoute: '/kyc/income/updateNotAvailable'      
          },
          {
            path: '/kyc/income/updateNotAvailable',
            component: DummyComponent,
          },
          {
            path: '/kyc/income//selfEmployedIncome',
            component: DummyComponent,
          },
        ],
      },
      {
        path: '/kyc/business',
        component: DummyComponent,
        routes: [
          {
            path: '/kyc/business/verifyIndustry',
            component: DummyComponent
          }
        ],
      },  
      {  // this flow is hardcoded
        path: '/kyc/wealth',
        component: DummyComponent,
        routes: [
          {
            path: '/kyc/wealth/netWorth',
            component: DummyComponent
          },
          {
            path: '/kyc/wealth/assetDeclaration',
            component: DummyComponent
          },
          {
            path: '/kyc/wealth/incomeSource',
            component: DummyComponent
          }
        ],
      },  
      {
        path: '/kyc/document',
        component: DummyComponent,
        routes: [
          {
            path: '/kyc/document/verifyResidency',
            component: DummyComponent
          },
          {
            path: '/kyc/document/passport',
            component: DummyComponent
          },
          {
            path: '/kyc/document/eid',
            component: DummyComponent
          },
          {
            path: '/kyc/document/updateAddress', // not part of wealth
            component: DummyComponent
          },
        ],
      },
      ]
  }
]
export default routeConfigs;