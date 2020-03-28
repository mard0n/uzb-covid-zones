import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid, Box } from "@mashreq-digital/ui";
import FilledCheckBox from "../../../../../common/filledCheckbox";
import InputWrapper from "../../../../../common/inputWrapper";
import GetBeneficiaryList from "./GetBeneficiaryList";
import { FormFields } from "../formData";
import { capitalizeFirstLetter } from "../../../../../util/helper";

type PaymentNumberProps = {
  type : any,
  onSubmit?: any,
  onClickBeneficiary?: any
}

const PaymentNumber = (props: PaymentNumberProps) => {
  const { type, onSubmit, onClickBeneficiary } = props;
  const getType: keyof typeof FormFields = type;
  const formSchema: any = FormFields[getType];
  const telecomOptions =
    formSchema && formSchema["options"] && formSchema["options"].length > 0
      ? formSchema["options"]
      : [];
  const [billType, setBillType] = useState(formSchema["type"]);
  const [telecomValue, setTelecomValue] = useState("prepaid");
  const [disabled, setDisabled] = useState(true);
  const [fields, setFields] = useState<any>({});
  const [formData, setFormData] = useState({});
  const formFields: any =
    getType === "etisalat" || getType === "du"
      ? formSchema[telecomValue]["fields"]
      : formSchema["fields"];
  const { t } = useTranslation();

  useEffect(() => {
    const initFieldProps = () => {
      setBillType(capitalizeFirstLetter(type));
      for (const field in formFields) {
        formFields[field]["config"]["value"] = "";
        formFields[field]["config"]["error"] = "";
        formFields[field]["config"]["errorText"] = "";
      }
      return formFields;
    };
    setFields(initFieldProps());
  }, [formFields, type]);

  const onClickFilledOptions = (selItem: any) => {
    let cloneFields = { ...formSchema[selItem]["fields"] };
    setTelecomValue(selItem);
    //console.log("onClickFilledOptions -> cloneFields", cloneFields)
    for (let field in cloneFields) {
      cloneFields[field]["config"]["value"] = "";
      cloneFields[field]["config"]["error"] = "";
      cloneFields[field]["config"]["errorText"] = "";
    }
    setFields(cloneFields);
  };

  const onBlurFields = (resData: any) => {
    setFormData(resData);
    setDisabled(!resData.valid);
  };

  const onClickSubmit = () => {
    let data: any = { ...formData },
      serviceType = billType;
    delete data["valid"];
    if(onSubmit && typeof onSubmit === "function") {
      onSubmit(telecomValue);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          {telecomOptions && telecomOptions.length > 0 && (
            <Box my={6} mt={8}>
              <FilledCheckBox
                options={telecomOptions}
                init={telecomValue}
                onClickCallback={(selItem: string) =>
                  onClickFilledOptions(selItem)
                }
              />
            </Box>
          )}
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <InputWrapper
              type={type}
              initialState={fields}
              onBlur={onBlurFields}
            />
          </Grid>
        </Grid>
      </Grid>
      <Box mt={6}>
        <Button
          variant="contained"
          color="primary"
          disabled={disabled}
          onClick={() => onClickSubmit()}
          size="medium"
        >
          {t("common.action.proceed")}
        </Button>
      </Box>
      <GetBeneficiaryList type={type} onClickBeneficiary={()=> onClickBeneficiary(telecomValue)}/>
    </>
  );
};

export default PaymentNumber;
