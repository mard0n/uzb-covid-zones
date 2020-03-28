import React from "react";
import { H5, Box, Caption } from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import getBeneficiariesAvatar from "../../../../../util/getBeneficiariesAvatar";
import CardPayNow from "../../../../../common/card/CardPayNow";

type GetBeneficiaryListProps = {
  type?: string;
  onClickBeneficiary?: any;
};

const GetBeneficiaryList = (props: GetBeneficiaryListProps) => {
  const { type, onClickBeneficiary } = props;
  const { t } = useTranslation();
  return (
    <Box mt={6}>
      <H5 gutterBottom>
        {t("billPayments.steps.startPayment.beneficiaryList.title")}
      </H5>
      <Caption gutterBottom>
        {t("billPayments.steps.startPayment.beneficiaryList.desc")}
      </Caption>
      <Box mt={4} display="flex">
        <Box mr={5} onClick={(e)=>onClickBeneficiary()}>
          {type && (
            <CardPayNow
              style={{ justifyContent: "space-evenly" }}
              heading={"Praveen new phone"}
              subheading={
                // data.serviceTypeCode +
                // " " +
                // ((type && type.toLowerCase()! === ("du" || "etisalat"))
                //   ? t("common.label.nickName")
                //   : "") + " | " + data.accountNumber
                "etisalat prepaid | 0556662619"
              }
              image={getBeneficiariesAvatar(type.toLowerCase())}
            />
          )}
        </Box>
        <Box mr={3}>
          {type && (
            <CardPayNow
              style={{ justifyContent: "space-evenly" }}
              heading={"Praveen new phone"}
              subheading={
                // data.serviceTypeCode +
                // " " +
                // ((type && type.toLowerCase()! === ("du" || "etisalat"))
                //   ? t("common.label.nickName")
                //   : "") + " | " + data.accountNumber
                "etisalat prepaid | 0556662619"
              }
              image={getBeneficiariesAvatar(type.toLowerCase())}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

GetBeneficiaryList.defaultProps = {
  type: "etisalat"
};

export default GetBeneficiaryList;
