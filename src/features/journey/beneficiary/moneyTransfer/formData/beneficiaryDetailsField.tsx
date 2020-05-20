import i18n from "../../../../../config/i18n";
import { RegEx } from "../../../../../util/RegEx";
import { replaceStr } from "../../../../../util/helper";

const beneficiaryDetails = {
  type: "beneficiaryDetails",
  fields: {
    accountname: {
      config: {
        type: "text",
        inputProps: {
          minLength: 5,
          maxLength: 50,
          required: true
        },
        value: "",
        helperText: "beneficiary.moneyTransfer.manage.local.beneficiaryDetails.accountName.helperText",
        label: "beneficiary.moneyTransfer.manage.local.beneficiaryDetails.accountName.label"
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
                5
              ),
              "max",
              50
            ),
            errorCode: replaceStr(
              replaceStr(
                i18n.t("beneficiary.manage.errors.minMaxLength"),
                "--min--",
                5
              ),
              "--max--",
              50
            )
          }
        ]
      },
      valid: false,
      touched: false
    },
    nickname: {
      config: {
        type: "text",
        inputProps: {
          minLength: 5,
          maxLength: 50,
          required: true
        },
        value: "",
        helperText: "beneficiary.moneyTransfer.manage.local.beneficiaryDetails.nickName.helperText",
        label: "beneficiary.moneyTransfer.manage.local.beneficiaryDetails.nickName.label"
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
                5
              ),
              "max",
              50
            ),
            errorCode: replaceStr(
              replaceStr(
                i18n.t("beneficiary.manage.errors.minMaxLength"),
                "--min--",
                5
              ),
              "--max--",
              50
            )
          }
        ]
      },
      valid: false,
      touched: false
    }
  }
};

export default beneficiaryDetails;
