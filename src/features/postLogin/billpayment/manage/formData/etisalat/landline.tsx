import i18n from "../../../../../../config/i18n";
import { RegEx } from "../../../../../../util/RegEx";
import { replaceStr } from "../../../../../../util/helper";

const landline = {
  fields: {
    accountNumber: {
      config: {
        inputProps: {
          minLength: 0,
          maxLength: 9
        },
        required: true,
        value: "",
        helperText: replaceStr(
          i18n.t("common.hintText.mobileNumber"),
          "--No--",
          "9"
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
              9
            ),
            errorCode: replaceStr(
              i18n.t("beneficiary.manage.errors.maxLength"),
              "--max--",
              9
            )
          }
        ]
      }
    }
  }
};

export default landline;
