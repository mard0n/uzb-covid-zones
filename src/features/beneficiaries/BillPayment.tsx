import React from "react";
import { List } from "@mashreq-digital/ui";
import CustomListItem from "../../components/listItem";
import { TELECOM_SERVICE_TYPE_CODE } from "../../util/constants";
import getBeneficiariesAvatar from "../../util/getBeneficiariesAvatar";

let data = {
  beneficiaries: [
    {
      id: 111,
      accountNumber: "2751233956",
      nickname: "test Masood",
      category: "Telicom",
      serviceType: "DU",
      serviceTypeCode: "DU",
      status: "ACTIVE",
      createdDate: "2020-03-05T07:35:14.009Z",
      activeAfter: "2020-03-05T13:54:23.105Z"
    },

    {
      id: 124,
      accountNumber: "2751233956",
      nickname: "Lav_1_SEWAa",
      category: "Utility Services",
      serviceType: "SEWA",
      serviceTypeCode: "SEWA",
      status: "ACTIVE",
      createdDate: "2020-03-05T07:35:14.009Z",
      activeAfter: "2020-03-05T13:54:23.105Z"
    },
    {
      id: 125,
      accountNumber: "220000110726",
      nickname: "Lav_1_FEWA",
      category: "Utility Services",
      serviceType: "FEWA",
      serviceTypeCode: "FEWA",
      status: "ACTIVE",
      createdDate: "2020-03-05T07:55:51.329Z",
      activeAfter: "2020-03-05T08:05:19.395Z"
    },
    {
      id: 10148,
      accountNumber: "2021775712",
      nickname: "Anita",
      category: "Utility Services",
      serviceType: "DEWA",
      serviceTypeCode: "DEWA",
      status: "DRAFT",
      createdDate: "2020-03-08T09:11:06.823Z"
    }
  ]
};

const BillPayment = (props: any) => {
  return (
    <List>
      {data.beneficiaries.map((eachBeneficiaries: any) => {
        return (
          <CustomListItem
            color="primary"
            avatarImage={getBeneficiariesAvatar(eachBeneficiaries.serviceType)}
            avatarName={eachBeneficiaries.serviceType}
            nickname={eachBeneficiaries.nickname}
            accountNumber={
              eachBeneficiaries.serviceType +
              " | " +
              eachBeneficiaries.accountNumber
            }
          />
        );
      })}
    </List>
  );
};

export default BillPayment;
