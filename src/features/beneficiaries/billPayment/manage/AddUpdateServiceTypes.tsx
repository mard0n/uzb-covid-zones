import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton
} from "@mashreq-digital/ui";
import InputWrapper from "../../../../common/inputWrapper";
import { FormFields } from "../../../../features/beneficiaries/billPayment/manage/formData";

const AddUpdateServiceTypes = () => {
  const [type , setType] = useState(FormFields["sewa"]["data"]);
  const [fields, setFields] = useState({});
  const [formData, setFormData] = useState({});
  const [disabled, setDisabled] = useState(true);

  const initFieldProps = () => {
    const formFields: any= FormFields["sewa"]["fields"];
    //add info to accountNumber
    for (const field in formFields) {
      if (field === "accountNumber") {
        formFields[field]["config"]["InputProps"] = {
          endAdornment: (
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              info
            </IconButton>
          )
        };
      }
    }
    return formFields;
  };


  const handleClickShowPassword = () => {
  };

  useEffect(() => {
    setFields(initFieldProps());
  }, []);

  const onBlurFields = (resData: any) => {
    setFormData(resData);
    setDisabled(!resData.valid)
  };

  return (
    <form>
      <InputWrapper initialState={fields} onBlur={onBlurFields} />
      <Button variant="contained" disabled={disabled} color="primary">
        Submit
      </Button>
    </form>
  );
}

export default AddUpdateServiceTypes
