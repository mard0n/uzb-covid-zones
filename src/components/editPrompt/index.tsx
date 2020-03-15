import React from 'react'
import { useTranslation } from 'react-i18next';
import PromptTemplate from '../../common/promptTemplate';
import InputWrapper from '../../common/inputWrapper/index';
import {editFormFields} from "./editFormData";


const EditPrompt = (props: any) => {
  console.log("EditPrompt -> editFormFields.dewa", editFormFields.dewa)
  const { openModal, title, desc, buttonLabel, buttonProps, onCloseModal } = props;
  return (
    <PromptTemplate
            title={title}
            desc={desc}
            content={
              <InputWrapper initialState={editFormFields.dewa.fields} onBlur={()=>{}} />
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
            buttonProps={{variant: "contained",...buttonProps}}
          />
  )
}

export default EditPrompt;
