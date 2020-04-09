import i18n from "../../../../../../config/i18n";
import { RegEx } from "../../../../../../util/RegEx";
import { replaceStr } from "../../../../../../util/helper";

const addc = {
  type: "addc",
  fields: {
    accountNumber: {
      config: {
        inputProps: {
          minLength: 8,
          maxLength: 12
        },
        required: true,
        value: "",
        helperText: "common.label.accountNumber",
        label: "common.label.accountNumber"
      },
      validation: {
        onChangeRegex: RegEx.NUMERIC_ONLY,
        schema: [
          {
            regEx: replaceStr(
              replaceStr(RegEx.NUMERIC_LIMIT, "min", 8),
              "max",
              12
            ),
            errorCode: replaceStr(
              replaceStr(
                i18n.t("beneficiary.manage.errors.minMaxLength"),
                "--min--",
                8
              ),
              "--max--",
              12
            )
          }
        ]
      },
      valid: false,
      touched: false
    }
  }
};

export default addc;
