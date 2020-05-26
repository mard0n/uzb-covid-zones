import i18n from "../../../../../config/i18n";
import { RegEx } from "../../../../../util/RegEx";
import { replaceStr } from "../../../../../util/helper";

const ownBeneficiaryDetails = {
  type: "ownBeneficiaryDetails",
  fields: {
    accountNumber: {
      config: {
        inputProps: {
          minLength: 8,
          maxLength: 12
        },
        required: true,
        value: "",
        helperText: "beneficiary.moneyTransfer.manage.within.beneficiaryDetails.accountNumber.helperText",
        label: "beneficiary.moneyTransfer.manage.within.beneficiaryDetails.accountNumber.label"
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
    nickname: {
      config: {
        type: "text",
        inputProps: {
          minLength: 2,
          maxLength: 50,
          required: true
        },
        value: "",
        helperText: "beneficiary.moneyTransfer.manage.within.beneficiaryDetails.nickName.helperText",
        label: "beneficiary.moneyTransfer.manage.within.beneficiaryDetails.nickName.label"
      },
      validation: {
      //  onChangeRegex: RegEx.ALPHA_NUMERIC_SPL_CHARS_ONLY,
        schema: [
          {
            regEx: replaceStr(
              RegEx.ALPHA_NUMERIC_SPL_CHARS_ONLY,
              "splChars",
              "@_ #&-"
            ),
            errorCode: "beneficiary.manage.errors.nickName"
          },
          {
            regEx: replaceStr(
              replaceStr(
                replaceStr(
                  RegEx.ALPHA_NUMERIC_SPL_CHARS_LIMIT,
                  "splChars",
                  "@_ #&-"
                ),
                "min",
                2
              ),
              "max",
              50
            ),
            errorCode: replaceStr(
              replaceStr(
                i18n.t("beneficiary.manage.errors.minMaxLength"),
                "--min--",
                2
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

export default ownBeneficiaryDetails;
