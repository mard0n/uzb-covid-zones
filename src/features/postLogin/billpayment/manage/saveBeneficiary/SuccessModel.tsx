import React, { useState } from "react";
import PromptTemplate from "../../../../../common/promptTemplate";
import { useTranslation } from "react-i18next";
import CardPayNow from "../../../../../common/card/CardPayNow";
import {capitalizeFirstLetter} from "../../../../../util/helper";
import { Box } from "@mashreq-digital/ui";
import getBeneficiariesAvatar from "../../../../../util/getBeneficiariesAvatar";
import { Check } from '@mashreq-digital/webassets';
import * as Actions from "../../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
import { useDispatch } from 'react-redux';

const SuccessModel = (props: any) => {
  const { data, type, telecomType } = props;
  const { accountNumber, nickname } = data;
  const [openModal, setOpenModal] = useState(true);
  console.log("SuccessModel -> data laila", data)
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  let typeWithTab = capitalizeFirstLetter(type) + ' '+ (telecomType ? capitalizeFirstLetter(telecomType) : ''),
    cardHeading = nickname ? nickname : `${typeWithTab}`,
      cardSubheading = nickname ? `${typeWithTab} | ${accountNumber}` : accountNumber;

const onClickGotIt= ()=>{
  dispatch(
    Actions.editAddModel(false)
  );
  setOpenModal(false);
}

  return (
    <PromptTemplate
      title={t("beneficiary.manage.prompts.edit.titleSvaveBenificiary")}
      iconBgVariant="success"
      desc=""
      modalProps={{hideCloseIcon: true}}
      icon={Check}
      openModal={openModal}
      content={
        <>
          <Box mt={6} mb={6}>
            {type && (
                <CardPayNow
                  heading={cardHeading}
                  subheading={cardSubheading}
                  image={getBeneficiariesAvatar(type.toLowerCase())}
                />
              )}
          </Box>
        </>
      }
      buttonLabel={t("common.action.gotit")}
      buttonProps={{
        variant: "outlined",
        onClick: onClickGotIt,
      }}
    />
  );
};

export default SuccessModel;
