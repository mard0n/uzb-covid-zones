import React, { useState, useEffect } from "react";
import PromptTemplate from "../../../../../common/promptTemplate";
import { useTranslation } from "react-i18next";
// import { Caption } from "@mashreq-digital/ui";
import { FormFields } from "../formData";
import InputWrapper from "../../../../../common/inputWrapper";
import { replaceStr } from "../../../../../util/helper";

type PayCustomAmountProps = {
  openModal: boolean;
  onCloseModal?: any;
  onSubmitCallback?: any;
}

const PayCustomAmount = (props: PayCustomAmountProps) => {
  const { openModal, onCloseModal, onSubmitCallback } = props;
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const formFields: any = FormFields["payAmount"]["fields"];
  const [fields, setFields] = useState<any>(formFields);
  const [disabledEditButton, setDisabledEditButton] = useState(true);
  

  useEffect(()=>{
    for (const field in formFields) {
      formFields[field]["config"]["value"] = "";
      formFields[field]["config"]["error"] = false;
      formFields[field]["config"]["errorText"] = '';
    }
    setFields(formFields);
  },[formFields]);

  const onBlurFields = (resData: any) => {
    let cloneData = { ...resData };
    setFormData(cloneData);
  };

  const onSubmitEdit = (res: any) => {
    let cloneData = { ...res };
    if(cloneData.customAmount && !isNaN(Number(cloneData.customAmount))) {
      let amount = Number(cloneData.customAmount);
      /* 50 to 100 min and max limit validation*/
      // if(amount >= 50 && amount <= 1000){
       if(onSubmitCallback && typeof onSubmitCallback === "function") {
        onSubmitCallback(amount);
       }
      // } else {
      //    /* update error */
      //    setDisabledEditButton(true);  
      //    let cloneFields: any = {...fields};
      //    for (const field in cloneFields) {
      //      cloneFields[field]["config"]["error"] = true;
      //      cloneFields[field]["config"]["errorText"] = replaceStr(replaceStr(t("beneficiary.manage.errors.matchNumber"), "--greater--", 50), "--lesser--", 1000);
      //    }
      //    setFields(cloneFields);
      // }

    }
  };

  const onChangeOfEditFiled = (formChanges: any) => {
    let cloneData = { ...formChanges };
    setDisabledEditButton(!cloneData.customAmount.valid);  
  };

  return (
    <PromptTemplate
    minWidth
      title={t("billPayments.steps.payCustomAmount.title")}
      openModal={openModal}
      content={
        <>
          <InputWrapper
            initialState={fields}
            onChangeFields={(val: any)=>onChangeOfEditFiled(val)}
            onBlur={onBlurFields}
          />
        </>
      }
      onCloseModal={() => {
        if (onCloseModal && typeof onCloseModal === "function") {
          onCloseModal();
        }
      }}
      buttonLabel={t("common.action.payNow")}
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

export default PayCustomAmount;
