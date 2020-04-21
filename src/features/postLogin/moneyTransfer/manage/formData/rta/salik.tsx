import i18n from "../../../../../../config/i18n";
import { RegEx } from "../../../../../../util/RegEx";
import { replaceStr } from "../../../../../../util/helper";

const salik = {
  type: "salik",
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
        label: replaceStr(
          i18n.t("common.label.enterMobileNo"),
          "--type--",
          "Salik"
        )
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
    },
    pincode: {
      config: {
        type: 'password',
        inputProps: {
          maxLength: 4
        },
        required: true,
        value: "",
        helperText: "common.label.pincode",
        label: replaceStr(
          i18n.t("common.label.enterCode"),
          "--type--",
          "Salik PIN"
        )
      },
      validation: {
        onChangeRegex: RegEx.NUMERIC_ONLY,
        schema: [
          {
            regEx: replaceStr(
              replaceStr(RegEx.NUMERIC_LIMIT, "min,", ''),
              "max",
              4
            ),
            errorCode: replaceStr(
              replaceStr(
                i18n.t("beneficiary.manage.errors.maxLength"),
                "--min--",
                ''
              ),
              "--max--",
              4
            )
          }
        ]
      },
      valid: false,
      touched: false
    }
  }
};

export default salik;
