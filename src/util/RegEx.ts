export const RegEx = {
  NUMERIC_ONLY: `^[0-9]+$`,
  NUMERIC_LIMIT: `^[0-9]{${'min'},${'max'}}$`,
  ALPHA_NUMERIC_ONLY: `^[a-zA-Z0-9]+$`,
  ALPHA_NUMERIC_LIMIT: `^[a-zA-Z0-9]{${'min'},${'max'}}$`,
  ALPHA_NUMERIC_SPL_CHARS_ONLY: `^[a-zA-Z0-9${'splChars'}]*$`,
  ALPHA_NUMERIC_SPL_CHARS_LIMIT: `^[a-zA-Z0-9${'splChars'}]{${'min'},${'max'}}$`,
  AMOUNT: `^[0-9.]+$`, //TODO:
};
