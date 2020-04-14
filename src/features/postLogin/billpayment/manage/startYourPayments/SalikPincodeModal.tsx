import React, { useState, useEffect } from "react";
import PromptTemplate from "../../../../../common/promptTemplate";
import InputWrapper from "../../../../../common/inputWrapper/index";
import salikPincodeFields from "../formData/salikPincodeFields";
import { IconButton } from "@mashreq-digital/ui";
import { Eye } from "@mashreq-digital/webassets";
import { Eye2 } from "@mashreq-digital/webassets";
import { CheckboxWithLabel } from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";

type salikPinCodeModalProps = {
  openModal: any;
  title: any;
  desc: any;
  data?: any;
  isError?: string;
  buttonLabel: any;
  onSubmitSave: any;
  onCloseModal?: any;
  onChangePin?: any;
};

const SalikPinCodeModal = (props: salikPinCodeModalProps) => {
  const {
    openModal,
    title,
    desc,
    data,
    isError,
    buttonLabel,
    onSubmitSave,
    onCloseModal,
    onChangePin
  } = props;
  const { t } = useTranslation();
  const [fields, setFields] = useState({});
  const [formData, setFormData] = useState<any>({});
  const getType: string = data.serviceTypeCode.toLowerCase();
  const [disabledSaveButton, setDisabledSaveButton] = useState(true);
  const [hideSalikPin, setHideSalikPin] = useState(false);
  const [savePin, setSavePin] = useState(true);


  const onChangeSavePin = () => {
    setSavePin(!savePin);
  };

  useEffect(()=>{
    if(isError){
      let cloneFields: any = {...fields};
      for (let field in cloneFields) {
        if (field === "pincode") {
          cloneFields[field]["config"]["error"] = true;
          cloneFields[field]["config"]["errorText"] = t(`common.dbErrors.${isError}`);
        }
      }
      setFields(cloneFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isError])

  useEffect(() => {
    const handleClickShowPassword = (val: any) => {
      let cloneFields = val && val.pincode ? { ...val } : {...salikPincodeFields["fields"]};
      cloneFields["pincode"]["config"]["type"] = hideSalikPin
        ? "password"
        : "text";
      setHideSalikPin(!hideSalikPin);
      setFields(cloneFields);
    };
    if (getType === "salik") {
      const formFields: any = salikPincodeFields["fields"];
      for (const field in formFields) {
        if (field === "pincode") {
          formFields[field]["config"]["InputProps"] = {
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword(fields)}
              >
                {hideSalikPin ? <Eye /> : <Eye2 />}
              </IconButton>
            )
          };
        }
      }
    }
  }, [fields, hideSalikPin, getType]);

  const onChangeOfSaveFiled = (formChanges: any, formData: any) => {
    setFormData(formData);
    setDisabledSaveButton(!formChanges.pincode.valid);
    if(onChangePin && typeof onChangePin === "function") {
      onChangePin();
    }
  };

  useEffect(() => {
    const initFieldProps = () => {
      const formFields: any =
      salikPincodeFields["fields"];
      for (let field in formFields) {
        if (field === "pincode") {
          formFields[field]["config"]["value"] = "";
          formFields[field]["config"]["error"] = false;
          formFields[field]["config"]["errorText"] = "";
        }
      }
      return formFields;
    };
    setFields(initFieldProps());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onSubmit = () => {
    if(onSubmitSave && typeof onSubmitSave === "function") {
      formData["savePinCode"] = savePin;
      onSubmitSave(formData);
    }
  }
  return (
    <PromptTemplate
      title={title}
      desc={desc}
      openModal={openModal}
      onCloseModal={() => {
        if (onCloseModal && typeof onCloseModal === "function") {
          onCloseModal();
        }
      }}
      content={
        <>
          <InputWrapper
            initialState={fields}
            onChangeFields={onChangeOfSaveFiled}
          />
          {getType && getType === "salik" && (
            <CheckboxWithLabel
              checked={savePin}
              onChange={() => onChangeSavePin()}
              color="default"
              label={t("beneficiary.manage.addEdit.salik.savePin")}
            />
          )}
        </>
      }
      buttonLabel={buttonLabel}
      buttonProps={{
        variant: "contained",
        disabled: disabledSaveButton,
        onClick: () => {
          onSubmit();
        }
      }}
    />
  );
};

export default SalikPinCodeModal;
