import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  IconButton,
  Caption,
  SectionSplitter,
  UnderlineText,
  H2,
  Grid
} from "@mashreq-digital/ui";
import InputWrapper from "../../../../../common/inputWrapper";
import { FormFields } from "../formData";
// console.log("initFieldProps -> formFields", FormFields)

const AddUpdateBillPayment = () => {
  const [type , setType] = useState(FormFields["sewa"]["type"]);
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
    // console.log("initFieldProps -> formFields", formFields)
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
      <SectionSplitter
      top={
        <Grid container>
          <Grid item xs={8}>
            <Box>
              <UnderlineText color="primary">
                <H2>Let’s get started with your beneficiary details</H2>
              </UnderlineText>

              <Box mt={6} mb={6}>
                <Caption>Please enter your details asdfasdf</Caption>
              </Box>

              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <InputWrapper initialState={fields} onBlur={onBlurFields} />
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={3}>
            Right Content
          </Grid>
        </Grid>
      }
      bottom={
        <Box display="flex" justifyContent="flex-end">

          <Button variant="contained" color="primary" disabled={disabled} size="medium">
            Submit
          </Button>
        </Box>}
      />
    </form>
  );
}

export default AddUpdateBillPayment;
