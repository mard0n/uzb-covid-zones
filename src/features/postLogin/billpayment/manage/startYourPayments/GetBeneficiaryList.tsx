import React, { useEffect, useState } from "react";
import { H5, Box, Caption } from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import getBeneficiariesAvatar from "../../../../../util/getBeneficiariesAvatar";
import CardPayNow from "../../../../../common/card/CardPayNow";
import { BILL_PAYMENT_ADD_EDIT_BENEFICIARY_ENDPOINT } from "../../../../../network/Endpoints";
import { getTelecomServiceType } from "../../../../../util/getTelecomServiceType";
import { API } from "../../../../../network";
import { trimLowerCaseStr, capitalizeFirstLetter } from "../../../../../util/helper";

type GetBeneficiaryListProps = {
  type?: string;
  telecomActiveTab?: string;
  onClickBeneficiary?: any;
};

const GetBeneficiaryList = (props: GetBeneficiaryListProps) => {
  const { type, telecomActiveTab, onClickBeneficiary } = props;
  const [content, setContent] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    let url =
      BILL_PAYMENT_ADD_EDIT_BENEFICIARY_ENDPOINT +
      "?serviceType=" +
      getTelecomServiceType(
        type ? type : "",
        telecomActiveTab ? telecomActiveTab : ""
      );
    API.get(url).then((val: any) => {
      if (val.data && val.data.data && val.data.data.content) {
        let resData = val.data.data.content,
          filterActive = resData.filter(
            (item: any) => trimLowerCaseStr(item.status) === "active"
          );
        setContent(filterActive);
      }
    });
  }, [type, telecomActiveTab]);


  if (type && content && content.length > 0) {
    return (
      <Box mt={6}>
        <H5 gutterBottom>
          {t("billPayments.steps.startPayment.beneficiaryList.title")}
        </H5>
        <Caption gutterBottom>
          {t("billPayments.steps.startPayment.beneficiaryList.desc")}
        </Caption>
        <Box mt={4} display="flex" flexWrap="wrap">
          {content.map((item: any) => {
            const { id, nickname, accountNumber, serviceType } = item;
            return (
              <Box mr={5} mb={3} key={id} onClick={e => onClickBeneficiary(item)}>
                {type && (
                  <CardPayNow
                    link
                    style={{ justifyContent: "space-evenly" }}
                    heading={nickname}
                    subheading={`${capitalizeFirstLetter(type)} ${
                      telecomActiveTab ? capitalizeFirstLetter(telecomActiveTab) : ""
                    } | ${accountNumber}`}
                    image={getBeneficiariesAvatar(type.toLowerCase())}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
  return null;
};

GetBeneficiaryList.defaultProps = {
  type: "etisalat"
};

export default GetBeneficiaryList;
