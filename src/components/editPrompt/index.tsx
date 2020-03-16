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
  console.log("EditPrompt -> beneficiaryItemForEdit", beneficiaryItemForEdit)
  const [fields, setFields] = useState({});
  const [formData, setFormData] = useState({});
  const getType: keyof typeof editFormFields = beneficiaryItemForEdit.serviceType.toLowerCase();
  const [disabledEditButton, setDisabledEditButton] = useState(true);

  console.log("EditPrompt -> formData", formData)

  const onBlurFields = (resData: any) => {
    let cloneData = {...resData}
    setFormData(cloneData);
  };

  const onChangeOfEditFiled = (formChanges:any)=>{
  let cloneData = {...formChanges}
  setDisabledEditButton(!cloneData.nickName.valid);
  }
  

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
  
              <>
              <InputWrapper initialState={fields} onBlur={onBlurFields}  onChangeFields={onChangeOfEditFiled} /> 
              </>
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
              disabled: disabledEditButton,
              onClick: () => {
                onSubmitEdit(formData);
              }
            }}
          />
  )
}

export default EditPrompt;
