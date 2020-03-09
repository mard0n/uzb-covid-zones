import React from "react";
import {
  Apps3,
  ChartUpward,
  ChartSquare,
  Intersect
} from "@mashreq-digital/webassets";

export const pages = [
  {
    title: "Personal Details",
    href: "/personl",
    icon: <Apps3 />
  },
  {
    title: "Preferences",
    href: "/preferences",
    icon: <ChartUpward />
  },
  {
    title: "Beneficiaries",
    href: "/beneficiaries",
    icon: <Intersect />,
    subMenu: [
      {
        title: "Bill Payment Beneficiaries",
        href: "/beneficiaries/billpayment",
        icon: <ChartUpward />
      },
      {
        title: "Money Transfer Beneficiaries",
        href: "/beneficiaries/moneytransfer",
        icon: <ChartUpward />
      }
    ]
  },
  {
    title: "Security & Settings",
    href: "/settings",
    icon: <ChartSquare />
  },
  {
    title: "Help & Support",
    href: "/help",
    icon: <ChartSquare />
  },
  {
    title: "Terms & Conditions",
    href: "/terms",
    icon: <ChartSquare />
  }
];
