import React from "react";
import {
  User,
  Group,
  Lock,
  QuestionCircle,
  FileText,
  ChartUpward
} from "@mashreq-digital/webassets";

export const pages = [
  {
    title: "Personal Details",
    href: "/personl",
    icon: <User />
  },
  {
    title: "Preferences",
    href: "/preferences",
    icon: <ChartUpward />
  },
  {
    title: "Beneficiaries",
    href: "/beneficiaries",
    icon: <Group />,
    subMenu: [
      {
        title: "Bill Payment Beneficiaries",
        href: "/beneficiaries/billpayment"
      },
      {
        title: "Money Transfer Beneficiaries",
        href: "/beneficiaries/moneytransfer"
      }
    ]
  },
  {
    title: "Security & Settings",
    href: "/settings",
    icon: <Lock />
  },
  {
    title: "Help & Support",
    href: "/help",
    icon: <QuestionCircle />
  },
  {
    title: "Terms & Conditions",
    href: "/terms",
    icon: <FileText />
  }
];
