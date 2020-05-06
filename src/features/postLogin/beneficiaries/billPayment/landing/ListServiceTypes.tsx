import React, { useEffect, Fragment, useState } from "react";
import { List, H4, Box } from "@mashreq-digital/ui";
import { GroupPlus } from "@mashreq-digital/webassets";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomListItem from "../../../../../common/listItem";
import { TELECOM_SERVICE_TYPE_CODE } from "../../../../../util/constants";
import getBeneficiariesAvatar from "../../../../../util/getBeneficiariesAvatar";
import { BENIFICIARY_BILL_PAYMENT_DETAILED } from "../../../../../router/config";
// import * as Actions from "../../../../redux/actions/beneficiary/billPayment/landingActions";
// import Loader from "../../../../common/loader";
import NoBeneficiaryFound from "../../../../../components/beneficiary/billPayment/NoBeneficiaryFound";
import {
  replaceStr,
  trimLowerCaseStr,
  getServiceTypes,
} from "../../../../../util/helper";
import { useTranslation } from "react-i18next";
// import PromptTemplate from "../../../../common/promptTemplate";
import * as Actions from "../../../../../redux/actions/beneficiary/billPayment/deleteBillPaymentActions";
import * as ManageActions from "../../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
import * as LandingActions from "../../../../../redux/actions/beneficiary/billPayment/landingActions";
import DeletePrompt from "../../../../../components/deletePrompt";
import AddUpdateDialog from "../manage/addUpdate";
import EditPrompt from "../../../../../components/editPrompt/index";
import { editBeneficiaryRequest } from "../../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
import { bills } from '../../../../../util/mock/mockedBills';

type ListServiceTypesProps = {
  addServiceType: boolean;
};

