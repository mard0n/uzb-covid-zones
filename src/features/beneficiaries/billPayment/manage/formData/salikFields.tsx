import i18n from "../../../../../config/i18n";
import { RegEx } from "../../../../../util/RegEx";
import { replaceStr } from "../../../../../util/helper";

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
        label: "SALIK" + i18n.t("common.label.pincode")
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
        helperText: "beneficiary.manage.addEdit.helperText.nickName",
        label: "common.label.nickName"
      },
      validation: {
      //  onChangeRegex: RegEx.ALPHA_NUMERIC_SPL_CHARS_ONLY,
        schema: [
          {
            regEx: replaceStr(
              RegEx.ALPHA_NUMERIC_SPL_CHARS_ONLY,
              "splChars",
              "@_#&-"
            ),
            errorCode: "beneficiary.manage.errors.nickName"
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
                2
              ),
              "max",
              10
            ),
            errorCode: replaceStr(
              replaceStr(
                i18n.t("beneficiary.manage.errors.minMaxLength"),
                "--min--",
                2
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

export default salik;
