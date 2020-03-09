import React from "react";
import { List, H4, Box } from "@mashreq-digital/ui";
import CustomListItem from "../../components/listItem";
import { TELECOM_SERVICE_TYPE_CODE } from "../../util/constants";
import getBeneficiariesAvatar from "../../util/getBeneficiariesAvatar";

let data = {
  beneficiaries: [
    {
      id: 111,
      accountNumber: "2751233956",
      nickname: "test Masood",
      category: "Telecom",
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
    },
    {
      id: 1212,
      accountNumber: "2021775712",
      nickname: "HONDA",
      category: "RTA",
      serviceType: "SALIK",
      serviceTypeCode: "SALIK",
      status: "DRAFT",
      createdDate: "2020-03-08T09:11:06.823Z"
    }
  ]
};

const listEachBenificiary = (eachBeneficiaries: any) => {
  return (
    <CustomListItem
      color="primary"
      avatarImage={getBeneficiariesAvatar(eachBeneficiaries.serviceType)}
      avatarName={eachBeneficiaries.serviceType}
      nickname={eachBeneficiaries.nickname}
      accountNumber={
        eachBeneficiaries.serviceType + " | " + eachBeneficiaries.accountNumber
      }
    />
  );
};

const BillPayment = (props: any) => {
  // const {data} = props;

  return (
    <List>
      <Box mb={3}>
        <H4> Telecom </H4>
      </Box>
      {data.beneficiaries
        .filter(benifForFilter => benifForFilter.category == "Telecom")
        .map((eachBeneficiaries: any) =>
          listEachBenificiary(eachBeneficiaries)
        )}
      <Box mb={3} mt={5}>
        <H4> Utility Beneficiaries </H4>
      </Box>

      {data.beneficiaries
        .filter(benifForFilter => benifForFilter.category == "Utility Services")
        .map((eachBeneficiaries: any) =>
          listEachBenificiary(eachBeneficiaries)
        )}

      <Box mb={3} mt={5}>
        <H4> RTA </H4>
      </Box>

      {data.beneficiaries
        .filter(benifForFilter => benifForFilter.category == "RTA")
        .map((eachBeneficiaries: any) =>
          listEachBenificiary(eachBeneficiaries)
        )}
    </List>
  );
};

export default BillPayment;