const ListServiceTypes = (props: any) => {
  const {
    addServiceType,
    onCloseDialog,
    category,
    selectedServiceType,
  } = props;
  // const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [beneficiaryItem, setBeneficiaryItem] = useState<any>({});
  const [beneficiaryItemForEdit, setBeneficiaryItemForEdit] = useState<any>({});

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteNickName, setDeleteNickName] = useState("");
  const [addEditModal, setAddEditModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isAddDialog, setIsAddDialog] = useState(false);
  const [resumeData, setResumeData] = useState({});
  const [billType, setBillType] = useState("");
  const billPaymentState = useSelector(
    (state: any) => state?.beneficiary?.billPayment
  );
  const { loading,myBills, errorCode } = billPaymentState;
  
  // let myBills = bills; // Mocked data 


  let [filteredBills, setFilteredBills] =  useState(myBills);
  let [hasFilterData, setHasFilterData] =  useState(true);


  useEffect(() => {
    
    const copiedMyBills = myBills.map((a: any) => ({ ...a }));

    if ( copiedMyBills.length!== 0 && category === "Money Transfer") {
      const fundTransfer = copiedMyBills.filter(
        (each: any) => each.sectionLabel === "Fund Transfer"
      );
      if (selectedServiceType !== "all") {
        fundTransfer[0].data = fundTransfer[0].data.filter(
          (eachListItem: any) =>
            eachListItem.serviceTypeCode === selectedServiceType
        );

        if(fundTransfer[0].data.length===0){
          setHasFilterData(false);
        }else{
          setHasFilterData(true);
        }
    }
      setFilteredBills(fundTransfer);
      console.log("ListServiceTypes -> fundTransfer yele", fundTransfer)
    }else {
      const fundTransfer = copiedMyBills.filter(
        (each: any) => each.sectionLabel !== "Fund Transfer"
      );
      setFilteredBills(fundTransfer);
    }

  }, [myBills, category, selectedServiceType]);




  useEffect(() => {
    if (addServiceType) {
      setAddEditModal(true);
      setIsAddDialog(true);
      setBillType(addServiceType);
    }
  }, [addServiceType]);

  const onConfirmedDelete = () => {
    setDeleteNickName("");
    dispatch(Actions.deleteBeneficiaryRequest(beneficiaryItem.id));
    setDeleteModal(false);
  };

  const onSubmitEdit = (formData: any) => {
    let editData: any = {
      id: beneficiaryItemForEdit.id.toString(),
      nickname: formData.nickName,
      serviceTypeCode: beneficiaryItemForEdit.serviceTypeCode,
      accountNumber: beneficiaryItemForEdit.accountNumber,
    };
    if (beneficiaryItemForEdit.serviceTypeCode === "Salik") {
      editData["salikPinCode"] = "NDIxOQ==";
      editData["savePinCode"] = false;
    }

    dispatch(editBeneficiaryRequest({ data: editData }));
    // if(errorCode || errorCode !== "" || errorCode !== undefined || errorCode !== null){
    // console.log("onSubmitEdit -> errorCode", errorCode)
    // setEditModal(false);
    // }

    // setTimeout(() => {
    //   dispatch(LandingActions.fetchBillPaymentBeneficiariesRequest())
    // }, 1000);

    // setTimeout(() => {
    //   dispatch(ManageActions.clearBeneficiaryAddNew());
    // }, 3000);

    // if(errorCode){
    // console.log("onSubmitEdit -> errorCode", errorCode)
    setEditModal(false);
    // }
  };

  const closeDialogModal = () => {
    setAddEditModal(false);
    setResumeData({});
    setBillType("");
    dispatch(ManageActions.clearBeneficiaryAddNew());
    dispatch(LandingActions.fetchBillPaymentBeneficiariesRequest());
    if (onCloseDialog && typeof onCloseDialog === "function") {
      onCloseDialog();
    }
  };

  const onSuccessCallback = () => {
    closeDialogModal();
  };

  const onResumeCallback = (data: any) => {
    setIsAddDialog(false);
    setAddEditModal(true);
    setResumeData(data);
    setBillType(getServiceTypes(data.serviceTypeCode).toLowerCase());
  };

  const listEachBenificiary = (item: any, sectionLabel: string, t: any) => {
    const {
      id,
      serviceType,
      category,
      nickname,
      activeAfter,
      serviceTypeCode,
      serviceTypeCodeTel,
      accountNumber,
      status,
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

    // console.log("listEachBenificiary -> status", nickname, status)
    if (status && status === "DRAFT") {
      listItemProps["onResumeLabel"] = t("common.action.resume");
      listItemProps["onResumeCallback"] = (e: any) => {
        e.preventDefault();
        onResumeCallback(item);
      };
    }

    let today =new Date().getTime();
    let activeDay = new Date(activeAfter).getTime();
    return (
      <Link to={toLink}>
        <CustomListItem
          {...listItemProps}
          editCallback={(e: any) => {
            e.preventDefault();
            setBeneficiaryItemForEdit(item);
            setEditModal(true);
          }}
          deleteCallback={(e: any) => {
            e.preventDefault();
            setBeneficiaryItem(item);
            setDeleteNickName(item.nickname);
            setDeleteModal(true);
          }}
          color="primary"
          avatarImage={getBeneficiariesAvatar(
            (serviceTypeCodeTel
              ? serviceTypeCodeTel
              : serviceTypeCode
            ).toLowerCase()
          )}
          avatarName={nickname}
          activeAfter={activeDay>today?activeAfter:""}
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

  let deleteDesc = "";
  if (beneficiaryItem && beneficiaryItem.id && deleteModal) {
    deleteDesc = replaceStr(
      t("beneficiary.manage.prompts.delete.desc"),
      "--username--",
      beneficiaryItem.nickname
    );
  }

  // if (!loading) {
  return (
    <>
      {addEditModal && (
        <AddUpdateDialog
          isAdd={isAddDialog}
          billType={billType}
          resumeData={resumeData}
          open={addEditModal}
          onCloseCallback={() => closeDialogModal()}
          finalCallback={() => onSuccessCallback()}
        />
      )}
      {filteredBills && filteredBills.length > 0  && hasFilterData ? (
        <>
          {deleteModal && deleteNickName && (
            <DeletePrompt
              title={t("beneficiary.manage.prompts.delete.title")}
              buttonLabel={t("beneficiary.manage.prompts.delete.buttonLabel")}
              desc={replaceStr(
                t("beneficiary.manage.prompts.delete.desc"),
                "--username--",
                deleteNickName
              )}
              openModal={deleteModal}
              onCloseModal={() => {
                setDeleteModal(false);
                setDeleteNickName("");
              }}
              buttonProps={{
                onClick: () => {
                  onConfirmedDelete();
                },
              }}
            />
          )}

          {editModal && (
            <EditPrompt
              title={t("beneficiary.manage.prompts.edit.title")}
              buttonLabel={t("beneficiary.manage.prompts.edit.buttonLabel")}
              desc={""}
              beneficiaryItemForEdit={beneficiaryItemForEdit}
              openModal={editModal}
              onCloseModal={() => {
                // dispatch(ManageActions.clearBeneficiaryAddNew());
                setEditModal(false);
              }}
              onSubmitEdit={(val: any) => onSubmitEdit(val)}
            />
          )}
          {filteredBills.map((bill: any, i: number) => {
            const { sectionLabel, data } = bill;

            return (
              <List key={i}>
               
                <Box mb={3}>
                 { category !== "Money Transfer"? <H4> {sectionLabel} </H4> :null}
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
      ) : (
        <NoBeneficiaryFound
          icon={GroupPlus}
          title="beneficiary.landing.notFound.title"
          desc="beneficiary.landing.notFound.desc"
        />
      )}
    </>
  );
  // }
  // return <Loader enable={false} />;
};

export default ListServiceTypes;
