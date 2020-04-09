export const replaceStr = (
  originalStr: string,
  matchString: any,
  replacebleString: any
) => {
  if (originalStr && typeof matchString  !== "undefined" && typeof replacebleString !== "undefined") {
    return originalStr.replace(matchString, replacebleString);
  }
  return originalStr;
};

export const trimLowerCaseStr = (str: string) => {
  if (str) {
    return str.replace(/ +/g, "").toLowerCase();
  }
  return str;
};


export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/* pass serviceTypeCode and get the below values
  - etisalat => etisalat-landline, etisalat-prepaid, etisalat-postpaid
  - du => du-prepaid-mobile, du-postpaid-mobile, du-postpaid-landline, du-elife
*/
export const getServiceTypes = (value: string) => {
  switch (true) {
    case (value.indexOf('etisalat') > -1) :
      return 'etisalat';
    case (value.indexOf('du') > -1 ):
      return 'du';
    default :
      return value;
  }
 
}