import React, { useState, useEffect } from "react";
import PromptTemplate from "../../../../../common/promptTemplate";
import InputWrapper from "../../../../../common/inputWrapper/index";
import { saveBeneficiaryFormFields } from "./FormData/index";
import { IconButton } from "@mashreq-digital/ui";
import { Eye } from "@mashreq-digital/webassets";
import { Eye2 } from "@mashreq-digital/webassets";
import { CheckboxWithLabel } from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";

type saveBeneficiaryProps = {
  openModal: any;
  title: any;
  desc: any;
  buttonLabel: any;
  beneficiaryItemForSave?: any;
  onSubmitSave: any;
  onCloseModal: any;
};

const SaveBeneficiaryPrompt = (props: saveBeneficiaryProps) => {
  const {
    openModal,
    title,
    desc,
    buttonLabel,
    beneficiaryItemForSave,
    onSubmitSave,
    onCloseModal
  } = props;
  console.log("SavePrompt -> beneficiaryItemForSave", beneficiaryItemForSave)
  const { t } = useTranslation();
  const [fields, setFields] = useState({});
  const [formData, setFormData] = useState({});
  const getType: keyof typeof saveBeneficiaryFormFields = beneficiaryItemForSave.serviceTypeCode.toLowerCase();
  const [disabledSaveButton, setDisabledSaveButton] = useState(true);
  const [hideSalikPin, setHideSalikPin] = useState(false);
  const [savePin, setSavePin] = useState(true);

  const onBlurFields = (resData: any) => {
    let cloneData = { ...resData };
    setFormData(cloneData);
  };

  const onChangeSavePin = () => {
    setSavePin(!savePin);
  };

  useEffect(() => {
    const handleClickShowPassword = (val: any) => {
      let cloneFields = { ...val };
      console.log(cloneFields);
      cloneFields["pincode"]["config"]["type"] = hideSalikPin
        ? "password"
        : "text";
      setHideSalikPin(!hideSalikPin);
      setFields(cloneFields);
    };
    if (getType === "salik") {
      const formFields: any = saveBeneficiaryFormFields["salik"]["fields"];
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

  const onChangeOfSaveFiled = (formChanges: any) => {
    let cloneData = { ...formChanges };
    // console.log("onChangeOfSaveFiled -> cloneData", cloneData)
    // if(getType !== "salik"){
    setDisabledSaveButton(!cloneData.nickName.valid);
    // }
  };

  useEffect(() => {
    const initFieldProps = () => {
      const formFields: any =
      saveBeneficiaryFormFields[getType === "salik" ? "salik" : "other"]["fields"];
      for (let field in formFields) {
        console.log("loop -> field", field);
        if (field === "nickName") {
          formFields[field]["config"]["value"] =
            beneficiaryItemForSave.nickname;
        }
      }
      return formFields;
    };
    setFields(initFieldProps());
  }, [beneficiaryItemForSave, getType]);

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
            onBlur={onBlurFields}
            onChangeFields={onChangeOfSaveFiled}
          />
          {getType && getType === "salik" && (
            <CheckboxWithLabel
              checked={savePin}
              onChange={() => onChangeSavePin()}
              color="default"
              label={t("beneficiary.manage.addSave.salik.savePin")}
            />
          )}
        </>
      }
      buttonLabel={buttonLabel}
      buttonProps={{
        variant: "contained",
        disabled: disabledSaveButton,
        onClick: () => {
          onSubmitSave(formData);
        }
      }}
    />
  );
};

export default SaveBeneficiaryPrompt;
