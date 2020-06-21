import React from "react";
import {
  TextField,
  H5,
  Box,
  Input,
  InputLabel,
  FormControl,
  makeStyles,
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";

export interface ExpiryDateInputProps {
  expDate: any;
  expDateError: any;
  handleExpDateChange: any;
}

const InputMasked = (props: any) => {
  const { inputRef, onChange, ...other } = props;

  function limit(val: any, max: any) {
    if (val.length === 1 && val[0] > max[0]) {
      val = "0" + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = "01";

        //this can happen when user paste number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  }

  function cardExpiry(val: any) {
    let month = limit(val.substring(0, 2), "12");
    let year = val.substring(2, 4);
    return month + (month.length === 2 ? "/" : "") + year;
  }
  console.log("other", other);

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values: any) => {
        console.log("values", values);
        onChange(values.formattedValue);
      }}
      // format="##/##"
      format={cardExpiry}
      placeholder="MM/YY"
    />
  );
};
// const InputMasked = (props: any) => {
//   const { inputRef, ...other } = props;
//   return (
//     <MaskedInput
//       {...other}
//       ref={(ref) => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//       mask={[/[0-3]/, /[0-9]/, "/", /2/, /0/, /[0-9]/, /[0-9]/]}
//       // placeholderChar={"Enter a phone number"}
//       guide={true}
//       keepCharPositions={true}
//       showMask
//     />
//   );
// };

const ExpiryDateInput: React.SFC<ExpiryDateInputProps> = (props) => {
  const { expDate, expDateError, handleExpDateChange } = props;
  const { t } = useTranslation();
  return (
    <>
      <Box mb={1}>
        <H5>{t("cards.cardActivation.init.input.title")}</H5>
      </Box>
      <TextField
        label={"Expiry Date"}
        value={expDate}
        error={expDateError}
        helperText={expDateError}
        onChange={(value: any) => handleExpDateChange(value)}
        InputProps={{
          inputComponent: InputMasked,
        }}
        fullWidth
      />
      {/* <FormControl>
          <InputLabel htmlFor="formatted-text-mask-input">
            react-text-mask
          </InputLabel>
          <Input
            value={expDate}
            onChange={(e) => handleExpDateChange(e.target.value)}
            name="textmask"
            id="formatted-text-mask-input"
            inputComponent={InputMasked}
          /> */}

      {/* <TextInputMask // TODO: TextInput change to core input
        // {...props}
        type={"datetime"}
        options={{
          format: "MM/YY",
        }}
        value={expDate}
        onChangeText={(date: any) => {
          console.log("date", date);
        }}
        >
         {() => (
          <TextField
            label={"Expiry Date"}
            fullWidth={true}
            error={expDateError}
          />
        )}
    </TextInputMask> */}
      {/* </FormControl> */}
    </>
  );
};

export default ExpiryDateInput;
