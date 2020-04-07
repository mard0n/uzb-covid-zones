import i18n from "../../../../../../config/i18n";
import { RegEx } from "../../../../../../util/RegEx";
import { replaceStr } from "../../../../../../util/helper";

const prepaid = {
  fields: {
    accountNumber: {
      config: {
        inputProps: {
          minLength: 0,
          maxLength: 10
        },
        required: true,
        value: "",
        helperText: replaceStr(i18n.t("common.hintText.mobileNumber"), "--No--", "10"),
        label: replaceStr(i18n.t("common.label.enterMobileNo"), "--type--", "du prepaid")
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
      }
    }
  }
};

export default prepaid;
