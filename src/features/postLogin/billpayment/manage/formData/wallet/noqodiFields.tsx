import i18n from "../../../../../../config/i18n";
import { RegEx } from "../../../../../../util/RegEx";
import { replaceStr } from "../../../../../../util/helper";

const noqodi = {
  type: "noqodi",
  fields: {
    accountNumber: {
      config: {
        inputProps: {
          minLength: 8,
          maxLength: 14
        },
        required: true,
        value: "",
        helperText: "common.label.accountNumber",
        label: "common.label.accountNumber"
      },
      validation: {
        onChangeRegex: RegEx.ALPHA_NUMERIC_ONLY,
        schema: [
          {
            regEx: replaceStr(
              replaceStr(RegEx.ALPHA_NUMERIC_LIMIT, "min", 8),
              "max",
              14
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

export default noqodi;
