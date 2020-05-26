import i18n from "i18next";

export const TELECOM_SERVICE_TYPE_CODE: any = {
  "etisalat-prepaid": "Prepaid",
  "etisalat-postpaid": "Postpaid",
  "du-pospaid-mobile": "Postpaid",
  "du-prepaid-mobile": "Prepaid",
  "etisalat-elife": "Elife",
  "etisalat-landline": "Landline",
};

export const withinMashreq = "within-mashreq";

/* Context API */
export const RESET_ERROR = "RESET_ERROR";

/* Layout Styles */
const style = {
  header: 88, //minHeight
  footer: 56, //minHeight
};
export const globalStyle: any = {
  ...style,
  defaultGutter: 84, //padding - left and right
  sidebarWidth: 360, //width,
  postLogin: {
    height: `calc(100vh - ${style.header + style.footer + 2}px)`, // added 2 because of  header & footer border
    top: style.header + 1, // added 1 because of  header border
  },
  logo: {
    height: 40,
    width: 80,
  },
};

export const MONEY_TRANSFER_BENI_FILTER = [
  {
    label: "All",
    serviceTypeCode: "all",
  },
  {
    label: "Mashreq",
    serviceTypeCode: "within-mashreq",
  },
  {
    label: "Local",
    serviceTypeCode: "local",
  },
  {
    label: "International",
    serviceTypeCode: "international",
  },
];


export const MONEY_TRANSFER_LOCAL_STEPS = [
  i18n.t(`moneytransfer.steps`),
  i18n.t(`moneytransfer.stepSet`),
  i18n.t(`moneytransfer.stepPurpos`),
  i18n.t(`moneytransfer.stepReview`),
  i18n.t(`moneytransfer.stepConfirm`)
];
// i18n.t(`moneytransfer.stepAuth`),
export const MONEY_TRANSFER_INTERNATIONAL_STEPS = [
  i18n.t(`moneytransfer.stepStart`),
  i18n.t(`moneytransfer.stepSet`),
  i18n.t(`moneytransfer.stepPurpos`),
  i18n.t(`moneytransfer.stepReview`),
  i18n.t(`moneytransfer.stepConfirm`)
];


export const MONEY_TRANSFER_WITHIN_MASHREQ_STEPS =[
  i18n.t(`moneytransfer.stepStart`),
  i18n.t(`moneytransfer.stepSet`),
  i18n.t(`moneytransfer.stepReview`),
  i18n.t(`moneytransfer.stepConfirm`)
];
