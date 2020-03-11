import React from 'react'
import {
  List,
  H4,
  Box,
} from "@mashreq-digital/ui";
import CustomListItem from "../../../../common/listItem";
import { TELECOM_SERVICE_TYPE_CODE } from "../../../../util/constants";
import getBeneficiariesAvatar from "../../../../util/getBeneficiariesAvatar";
import { Link, useHistory } from 'react-router-dom';
import { BENIFICIARY_BILL_PAYMENT_DETAILED, BENIFICIARY_BILL_PAYMENT_ADD_EDIT } from '../../../../router/config';

let data = {
  beneficiaries: [
    {
      id: 111,
      accountNumber: "2751233956",
      nickname: "test Masood",
      category: "Telecom",
      serviceType: "DU",
      serviceTypeCode: "du-prepaid-mobile",
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

const listEachBenificiary = (eachBeneficiaries: any, history:any) => {
  // const onClickList = () => {
  //   history.push(BENIFICIARY_BILL_PAYMENT_DETAILED);
  //   console.log("onClickList -> BENIFICIARY_BILL_PAYMENT_DETAILED", BENIFICIARY_BILL_PAYMENT_DETAILED)
  // }
  return (
    <Link to={BENIFICIARY_BILL_PAYMENT_DETAILED}>
    <CustomListItem
      editCallback={(e: any)=>{e.preventDefault(); history.push(BENIFICIARY_BILL_PAYMENT_ADD_EDIT)}}
      color="primary"
      avatarImage={getBeneficiariesAvatar(eachBeneficiaries.serviceType)}
      avatarName={eachBeneficiaries.serviceType}
      nickname={eachBeneficiaries.nickname}
      accountNumber={
        eachBeneficiaries.category === "Telecom"
          ? TELECOM_SERVICE_TYPE_CODE[eachBeneficiaries.serviceTypeCode] +
            " | " +
            eachBeneficiaries.accountNumber
          : eachBeneficiaries.serviceType +
            " | " +
            eachBeneficiaries.accountNumber
      }
    />
    </Link>
  );
};

const ListServiceTypes = () => {
  const history = useHistory();
  return (
    <List>
          <Box mb={3}>
            <H4> Telecom </H4>
          </Box>
          {data.beneficiaries
            .filter(benifForFilter => benifForFilter.category === "Telecom")
            .map((eachBeneficiaries: any) =>
              listEachBenificiary(eachBeneficiaries, history)
            )}
          <Box mb={3} mt={5}>
            <H4> Utility Beneficiaries </H4>
          </Box>

          {data.beneficiaries
            .filter(
              benifForFilter => benifForFilter.category === "Utility Services"
            )
            .map((eachBeneficiaries: any) =>
              listEachBenificiary(eachBeneficiaries, history)
            )}

          <Box mb={3} mt={5}>
            <H4> RTA </H4>
          </Box>

          {data.beneficiaries
            .filter(benifForFilter => benifForFilter.category === "RTA")
            .map((eachBeneficiaries: any) =>
              listEachBenificiary(eachBeneficiaries, history)
            )}
        </List>
  )
}

export default ListServiceTypes;
