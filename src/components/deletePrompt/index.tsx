import React from 'react'
import { TrashWarning } from "@mashreq-digital/webassets";
import PromptTemplate from '../../common/promptTemplate';

const DeletePrompt = (props: any) => {
  const { openModal, title, desc, buttonLabel, buttonProps, onCloseModal } = props;
  return (
    <PromptTemplate
            icon={TrashWarning}
            title={title}
            desc={desc}
            iconBgVariant="warning"
            openModal={openModal}
            onCloseModal={() => {
              if(onCloseModal && typeof onCloseModal === "function") {
                onCloseModal();
              }
            }}
            buttonLabel={buttonLabel}
            buttonProps={{variant: "contained",...buttonProps}}
          />
  )
}

export default DeletePrompt;
