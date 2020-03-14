import React, { useState, useEffect } from "react";
import { Box, SectionSplitter, SvgIcon } from "@mashreq-digital/ui";
import { TrashWarning } from "@mashreq-digital/webassets";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { trimLowerCaseStr, replaceStr } from "../../../../util/helper";
import { BILL_PAYMENT_DETECTION_ENDPOINT } from "../../../../network/Endpoints";
import { API } from "../../../../network";
import Loader from "../../../../common/loader";
import * as RoutePath from "../../../../router/config";
import DetailedViewLayout from "../../../../components/beneficiary/billPayment/DetailedViewLayout";
import PromptTemplate from "../../../../common/promptTemplate";
import NoBeneficiaryFound from "../../../../components/beneficiary/billPayment/NoBeneficiaryFound";
import BackButton from "../../../../common/backButton";

const DetailedView = () => {
  const { t } = useTranslation();
  let { id: beneficiaryId, service: sLabel } = useParams();
  const history = useHistory();
  /* Below code helps to get data from existing my bills react store */
  const billPaymentState = useSelector(
    (state: any) => state?.beneficiary?.billPayment
  );
  const { myBills } = billPaymentState;
  const [loader, setLoader] = useState<boolean>(true);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [bill, setBill] = useState<any>({});
  const [billServiceType, setBillServiceType] = useState("");

  useEffect(() => {
    if (beneficiaryId) {
      detailAPI();
    }
  }, [beneficiaryId]);

  const detailAPI = () => {
    let url = BILL_PAYMENT_DETECTION_ENDPOINT.replace(
      "beneficiaryId",
      beneficiaryId ? beneficiaryId : ""
    );
    API.get(url).then((val: any) => {
      setLoader(false);
      if (val && val.data && val.data.data) {
        let data = val.data.data,
          getServiceCode = data.serviceTypeCodeTel
            ? data.serviceTypeCodeTel
            : data.serviceTypeCode;
        setBillServiceType(getServiceCode);
        setBill(data);
      }
    });
  };
  /* Below code helps to get data from existing my bills react store */
  useEffect(() => {
    let currentBill: any = {},
      serLabel = sLabel ? trimLowerCaseStr(sLabel) : "";
    if (beneficiaryId && serLabel && myBills && myBills.length > 0) {
      myBills.filter((item: any) => {
        if (
          item.data &&
          item.data.length > 0 &&
          trimLowerCaseStr(item.sectionLabel) === serLabel
        ) {
          currentBill = item.data.find(
            (dItem: any) => dItem.id === Number(beneficiaryId)
          );
        }
        return {};
      });
      if (currentBill && currentBill.id) {
        const { serviceTypeCodeTel, serviceTypeCode } = currentBill;
        let getServiceCode = serviceTypeCodeTel
          ? serviceTypeCodeTel
          : serviceTypeCode;
        setBillServiceType(getServiceCode);
        setBill(currentBill);
      }
    }
  }, [beneficiaryId, sLabel, myBills]);

  const onEditCallback = (e: any) => {
    e.preventDefault();
    history.push(RoutePath.BENIFICIARY_BILL_PAYMENT_ADD_EDIT);
  };

  const onDeleteCallback = () => {
    setDeleteModal(true);
  };

  const onConfirmedDelete = () => {
    setDeleteModal(false);
    history.push(RoutePath.BENIFICIARY_BILL_PAYMENT_LANDING);
  };

  if (!loader) {
    if (billServiceType && billServiceType && bill && bill.id) {
      const deleteDesc = replaceStr(
        t("beneficiary.manage.prompts.delete.desc"),
        "--username--",
        bill.nickname
      );
      return (
        <>
          <PromptTemplate
            icon={TrashWarning}
            title={t("beneficiary.manage.prompts.delete.title")}
            desc={deleteDesc}
            modalProps={{
              open: deleteModal,
              children: <></>,
              onClose: () => {
                setDeleteModal(false);
              }
            }}
            buttonLabel={t("beneficiary.manage.prompts.delete.buttonLabel")}
            buttonProps={{
              variant: "contained",
              disabled: false,
              onClick: () => {
                onConfirmedDelete();
              }
            }}
          />
          <SectionSplitter
            height="calc(100vh - 146px)"
            top={
              <DetailedViewLayout
                onEditCallback={(e: any) => onEditCallback(e)}
                onDeleteCallback={() => onDeleteCallback()}
                bill={bill}
              />
            }
            bottom={
              <Box display="flex" justifyContent="space-between">
                <BackButton />
              </Box>
            }
          />
        </>
      );
    } else {
      return <NoBeneficiaryFound  title="beneficiary.manage.details.notFound.title"
      desc="beneficiary.manage.details.notFound.desc"/>
    }
  } else {
    return <Loader enable={true} />;
  }
};

export default DetailedView;
