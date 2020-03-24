import React from "react";
import {
  User,
  Home,
  MinusCircle,
  DebitCard,
  Umbrella,
  MoneyPouch,
  BriefcaseMoney,
  Gear3
} from "@mashreq-digital/webassets";
import * as RoutePath from '../../router/config';

export const pages = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home />,
    mt: 7
  },
  {
    title: "Accounts",
    href: "/accounts",
    icon: <MinusCircle />,
    mt: 7
  },
  {
    title: "Credit Cards",
    href: "/creditCards",
    icon: <DebitCard />,
    // subMenu: [
    //   {
    //     title: "Bill Payment Beneficiaries",
    //     href: "/beneficiaries/billpayment"
    //   },
    //   {
    //     title: "Money Transfer Beneficiaries",
    //     href: "/beneficiaries/moneytransfer"
    //   }
    // ]
  },
  {
    title: "Insurance",
    href: "/insurance",
    icon: <Umbrella />
  },
  {
    title: "Mortgage & Loans",
    href: "/mortage",
    icon: <MoneyPouch />
  },
  {
    title: "Investments",
    href: "/investment",
    icon: <BriefcaseMoney />
  },
  {
    title: "Money Transfer",
    href: "/moneytransfer",
    icon: <MinusCircle />,
    mt: 7
  },
  {
    title: "Bill Payments",
    href: RoutePath.BILL_PAYMENTS,
    icon: <MinusCircle />
  },
  {
    title: "Beneficiaries",
    href: RoutePath.BENIFICIARY_BILL_PAYMENT,
    icon: <User />,
    mt: 7
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Gear3 />,
    mt: 6
  }
];
