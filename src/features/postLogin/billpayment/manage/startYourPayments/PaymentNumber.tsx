import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Grid, Box, IconButton } from "@mashreq-digital/ui";
import FilledCheckBox from "../../../../../common/filledCheckbox";
import InputWrapper from "../../../../../common/inputWrapper";
import GetBeneficiaryList from "./GetBeneficiaryList";
import { FormFields } from "../formData";
import { getTelecomServiceType } from "../../../../../util/getTelecomServiceType";
import { BILL_PAYMENT_ENQUIRY } from "../../../../../network/Endpoints";
import { API } from "../../../../../network";
import { capitalizeFirstLetter } from "../../../../../util/helper";
import { Eye, Eye2 } from "@mashreq-digital/webassets";

type PaymentNumberProps = {
  type : any,
  onProceed?: any,
  onClickBeneficiary?: any
  onChangeTab?: any
}

const PaymentNumber = (props: PaymentNumberProps) => {
  const { type, onProceed, onChangeTab, onClickBeneficiary } = props;
  const getType: keyof typeof FormFields = type;
  const formSchema: any = FormFields[getType];
  const telecomOptions =
    formSchema && formSchema["options"] && formSchema["options"].length > 0
      ? formSchema["options"]
      : [];
  const [billType, setBillType] = useState(formSchema["type"]);
  const [telecomValue, setTelecomValue] = useState("prepaid");
  const [hideSalikPin, setHideSalikPin] = useState(false);
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
      setBillType(type);
      for (const field in formFields) {
        formFields[field]["config"]["value"] = "";
        formFields[field]["config"]["error"] = false;
        formFields[field]["config"]["errorText"] = "";
      }
      return formFields;
    };
    setFields(initFieldProps());
  }, [formFields, type]);

  useEffect(()=>{
    const handleClickShowPassword = (val: any) => {
      let cloneFields = {...val};
      cloneFields['pincode']['config']['type'] = hideSalikPin ?  'password' : 'text';
      setHideSalikPin(!hideSalikPin);
      setFields(cloneFields);
    }

    for (const field in formFields) {
      if (type==="salik" && field === "pincode") {
        formFields[field]["config"]["InputProps"] = {
          endAdornment: (
            <IconButton
            aria-label="toggle password visibility"
            onClick={()=>handleClickShowPassword(fields)}
          >
            {hideSalikPin ? <Eye /> : <Eye2 />}
          </IconButton>
          )
        };
      }
    }},[type, fields, hideSalikPin, formFields]);

  const onClickFilledOptions = (selItem: any) => {
    let cloneFields = { ...formSchema[selItem]["fields"] };
    setTelecomValue(selItem);
    //console.log("onClickFilledOptions -> cloneFields", cloneFields)
    for (let field in cloneFields) {
      cloneFields[field]["config"]["value"] = "";
      cloneFields[field]["config"]["error"] = false;
      cloneFields[field]["config"]["errorText"] = "";
    }
    setFields(cloneFields);
    if(onChangeTab && typeof onChangeTab === "function") {
      onChangeTab(selItem);
    }
  };

  const onClickExistingBeneficiary = (existingBeneficiary: any) => {
    onClickProceed(existingBeneficiary);
    onClickBeneficiary();
  }

  const onBlurFields = (resData: any) => {
    setFormData(resData);
    setDisabled(!resData.valid);
  };

  const onClickProceed = (existingBeneficiary?: any) => {
    let data: any = existingBeneficiary ? { ...existingBeneficiary } : { ...formData },
      url = BILL_PAYMENT_ENQUIRY;
    data["serviceTypeCode"] = getTelecomServiceType((type === "du" || type === "etisalat") ? billType.toLowerCase() : (type === "noqodi" || type === "salik") ? capitalizeFirstLetter(billType) : billType.toUpperCase(), telecomValue);
    delete data["valid"];

    if(type === 'salik') {
      delete data["pincode"];
      data["salikPinCode"] = btoa(fields["pincode"]['config']['value']);
    }

    const config = {
      method: 'POST',
      data,
      url,
    };
    
    if(data["serviceTypeCode"]) {
      API(config).then((val: any) => { 
      if(val && val.data && (val.data.errorCode || val.data.errorId)) {
        setError(val.data.errorCode || val.data.errorId)
      } else if(val.data && val.data.data) {
        if(onProceed && typeof onProceed === "function") {
          let res = {...data, ...val.data.data};
          if(telecomValue){
            res["telecomType"] = telecomValue;
          }
          onProceed(res);
        }
      }
    });
    }
  };

  const setError = (code: string) => {
    let cloneFields = { ...fields };
    //console.log("onClickFilledOptions -> cloneFields", cloneFields)
    for (let field in cloneFields) {
      cloneFields[field]["config"]["error"] = true;
      cloneFields[field]["config"]["errorText"] = t(`common.dbErrors.${code}`);
    }
    setFields(cloneFields);
  }

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
          onClick={() => onClickProceed()}
          size="large"
        >
          {t("common.action.proceed")}
        </Button>
      </Box>
      <GetBeneficiaryList type={type} telecomActiveTab={telecomValue} onClickBeneficiary={onClickExistingBeneficiary}/>
    </>
  );
};

export default PaymentNumber;
