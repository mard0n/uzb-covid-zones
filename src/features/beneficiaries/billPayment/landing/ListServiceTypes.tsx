import React, { useEffect, Fragment, useState } from "react";
import { List, H4, Box } from "@mashreq-digital/ui";
import { GroupPlus } from "@mashreq-digital/webassets";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomListItem from "../../../../common/listItem";
import { TELECOM_SERVICE_TYPE_CODE } from "../../../../util/constants";
import getBeneficiariesAvatar from "../../../../util/getBeneficiariesAvatar";
import { BENIFICIARY_BILL_PAYMENT_DETAILED } from "../../../../router/config";
// import * as Actions from "../../../../redux/actions/beneficiary/billPayment/landingActions";
// import Loader from "../../../../common/loader";
import NoBeneficiaryFound from "../../../../components/beneficiary/billPayment/NoBeneficiaryFound";
import { replaceStr, trimLowerCaseStr } from "../../../../util/helper";
import { useTranslation } from "react-i18next";
// import PromptTemplate from "../../../../common/promptTemplate";
import * as Actions from "../../../../redux/actions/beneficiary/billPayment/deleteBillPaymentActions";
import DeletePrompt from "../../../../components/deletePrompt";
import AddUpdateDialog from "../manage/addUpdate";
import EditPrompt from "../../../../components/editPrompt/index";
import { addUpdateBeneficiaryRequest } from "../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";

type ListServiceTypesProps = {
  addServiceType: boolean;
};

const ListServiceTypes = (props: any) => {
  const { addServiceType, onCloseDialog } = props;
  // const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [beneficiaryItem, setBeneficiaryItem] = useState<any>({});
  const [beneficiaryItemForEdit, setBeneficiaryItemForEdit] = useState<any>({});

  const [deleteModal, setDeleteModal] = useState(false);
  const [addEditModal, setAddEditModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const billPaymentState = useSelector(
    (state: any) => state?.beneficiary?.billPayment
  );
  const { loading, myBills } = billPaymentState;

  // useEffect(() => {
  //   dispatch(Actions.fetchBillPaymentBeneficiariesRequest());
  // }, []);

  useEffect(() => {
    if (addServiceType) {
      setAddEditModal(true);
    }
  }, [addServiceType]);

  const onConfirmedDelete = () => {
    console.log("beneficiaryItem ", beneficiaryItem);
    dispatch(Actions.deleteBeneficiaryRequest(beneficiaryItem.id));
    setDeleteModal(false);
  };



  const onSubmitEdit = (formData:any) => {
    console.log("onSubmitEdit --> beneficiaryItem",beneficiaryItemForEdit);
    let editData = {
      id: beneficiaryItemForEdit.id.toString(),
      nickname: formData.nickName,
      serviceTypeCode: beneficiaryItemForEdit.serviceTypeCode,
      accountNumber: beneficiaryItemForEdit.accountNumber
    };
    console.log("onSubmitEdit -> editData", editData)
    dispatch(addUpdateBeneficiaryRequest({ updateMode: true, "data":editData }));
    setEditModal(false);
  };




  const closeDialogModal = () => {
    setAddEditModal(false);
    if (onCloseDialog && typeof onCloseDialog === "function") {
      onCloseDialog();
    }
  };

  const onSuccessCallback = () => {
    closeDialogModal();
  };

  const listEachBenificiary = (item: any, sectionLabel: string, t: any) => {
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
      listItemProps["onResumeLabel"] = t("common.action.resume");
      listItemProps["onResumeCallback"] = () => {};
    }

    return (
      <Link to={toLink}>
        <CustomListItem
          {...listItemProps}
          editCallback={(e: any) => {
            e.preventDefault();
            setBeneficiaryItemForEdit(item);
            console.log("listEachBenificiary -> editCallback");
            setEditModal(true);
          }}
          deleteCallback={(e: any) => {
            e.preventDefault();
            setBeneficiaryItem(item);
            setDeleteModal(true);
          }}
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
              ? TELECOM_SERVICE_TYPE_CODE[serviceTypeCode] +
                " | " +
                accountNumber
              : serviceType + " | " + accountNumber
          }
        />
      </Link>
    );
  };

  // if (!loading) {
  if (myBills && myBills.length > 0) {
    let deleteDesc = "";
    if (beneficiaryItem && beneficiaryItem.id && deleteModal) {
      deleteDesc = replaceStr(
        t("beneficiary.manage.prompts.delete.desc"),
        "--username--",
        beneficiaryItem.nickname
      );
    }
    return (
      <>
        {addEditModal && (
          <AddUpdateDialog
            isAdd={true}
            billType={addServiceType}
            fullScreen
            open={addEditModal}
            onCloseCallback={() => closeDialogModal()}
            finalCallback={() => onSuccessCallback()}
          />
        )}
        {deleteModal && (
          <DeletePrompt
            title={t("beneficiary.manage.prompts.delete.title")}
            buttonLabel={t("beneficiary.manage.prompts.delete.buttonLabel")}
            desc={""}
            openModal={deleteModal}
            onCloseModal={() => setDeleteModal(false)}
            buttonProps={{
              onClick: () => {
                onConfirmedDelete();
              }
            }}
          />
        )}

        {editModal && (
          <EditPrompt
            title={t("beneficiary.manage.prompts.edit.title")}
            buttonLabel={t("beneficiary.manage.prompts.edit.buttonLabel")}
            desc={deleteDesc}
            beneficiaryItemForEdit = {beneficiaryItemForEdit}
            openModal={editModal}
            onCloseModal={() => setEditModal(false)}
            onSubmitEdit = {onSubmitEdit}
          />
        )}

        {myBills.map((bill: any, i: number) => {
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
        })}
      </>
    );
  } else {
    return (
      <NoBeneficiaryFound
        icon={GroupPlus}
        title="beneficiary.landing.notFound.title"
        desc="beneficiary.landing.notFound.desc"
      />
    );
  }
  // }
  // return <Loader enable={false} />;
};

export default ListServiceTypes;
