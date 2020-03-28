import React, { useState, useEffect } from "react";
import PromptTemplate from "../../common/promptTemplate";
import InputWrapper from "../../common/inputWrapper/index";
import { editFormFields } from "./editFormData";
import { IconButton } from "@mashreq-digital/ui";
import { Eye } from "@mashreq-digital/webassets";
import { Eye2 } from "@mashreq-digital/webassets";
import { CheckboxWithLabel } from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";

type EdidPromptProps = {
  openModal: any;
  title: any;
  desc: any;
  buttonLabel: any;
  beneficiaryItemForEdit: any;
  onSubmitEdit: any;
  onCloseModal: any;
};

const EditPrompt = (props: EdidPromptProps) => {
  const {
    openModal,
    title,
    desc,
    buttonLabel,
    beneficiaryItemForEdit,
    onSubmitEdit,
    onCloseModal
  } = props;
  // console.log("EditPrompt -> beneficiaryItemForEdit", beneficiaryItemForEdit)
  const { t } = useTranslation();
  const [fields, setFields] = useState({});
  const [formData, setFormData] = useState({});
  const getType: keyof typeof editFormFields = beneficiaryItemForEdit.serviceType.toLowerCase();
  const [disabledEditButton, setDisabledEditButton] = useState(true);
  const [hideSalikPin, setHideSalikPin] = useState(false);
  const [savePin, setSavePin] = useState(true);

  // console.log("EditPrompt -> formData", formData)

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
      const formFields: any = editFormFields["salik"]["fields"];
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

  const onChangeOfEditFiled = (formChanges: any) => {
    let cloneData = { ...formChanges };
    // console.log("onChangeOfEditFiled -> cloneData", cloneData)
    // if(getType !== "salik"){
    setDisabledEditButton(!cloneData.nickName.valid);
    // }
  };

  useEffect(() => {
    const initFieldProps = () => {
      const formFields: any =
        editFormFields[getType === "salik" ? "salik" : "other"]["fields"];
      console.log(
        "initFieldProps -> formFields",
        formFields,
        beneficiaryItemForEdit.nickname
      );
      for (let field in formFields) {
        console.log("loop -> field", field);
        if (field === "nickName") {
          formFields[field]["config"]["value"] =
            beneficiaryItemForEdit.nickname;
          console.log(
            "initFieldProps -> beneficiaryItemForEdit.nickname",
            formFields,
            beneficiaryItemForEdit.nickname
          );
        }
      }
      return formFields;
    };
    setFields(initFieldProps());
  }, [beneficiaryItemForEdit, getType]);

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
            onChangeFields={onChangeOfEditFiled}
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
        disabled: disabledEditButton,
        onClick: () => {
          onSubmitEdit(formData);
        }
      }}
    />
  );
};

export default EditPrompt;
