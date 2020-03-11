import { RegEx } from "../.../../../../../../util/RegEx";

const sewa = {
  data: "sewa",
  fields: {
    nickName: {
      config: {
        type: "text",
        inputProps: {
          minLength: 2,
          maxLength: 10,
          required: true
        },
        value: "",
        helperText: "common.label.nickName",
        label: "common.label.nickName"
      },
      validation: {
        // onChangeRegex: RegEx.ALPHA_NUMERIC_ONLY,
        schema: [
          {
            regEx: RegEx.NUMERIC_ONLY,
            errorCode: 'beneficiary.manage.errors.onlyNumbers',
          },
          {
            regEx: `^[0-9]{${2},${10}}$`,
            errorCode: 'beneficiary.manage.errors.numberWithMinandMox',
          },
        ]
      },
      valid: false,
      touched: false
    },
    accountNumber: {
      config: {
        // minLength: "",
        maxLength: "",
        value: "",
        helperText: "common.label.accountNumber",
        label: "common.label.accountNumber"
      },
      validation: {
        onChangeRegex: RegEx.NUMERIC_ONLY
      },
      valid: false,
      touched: false
    }
  }
};

export default sewa;
