import React  from 'react';
import i18n from "../../../../../config/i18n";
import { RegEx } from "../../../../../util/RegEx";
import { replaceStr } from "../../../../../util/helper";
import { IconButton } from '@mashreq-digital/ui';

const amountFeildTransfer = {
  fields: {
    customAmount: {
      config: {
        inputProps: {
          minLength: 0,
          maxLength: 10
        },
        endAdornment: (
          <IconButton
            aria-label="Curency symbol"
          >
            USD
          </IconButton>
        ),
        required: false,
        value: "",
        helperText: "",
        label: "Transfer amount"
      },
      endAdornment: (
        <IconButton
          aria-label="Curency symbol"
        >
          USD
        </IconButton>
      ),
      validation: {
        onChangeRegex: RegEx.NUMERIC_ONLY,
        schema: [
          {
            regEx: replaceStr(
              replaceStr(RegEx.NUMERIC_LIMIT, "min", 0),
              "max",
              10
            ),
            errorCode: replaceStr(
              replaceStr(
                i18n.t("beneficiary.manage.errors.minMaxLength"),
                "--min--",
                0
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

export default amountFeildTransfer;