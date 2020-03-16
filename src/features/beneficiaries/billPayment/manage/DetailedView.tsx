import React, { useState, useEffect } from "react";
import { Box, SectionSplitter } from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { trimLowerCaseStr, replaceStr } from "../../../../util/helper";
import { BILL_PAYMENT_DETECTION_ENDPOINT } from "../../../../network/Endpoints";
import { API } from "../../../../network";
import Loader from "../../../../common/loader";
import * as RoutePath from "../../../../router/config";
import DetailedViewLayout from "../../../../components/beneficiary/billPayment/DetailedViewLayout";
import NoBeneficiaryFound from "../../../../components/beneficiary/billPayment/NoBeneficiaryFound";
import BackButton from "../../../../common/backButton";
import * as Actions from "../../../../redux/actions/beneficiary/billPayment/deleteBillPaymentActions";
import { addUpdateBeneficiaryRequest } from "../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
import EditPrompt from "../../../../components/editPrompt/index";
import DeletePrompt from "../../../../components/deletePrompt";

const DetailedView = () => {
  const { t } = useTranslation();
  let { id: beneficiaryId, service: sLabel } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  /* Below code helps to get data from existing my bills react store */
  const billPaymentState = useSelector(
    (state: any) => state?.beneficiary?.billPayment
  );
  const { myBills, loading } = billPaymentState;
  const [loader, setLoader] = useState<boolean>(true);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [bill, setBill] = useState<any>({});
  const [billServiceType, setBillServiceType] = useState("");
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    if (beneficiaryId) {
      detailAPI();
    }
  }, [beneficiaryId, detailAPI]);

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
      setEditModal(true);
  };

  const onDeleteCallback = () => {
    setDeleteModal(true);
  };


  const onSubmitEdit = (formData:any) => {
    let editData = {
      id: bill.id.toString(),
      nickname: formData.nickName,
      serviceTypeCode: bill.serviceTypeCode,
      accountNumber: bill.accountNumber
    };
    console.log("onSubmitEdit -> editData", editData)
    dispatch(addUpdateBeneficiaryRequest({ updateMode: true, "data":editData }));
    setEditModal(false);
  };



  const onConfirmedDelete = () => {
    dispatch(Actions.deleteBeneficiaryRequest(bill.id));
    setDeleteModal(false);
    if(!loading) {
      history.push(RoutePath.BENIFICIARY_BILL_PAYMENT_LANDING);
    }
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
          {deleteModal && 
            <DeletePrompt
                  title={t("beneficiary.manage.prompts.delete.title")}
                  buttonLabel={t("beneficiary.manage.prompts.delete.buttonLabel")}
                  desc={deleteDesc}
                  openModal={deleteModal}
                  onCloseModal={() => setDeleteModal(false)}
                  buttonProps={{
                    onClick: () => {
                      onConfirmedDelete();
                    }
                  }}
                />
              }

         {editModal && <EditPrompt
            title={t("beneficiary.manage.prompts.edit.title")}
            buttonLabel={t("beneficiary.manage.prompts.edit.buttonLabel")}
            desc={deleteDesc}
            beneficiaryItemForEdit = {bill}
            openModal={editModal}
            onCloseModal={() => setEditModal(false)}
            onSubmitEdit = {onSubmitEdit}
          />}
       
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
