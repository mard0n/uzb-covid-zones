import {initialCondition} from './routingConditions';
import DummyComponent from '../DummyComponent';
import { TRouteConfig } from '../interface';
import Kyc from '../Kyc';

const routeConfigs: TRouteConfig = {
  '/kyc' : {
    component: Kyc,
    path: '/kyc',
    routes: [
      { // this should be equivalent to current profile page and default route
        path: '/profile',
        ...initialCondition,
        component: DummyComponent
      },
      {
        path: '/employment',
        component: DummyComponent,
        routes: [
          {
            path: '/verify',
            component: DummyComponent,
            nextRoute: '/entity/verify'      
          }
        ],
      },
      {
        path: '/entity',
        component: DummyComponent,
        routes: [
          {
            path: '/verify',
            component: DummyComponent,
            nextRoute: '/entity/verify'      
          }
        ],
      },
      {
        path: '/income',
        component: DummyComponent,
        routes: [
          {
            path: '/employement',
            component: DummyComponent,
            nextRoute: '/updateNotAvailable'      
          },
          {
            path: '/updateNotAvailable',
            component: DummyComponent,
          },
          {
            path: '/selfEmployed',
            component: DummyComponent,
          },
        ],
      },
      {
        path: '/business',
        component: DummyComponent,
        routes: [
          {
            path: '/verifyIndustry',
            component: DummyComponent
          }
        ],
      },  
      {  // this flow is hardcoded
        path: '/wealth',
        component: DummyComponent,
        routes: [
          {
            path: '/netWorth',
            component: DummyComponent
          },
          {
            path: '/assetDeclaration',
            component: DummyComponent
          },
          {
            path: '/incomeSource',
            component: DummyComponent
          }
        ],
      },  
      {
        path: '/document',
        component: DummyComponent,
        routes: [
          {
            path: '/verifyResidency',
            component: DummyComponent
          },
          {
            path: '/passport',
            component: DummyComponent
          },
          {
            path: '/eid',
            component: DummyComponent
          },
          {
            path: '/updateAddress', // not part of wealth
            component: DummyComponent
          },
        ],
      },
      ]
    }
  }

export default routeConfigs;