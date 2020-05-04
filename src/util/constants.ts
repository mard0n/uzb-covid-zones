export const TELECOM_SERVICE_TYPE_CODE: any = {
  "etisalat-prepaid": "Prepaid",
  "etisalat-postpaid": "Postpaid",
  "du-pospaid-mobile": "Postpaid",
  "du-prepaid-mobile": "Prepaid",
  "etisalat-elife": "Elife",
  "etisalat-landline": "Landline",
};

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
