import React, { useState } from "react";
import PromptTemplate from "../../../../../common/promptTemplate";
import { useTranslation } from "react-i18next";
import { Caption } from "@mashreq-digital/ui";
import { FormFields } from "../formData";
import InputWrapper from "../../../../../common/inputWrapper";
import { replaceStr } from "../../../../../util/helper";

type PayCustomAmountProps = {
  openModal: boolean;
  onCloseModal?: any;
}

const PayCustomAmount = (props: PayCustomAmountProps) => {
  const { openModal, onCloseModal } = props;
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const [fields, setFields] = useState(FormFields["payAmount"]["fields"]);
  const [disabledEditButton, setDisabledEditButton] = useState(true);

  const onBlurFields = (resData: any) => {
    let cloneData = { ...resData };
    setFormData(cloneData);
  };

  const onSubmitEdit = (res: any) => {
    let cloneData = { ...res };
    if(cloneData.customAmount && !isNaN(Number(cloneData.customAmount))) {
      let amount = Number(cloneData.customAmount);
      
      if(amount >= 50 && amount <= 1000){
       console.log(res);
      } else {
         /* update error */
         setDisabledEditButton(true);  
         let cloneFields: any = {...fields};
         for (const field in cloneFields) {
           cloneFields[field]["config"]["error"] = true;
           cloneFields[field]["config"]["errorText"] = replaceStr(replaceStr(t("beneficiary.manage.errors.matchNumber"), "--greater--", 50), "--lesser--", 1000);
         }
         setFields(cloneFields);
      }

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
