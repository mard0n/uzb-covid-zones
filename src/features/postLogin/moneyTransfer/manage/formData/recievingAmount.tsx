import i18n from "../../../../../config/i18n";
import { RegEx } from "../../../../../util/RegEx";
import { replaceStr } from "../../../../../util/helper";

const amountFeild = {
  fields: {
    customAmount: {
      config: {
        inputProps: {
          minLength: 0,
          maxLength: 10
        },
        required: false,
        value: "",
        helperText: "",
        label: "Recieving amount"
      },
      validation: {
        onChangeRegex: RegEx.NUMERIC_ONLY,
        schema: [
          {
            regEx: replaceStr(
              replaceStr(RegEx.NUMERIC_LIMIT, "min", 0),
              "max",
              10
            ),
            errorCode: replaceStr(
              replaceStr(
                i18n.t("beneficiary.manage.errors.minMaxLength"),
                "--min--",
                0
              ),
              "--max--",
              10
            )
          }
        ]
      },
      valid: false,
      touched: false
    }
  }
};

export default amountFeild;