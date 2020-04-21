import { RegEx } from "../../../../../util/RegEx";
import { replaceStr } from "../../../../../util/helper";
import i18n from '../../../../../config/i18n';

const salikPincodeFields = {
  type: "salik",
  fields: {
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

export default salikPincodeFields;