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