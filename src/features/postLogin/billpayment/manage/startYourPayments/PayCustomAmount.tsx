import React, { useState } from "react";
import PromptTemplate from "../../../../../common/promptTemplate";
import { useTranslation } from "react-i18next";
import { Caption } from "@mashreq-digital/ui";
import { FormFields } from "../formData";
import InputWrapper from "../../../../../common/inputWrapper";

type PayCustomAmountProps = {
  openModal: boolean;
  onCloseModal?: any;
}

const PayCustomAmount = (props: PayCustomAmountProps) => {
  const { openModal, onCloseModal } = props;
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const [disabledEditButton, setDisabledEditButton] = useState(true);

  const onBlurFields = (resData: any) => {
    let cloneData = { ...resData };
    setFormData(cloneData);
  };

  const onSubmitEdit = (val: any) => {
    console.log(val);
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
            initialState={FormFields["payAmount"]["fields"]}
            onChangeFields={onChangeOfEditFiled}
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
