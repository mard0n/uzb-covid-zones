import i18n from "../../../../../../config/i18n";
import { RegEx } from "../../../../../../util/RegEx";
import { replaceStr } from "../../../../../../util/helper";

const landline = {
  fields: {
    accountNumber: {
      config: {
        inputProps: {
          minLength: 0,
          maxLength: 8
        },
        required: true,
        value: "",
        helperText: replaceStr(
          i18n.t("common.hintText.mobileNumber"),
          "--No--",
          "8"
        ),
        label: replaceStr(
          i18n.t("common.label.enterMobileNo"),
          "--type--",
          "etisalat landline"
        )
      },
      validation: {
        onChangeRegex: RegEx.NUMERIC_ONLY,
        schema: [
          {
            regEx: replaceStr(
              replaceStr(RegEx.NUMERIC_LIMIT, "min,", ""),
              "max",
              8
            ),
            errorCode: replaceStr(
              i18n.t("beneficiary.manage.errors.maxLength"),
              "--max--",
              8
            )
          }
        ]
      }
    }
  }
};

export default landline;
