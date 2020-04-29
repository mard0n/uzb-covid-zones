export const RegEx = {
  NUMERIC_ONLY: `^[0-9]+$`,
  NUMERIC_LIMIT: `^[0-9]{${'min'},${'max'}}$`,
  ALPHABETS_ONLY: `^[a-zA-Z]+$`,
  ALPHA_NUMERIC_ONLY: `^[a-zA-Z0-9]+$`,
  ALPHA_NUMERIC_LIMIT: `^[a-zA-Z0-9]{${'min'},${'max'}}$`,
  ALPHABETS_SPL_CHARS_ONLY: `^[a-zA-Z${'splChars'}]*$`,
  ALPHA_NUMERIC_SPL_CHARS_ONLY: `^[a-zA-Z0-9${'splChars'}]*$`,
  ALPHABETS_SPL_CHARS_LIMIT: `^[a-zA-Z${'splChars'}]{${'min'},${'max'}}$`,
  ALPHA_NUMERIC_SPL_CHARS_LIMIT: `^[a-zA-Z0-9${'splChars'}]{${'min'},${'max'}}$`,
  SWIFT_CODE: `^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$`,
  AMOUNT: `^[0-9]+(\.[0-9]{1,5})?$`,
};
// ^[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}[XXX0-9]{0,3}
