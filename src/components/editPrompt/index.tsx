import React ,{useState,useEffect}from 'react'
import PromptTemplate from '../../common/promptTemplate';
import InputWrapper from '../../common/inputWrapper/index';
import {editFormFields} from "./editFormData";

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
  const { openModal, title, desc, buttonLabel, beneficiaryItemForEdit, onSubmitEdit, onCloseModal } = props;
  const [fields, setFields] = useState({});
  const [formData, setFormData] = useState({});
  const getType: keyof typeof editFormFields = beneficiaryItemForEdit.serviceType.toLowerCase();

  console.log("EditPrompt -> formData", formData)

  const onBlurFields = (resData: any) => {
    setFormData(resData);
  };


 useEffect(() => {
    const initFieldProps = () => {
      const formFields: any = editFormFields[getType === "salik" ? "salik":"other"]["fields"];
        for (const field in formFields) {
          if (field === "nickName") {
            formFields[field]["config"]["value"] = beneficiaryItemForEdit.nickname;
        }
      return formFields;
    };
  }
    setFields(initFieldProps());
},[beneficiaryItemForEdit, getType]);


  return (
    <PromptTemplate
            title={title}
            desc={desc}
            content={
              <InputWrapper initialState={fields} onBlur={onBlurFields}/>
            }
            modalProps={{
              open: openModal,
              children: <></>,
              onClose: () => {
                if(onCloseModal && typeof onCloseModal === "function") {
                  onCloseModal();
                }
              }
            }}
            buttonLabel={buttonLabel}
            buttonProps={{
              variant: "contained",
              onClick: () => {
                onSubmitEdit(formData);
              }
            }}
          />
  )
}

export default EditPrompt;
