import React, { useState } from "react";
import PromptTemplate from "../../../../../common/promptTemplate";
import { useTranslation } from "react-i18next";
import CardPayNow from "../../../../../common/card/CardPayNow";
import {capitalizeFirstLetter} from "../../../../../util/helper";
import { Box } from "@mashreq-digital/ui";
import getBeneficiariesAvatar from "../../../../../util/getBeneficiariesAvatar";
import { Check } from '@mashreq-digital/webassets';

const SuccessModel = (props: any) => {
  const { data, type, telecomType } = props;
  const { accountNumber, nickname } = data;
  const [openModal, setOpenModal] = useState(true);
  console.log("SuccessModel -> data laila", data)

  const { t } = useTranslation();

  let typeWithTab = capitalizeFirstLetter(type) + ' '+ (telecomType ? capitalizeFirstLetter(telecomType) : ''),
    cardHeading = nickname ? nickname : `${typeWithTab}`,
      cardSubheading = nickname ? `${typeWithTab} | ${accountNumber}` : accountNumber;

  return (
    <PromptTemplate
      title={t("beneficiary.manage.prompts.edit.titleSvaveBenificiary")}
      iconBgVariant="success"
      desc=""
      icon={Check}
      openModal={openModal}
      onCloseModal={ () => setOpenModal(false)}
      content={
        <>
          <Box mt={6} mb={6}>
            {/* <CardPayNow
              style={{ justifyContent: "space-evenly" }}
              heading={data.nickname}
              subheading={
                data.serviceTypeCode +
                " " +
                (data.serviceTypeCode &&
                data.serviceTypeCode.toLowerCase()! ===
                  ("du-prepaid" || "etisalat-prepaid")
                  ? t("common.label.nickName")
                  : "") +
                " | " +
                data.accountNumber
              }
              image={getBeneficiariesAvatar(data.serviceTypeCode.toLowerCase())}
            /> */}
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
        onClick: () => {
          setOpenModal(false);
        },
      }}
    />
  );
};

export default SuccessModel;
