import React, { useEffect, Fragment } from "react";
import { List, H4, Box } from "@mashreq-digital/ui";
import { GroupPlus } from "@mashreq-digital/webassets";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomListItem from "../../../../common/listItem";
import { TELECOM_SERVICE_TYPE_CODE } from "../../../../util/constants";
import getBeneficiariesAvatar from "../../../../util/getBeneficiariesAvatar";
import { BENIFICIARY_BILL_PAYMENT_DETAILED } from "../../../../router/config";
// import * as Actions from "../../../../redux/actions/beneficiary/billPayment/landingActions";
import Loader from "../../../../common/loader";
import NoBeneficiaryFound from "../../../../components/beneficiary/billPayment/NoBeneficiaryFound";
import { replaceStr, trimLowerCaseStr } from "../../../../util/helper";
import { useTranslation } from "react-i18next";

// let data = {
//   beneficiaries: [
//     {
//       id: 111,
//       accountNumber: "2751233956",
//       nickname: "test Masood",
//       category: "Telecom",
//       serviceType: "DU",
//       serviceTypeCode: "du-prepaid-mobile",
//       status: "ACTIVE",
//       createdDate: "2020-03-05T07:35:14.009Z",
//       activeAfter: "2020-03-05T13:54:23.105Z"
//     },

//     {
//       id: 124,
//       accountNumber: "2751233956",
//       nickname: "Lav_1_SEWAa",
//       category: "Utility Services",
//       serviceType: "SEWA",
//       serviceTypeCode: "SEWA",
//       status: "ACTIVE",
//       createdDate: "2020-03-05T07:35:14.009Z",
//       activeAfter: "2020-03-05T13:54:23.105Z"
//     },
//     {
//       id: 125,
//       accountNumber: "220000110726",
//       nickname: "Lav_1_FEWA",
//       category: "Utility Services",
//       serviceType: "FEWA",
//       serviceTypeCode: "FEWA",
//       status: "ACTIVE",
//       createdDate: "2020-03-05T07:55:51.329Z",
//       activeAfter: "2020-03-05T08:05:19.395Z"
//     },
//     {
//       id: 10148,
//       accountNumber: "2021775712",
//       nickname: "Anita",
//       category: "Utility Services",
//       serviceType: "DEWA",
//       serviceTypeCode: "DEWA",
//       status: "DRAFT",
//       createdDate: "2020-03-08T09:11:06.823Z"
//     },
//     {
//       id: 1212,
//       accountNumber: "2021775712",
//       nickname: "HONDA",
//       category: "RTA",
//       serviceType: "SALIK",
//       serviceTypeCode: "SALIK",
//       status: "DRAFT",
//       createdDate: "2020-03-08T09:11:06.823Z"
//     }
//   ]
// };

const listEachBenificiary = (item: any, sectionLabel: string, t:any) => {
  const {
    id,
    serviceType,
    category,
    nickname,
    serviceTypeCode,
    serviceTypeCodeTel,
    accountNumber,
    status
  } = item;
  const toLink: any = replaceStr(
    BENIFICIARY_BILL_PAYMENT_DETAILED,
    ":service/:id",
    `${trimLowerCaseStr(sectionLabel)}/${id}`
  );
  let listItemProps: any = {};

  // const onClickList = () => {
  //   history.push(BENIFICIARY_BILL_PAYMENT_DETAILED);
  // }

  if (status && status === "DRAFT") {
    listItemProps["onResumeLabel"] = t('common.action.resume');
    listItemProps["onResumeCallback"] = () => {};
  }

  return (
    <Link to={toLink}>
      <CustomListItem
        {...listItemProps}
        // editCallback={(e: any)=>{e.preventDefault(); history.push(BENIFICIARY_BILL_PAYMENT_ADD_EDIT)}}
        color="primary"
        avatarImage={getBeneficiariesAvatar(
          (serviceTypeCodeTel
            ? serviceTypeCodeTel
            : serviceTypeCode
          ).toLowerCase()
        )}
        avatarName={serviceType}
        nickname={nickname}
        accountNumber={
          category === "Telecom"
            ? TELECOM_SERVICE_TYPE_CODE[serviceTypeCode] + " | " + accountNumber
            : serviceType + " | " + accountNumber
        }
      />
    </Link>
  );
};

const ListServiceTypes = () => {
  // const history = useHistory();
  // const dispatch = useDispatch();
  const {t} = useTranslation();

  const billPaymentState = useSelector(
    (state: any) => state?.beneficiary?.billPayment
  );
  const { loading, myBills } = billPaymentState;

  // useEffect(() => {
  //   dispatch(Actions.fetchBillPaymentBeneficiariesRequest());
  // }, []);

  if (!loading) {
    if (myBills && myBills.length > 0) {
      return myBills.map((bill: any, i: number) => {
        const { sectionLabel, data } = bill;
        return (
          <List key={i}>
            <Box mb={3}>
              <H4> {sectionLabel} </H4>
            </Box>
            {data &&
              data.length > 0 &&
              data.map((item: any, j: number) => {
                return (
                  <Fragment key={j + "service-type"}>
                    {listEachBenificiary(item, sectionLabel, t)}
                  </Fragment>
                );
              })}
          </List>
        );
      });
    }
    return (
      <NoBeneficiaryFound
        icon={GroupPlus}
        title="beneficiary.landing.notFound.title"
        desc="beneficiary.landing.notFound.desc"
      />
    );
  }
  return <Loader enable={true} />;
};

export default ListServiceTypes;
