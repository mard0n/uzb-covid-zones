import React from "react";
import {
  MultipleNeutral2,
  LayoutDashboard,
  CommonFileTextClock,
  DataTransfer,
  AccountingInvoiceHand,
  CogHandGive,
  PhoneActionsQuestion,
  Cog
} from "@mashreq-digital/webassets";
import * as RoutePath from '../../router/config';

export const pages = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
    mt: 5
  },
  {
    title: "Money Transfers",
    href: "/moneytransfer",
    icon: <DataTransfer />,
    mt: 5
  },
  {
    title: "Bill Payments",
    href: RoutePath.BILL_PAYMENTS,
    icon: <AccountingInvoiceHand />
  },
  {
    title: "Services",
    href: "/services",
    icon: <CogHandGive />
  },
  {
    title: "Manage Beneficiary",
    href: RoutePath.BENIFICIARY_BILL_PAYMENT,
    icon: <MultipleNeutral2 />,
    mt: 5
  },
  {
    title: "Transaction Queue",
    href: "/accounts",
    icon: <CommonFileTextClock />
  },
  {
    title: "Settings & Privacy",
    href: "/settings",
    icon: <Cog />,
    mt: 5
  },
  {
    title: "Help & Support",
    href: "/accounts",
    icon: <PhoneActionsQuestion />
  }
];
