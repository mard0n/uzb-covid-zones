import React, { useState, useEffect } from "react";
import PromptTemplate from "../../../../../common/promptTemplate";
import InputWrapper from "../../../../../common/inputWrapper/index";
import { saveBeneficiaryFormFields } from "./FormData/index";
import { IconButton } from "@mashreq-digital/ui";
import { Eye } from "@mashreq-digital/webassets";
import { Eye2 } from "@mashreq-digital/webassets";
import { CheckboxWithLabel } from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";

type saveBeneficiaryProps = {
  openModal: any;
  title: any;
  desc: any;
  data?: any;
  buttonLabel: any;
  beneficiaryItemForSave?: any;
  onSubmitSave: any;
  onCloseModal?: any;
};

const SaveBeneficiaryPrompt = (props: saveBeneficiaryProps) => {
  const {
    openModal,
    title,
    desc,
    data,
    buttonLabel,
    beneficiaryItemForSave,
    onSubmitSave,
    onCloseModal
  } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fields, setFields] = useState({});
  const [formData, setFormData] = useState<any>({});
  const getType: keyof typeof saveBeneficiaryFormFields = beneficiaryItemForSave.serviceTypeCode.toLowerCase();
  const [disabledSaveButton, setDisabledSaveButton] = useState(true);
  const [hideSalikPin, setHideSalikPin] = useState(false);
  const [savePin, setSavePin] = useState(true);
  const [isError, setIsError] = useState(true);
  const benErrorOnSave = useSelector((state:any) => state.beneficiary.billPayment.errorCode);
  const newlyAdded = useSelector((state:any) => state?.beneficiary?.billPayment?.addNew);

  // const onBlurFields = (resData: any) => {
  //   let cloneData = { ...resData };
  //   setFormData(cloneData);
  // };

  const onChangeSavePin = () => {
    setSavePin(!savePin);
  };

  useEffect(() => {
    const handleClickShowPassword = (val: any) => {
      let cloneFields = { ...val };
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

  const onChangeOfSaveFiled = (formChanges: any, formData: any) => {
    // let cloneData = { ...formChanges };
    // console.log("onChangeOfSaveFiled -> cloneData", cloneData)
    // if(getType !== "salik"){
    setFormData(formData);
    setDisabledSaveButton(!formChanges.nickName.valid);
    // }
  };


  useEffect(()=>{
    const onSavedBeneficiary = () => {
      let resData: any = {...formData};
      if(getType === "salik") {
        resData["savePin"] = savePin;
      }
      onSubmitSave(resData);
    }

    if(newlyAdded && newlyAdded.id) {
      onSavedBeneficiary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[newlyAdded]);

  useEffect(() => {
    const initFieldProps = () => {
      const formFields: any =
      saveBeneficiaryFormFields[getType === "salik" ? "salik" : "other"]["fields"];
      for (let field in formFields) {
        if (field === "nickName") {
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

  // const validateError = () => {
  //   if(benErrorOnSave) {
  //     setIsError(true);
  //     // debugger;
  //     const formFields: any =
  //     saveBeneficiaryFormFields[getType === "salik" ? "salik" : "other"]["fields"];
  //     // if(benErrorOnSave === "BN-4004") {
  //     for (let field in formFields) {
  //       if (field === "nickName") {
  //         formFields[field]["config"]["error"] = true;
  //         formFields[field]["config"]["errorText"] = t(`common.dbErrors.${benErrorOnSave}`);
  //       }
  //     }
  //     setFields(formFields);
  //   } else {
  //     setIsError(false);
  //   }
  // }

  useEffect(()=>{
    const benError = () => {
      if(benErrorOnSave) {
        setIsError(true);
        // debugger;
        const formFields: any =
        saveBeneficiaryFormFields[getType === "salik" ? "salik" : "other"]["fields"];
        // if(benErrorOnSave === "BN-4004") {
        for (let field in formFields) {
          if (field === "nickName") {
            formFields[field]["config"]["error"] = true;
            formFields[field]["config"]["errorText"] = t(`common.dbErrors.${benErrorOnSave}`);
          }
        }
        setFields(formFields);
      } else {
        setIsError(false);
      }
    }

    benError();
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[benErrorOnSave, getType]);

  const onSubmit = () => {
    // if(benErrorOnSave) {
    //   dispatch(Actions.clearBeneficiaryErrorCode());
    //   validateError();
    // } else {
      let resData: any = {
        nickname: formData.nickName,
        serviceTypeCode: data.serviceTypeCode,
        accountNumber: data.accountNumber,
      }
    
      if (data.serviceTypeCode === "Salik") {
        let isValidNumber = !isNaN(Number(data.salikPinCode));
        resData = {
          ...resData,
          salikPinCode: data.salikPinCode ? isValidNumber ? btoa(data.salikPinCode) : data.salikPinCode : '', 
          savePinCode: savePin,
        }
      }
      dispatch(
        Actions.addUpdateBeneficiaryRequest({ updateMode: false, data: resData, activateAccount: true })
      );
    // }
  }

  return (
    <PromptTemplate
      title={title}
      desc={desc}
      openModal={openModal}
      onCloseModal={() => {
        dispatch(Actions.clearBeneficiaryErrorCode());
        if (onCloseModal && typeof onCloseModal === "function") {
          onCloseModal();
        }
      }}
      content={
        <>
          <InputWrapper
            initialState={fields}
            // onBlur={onBlurFields}
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

export default SaveBeneficiaryPrompt;
