export const isValidNumeric = (
  value: string,
  min: number = 0,
  max = Number.MAX_SAFE_INTEGER,
) => {
  if (!value) return false;
  const regex = new RegExp(`^[0-9]{${min},${max}}$`);
  return regex.test(value);
};

export const isValidAphaNumberic = (
  value: string,
  min: number = 0,
  max = Number.MAX_SAFE_INTEGER,
) => {
  if (!value) return false;
  const regex = new RegExp(`^[a-zA-Z0-9]{${min},${max}}$`);
  return regex.test(value);
};

export const isValidFloatNumber = (value: any) => {
  if (!value) return false;
  const regex = new RegExp(`^[+-]?([0-9]*[.])?[0-9]+`); 
  console.log('value ', value, regex.test(value), regex);
  return (regex.test(value) && !isNaN(value));

};

export const isValidAphaNumbericSpecial = (
  value: string,
  specialChars: string = '',
  min: number = 0,
  max = Number.MAX_SAFE_INTEGER,
) => {
  if (!value) return false;
  const regex = new RegExp(`^[a-zA-Z0-9${specialChars}]{${min},${max}}$`);
  return regex.test(value);
};

export const execValidation = (validation:any, value:any) => {
  for (let index = 0; index < validation.length; index++) {
    const item = validation[index];
    const {regEx = '', errorMessage = ''} = item;
    // console.log('Validating... ', regEx);
    const regex = new RegExp(regEx);
    // console.log(
    //   'errorMessage ',
    //   errorMessage,
    //   '  regex.test(value)  ',
    //   regex.test(value),
    // );
    const errorMsg = regex.test(value) ? '' : errorMessage;
    // console.log('Validating... value', value, ' ', regex.test(value));
    if (errorMsg) {
      return errorMsg ? errorMsg : '';
    }
  }

  return '';
};

export const isIBan = (accountNumber: string) => {
  const prefix = accountNumber.slice(0, 2);
  const isValid = isValidNumeric(prefix);
  return !isValid;
};
