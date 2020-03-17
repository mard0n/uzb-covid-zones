import i18n from "../../../../../config/i18n";
import { RegEx } from "../../../../../util/RegEx";
import { replaceStr } from "../../../../../util/helper";

const etisalat = {
  type: "etisalat",
  options: ["Prepaid", "Postpaid", "Landline", "eLife"],
  fields: {
    accountNumber: {
      config: {
        inputProps: {
          minLength: 0,
          maxLength: 10
        },
        required: true,
        value: "",
        helperText: "common.label.mobileNumber",
        label: "Etisalat " + i18n.t("common.label.mobileNumber")
      },
      validation: {
        onChangeRegex: RegEx.NUMERIC_ONLY,
        schema: [
          {
            regEx: replaceStr(
              replaceStr(RegEx.NUMERIC_LIMIT, "min,", ""),
              "max",
              10
            ),
            errorCode: replaceStr(
              i18n.t("beneficiary.manage.errors.maxLength"),
              "--max--",
              10
            )
          }
        ]
      },
      prepaid: {
        validation: {
          onChangeRegex: RegEx.NUMERIC_ONLY,
          schema: [
            {
              regEx: replaceStr(
                replaceStr(RegEx.NUMERIC_LIMIT, "min,", ""),
                "max",
                10
              ),
              errorCode: replaceStr(
                i18n.t("beneficiary.manage.errors.maxLength"),
                "--max--",
                10
              )
            }
          ]
        },
      },
      postpaid: {
        validation: {
          onChangeRegex: RegEx.NUMERIC_ONLY,
          schema: [
            {
              regEx: replaceStr(
                replaceStr(RegEx.NUMERIC_LIMIT, "min,", ""),
                "max",
                10
              ),
              errorCode: replaceStr(
                i18n.t("beneficiary.manage.errors.maxLength"),
                "--max--",
                10
              )
            }
          ]
        },
      },
      landline: {
        validation: {
          onChangeRegex: RegEx.NUMERIC_ONLY,
          schema: [
            {
              regEx: replaceStr(
                replaceStr(RegEx.NUMERIC_LIMIT, "min,", ""),
                "max",
                10
              ),
              errorCode: replaceStr(
                i18n.t("beneficiary.manage.errors.maxLength"),
                "--max--",
                10
              )
            }
          ]
        },
      },
      elife: {
        validation: {
          onChangeRegex: RegEx.NUMERIC_ONLY,
          schema: [
            {
              regEx: replaceStr(
                replaceStr(RegEx.NUMERIC_LIMIT, "min,", ""),
                "max",
                10
              ),
              errorCode: replaceStr(
                i18n.t("beneficiary.manage.errors.maxLength"),
                "--max--",
                10
              )
            }
          ]
        },
      },
      valid: false,
      touched: false
    },
    nickname: {
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

export default etisalat;
