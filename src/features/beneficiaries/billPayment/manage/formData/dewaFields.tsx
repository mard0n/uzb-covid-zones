import { RegEx } from "../../../../../util/RegEx";
import { replaceStr } from "../../../../../util/helper";

const dewa = {
  type: "dewa",
  apicode: "utility_services_dewa",
  fields: {
    accountNumber: {
      config: {
        minLength: 9,
        maxLength: 10,
        value: "",
        required: true,
        helperText: "common.label.accountNumber",
        label: "common.label.accountNumber"
      },
      validation: {
        onChangeRegex: RegEx.NUMERIC_ONLY,
        schema: [
          {
            regEx: replaceStr(
              replaceStr(RegEx.NUMERIC_LIMIT, "min", 9),
              "max",
              10
            ),
            errorCode: "beneficiary.manage.errors.onlyNumbers"
          }
        ]
      },
      valid: false,
      touched: false
    },
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
            regEx: replaceStr(
              RegEx.ALPHA_NUMERIC_SPL_CHARS_ONLY,
              "splChars",
              "@_#&-"
            ),
            errorCode: "beneficiary.manage.errors.onlyNumbers"
          },
          {
            regEx: replaceStr(
              replaceStr(
                replaceStr(
                  RegEx.ALPHA_NUMERIC_SPL_CHARS_LIMIT,
                  "splChars",
                  "@_#&-"
                ),
                "min",
                9
              ),
              "max",
              10
            ),
            errorCode: "beneficiary.manage.errors.minMaxLength"
          }
        ]
      },
      valid: false,
      touched: false
    }
  }
};

export default dewa;
