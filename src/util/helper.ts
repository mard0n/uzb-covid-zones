export const replaceStr = (
  originalStr: string,
  matchString: any,
  replacebleString: any
) => {
  if (originalStr && matchString && replacebleString) {
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