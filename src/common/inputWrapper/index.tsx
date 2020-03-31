import React, { useState, useEffect } from "react";
import {
  TextField,
  FormHelperText,
  FormGroup,
  FormControl
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";

const InputWrapper = (props: any) => {
  const { initialState, onChangeFields, onBlur, type } = props;
  const [data, setData] = useState(initialState);
  const [valid, setValid] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    setData(initialState);
  }, [initialState]);

  const checkValidity = (value: any, config: any) => {
    // const { inputProps: { required = undefined, minLength= undefined } } = config;
    const { inputProps } = config;
    const {required = undefined, minLength= undefined } = inputProps || {};
    let isValid = false;

    //no validation
    if (!(inputProps && required)) {
      return true;
    }

    //required
    if (inputProps && required) {
      isValid = value.trim() !== "";
    }

    //string length not has mentioned minLength
    if (minLength && value) {
      isValid = value.length >= minLength;
    }

    //schema
    // if(schema && schema.length > 0) {
    //   isValid = validateScheme(value, schema);
    // }

    return isValid;
  };

  const validateScheme = (value: any, validation:any) => {
    const { schema } = validation || {};
    if(schema && schema.length > 0) {
      for(let i=0; i<schema.length; i++) {
        const { regEx, errorCode } = schema[i];
        let regexVal = new RegExp(regEx), validateRegex = regexVal.test(value);
        if (!validateRegex) {
          return errorCode ? errorCode : '';
        }
      }
    }
    return '';
  }

  const changedHandler = (e: any, id: any, regex: any) => {
    const formCopy = {
      ...data
    };
    const formElement = { ...formCopy[id] };
    const targetValue = e.target.value;
    let validData = true;
    if (regex && targetValue !== "") {
      let regexExp = new RegExp(regex);
      validData = regexExp.test(targetValue);
    }
    let fieldValue = validData ? targetValue : formElement.config.value;
    formElement.config.value = fieldValue;
    formElement.config.errorText = validateScheme(fieldValue, formElement.validation);
    formElement.valid = formElement.config.errorText ? false : checkValidity(
      fieldValue,
      formElement.config
    );
    formElement.touched = true;
    formElement.config.error = !formElement.valid;
    formCopy[id] = formElement;

    setData(formCopy);

    let isValid = true;

    for (const id in formCopy) {
      isValid = formCopy[id].valid && isValid;
    }
    setValid(isValid);
    if (onChangeFields && typeof onChangeFields === "function") {
      onChangeFields(formCopy);
    }
  };



  

  const onBlurHandler = (e: any, id: string) => {
    let resData: any = {};
    for (const key in data) {
      let getValue: string = data[key]["config"]["value"];
      resData[key] = getValue ? getValue : "";
    }
    resData["valid"] = valid;
    if (onBlur && typeof onBlur === "function") {
      onBlur(resData);
      // console.log("onBlurHandler -> resData, asdfjasdjhfhsakjdfhkhaskdfhkhdsakjfhkadfs", resData)
    }
  };

  const inputArray = [];
  for (const key in data) {
    inputArray.push({
      id: key,
      inputInfo: data[key]
    });
  }

  return (
    <FormGroup>
      {inputArray.map(element => {
      // console.log("InputWrapper -> element", element)
        const {
          id,
          inputInfo: {
            validation: { onChangeRegex },
            config: { label, value, helperText, errorText, ...rest }
          }
        } = element;
        let customProps: any = {};
        //  inputTypeRegSupport = ["text", "tel", "password"];
        if (errorText) {
          customProps["helperText"] = t(`${errorText}`);
        }
        if (label) {
          customProps["label"] = (type ? type : '') + ' ' + t(`${label}`);
        }

        const restProps = { ...rest, ...customProps };
        return (
          <FormControl key={id} margin="normal">
            <TextField
              {...restProps}
              value={value}
              label={t(`${label}`)}
              onChange={(e: any) => {
                changedHandler(e, id, onChangeRegex);
              }}
              onBlur={(e: any) => onBlurHandler(e, id)}
            />
            {helperText && t(`${helperText}`).indexOf('--br--') > -1 ?
              (
                t(`${helperText}`).split('--br--').map(line => <FormHelperText id="component-helper-text">{line}</FormHelperText>)
              ):
              ( <FormHelperText id="component-helper-text">
                {t(`${helperText}`)}
              </FormHelperText>) }
          </FormControl>
        );
      })}
    </FormGroup>
  );
};

export default InputWrapper;
