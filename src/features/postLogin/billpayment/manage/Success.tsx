import React, { useState } from "react";
import {
  UnderlineText,
  Button,
  Box,
  H2,
  H4,
  Caption,
  SectionSplitter,
  SvgIcon,
} from "@mashreq-digital/ui";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Check, Phone24 } from "@mashreq-digital/webassets";
// import getBeneficiariesAvatar from "../../../../util/getBeneficiariesAvatar";
import SucessFailureIcon from "../../../../common/successFailureIcon";
import ReviewAmountType from "../../../../components/billpayment/reviewAmountType";
import CardPayNow from "../../../../common/card/CardPayNow";
import SaveBeneficiaryPrompt from "./saveBeneficiary";
import * as Actions from "../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
import SuccessModel from "./saveBeneficiary/SuccessModel";

type SuccessProps = {
  success: boolean;
  type: string;
  title: string;
  subTitle?: string;
  data?: any;
  onDoneCallback?: any;
  onReceiptCallback?: any;
};

const Success = (props: SuccessProps) => {
  // const { capitalize, cardPay } = useStyles();
  const {
    type,
    data,
    onDoneCallback,
    onReceiptCallback,
    title,
    success,
    subTitle,
  } = props;
  const { t } = useTranslation();
  const [editModal, setEditModal] = useState(false);
  const [sucessModel, setSucessModel] = useState(false);
  const [saveData, setSaveData] = useState({});
  const dispatch = useDispatch();

  const beneficiaryItemForEdit: any = {
    accountNumber: data.accountNumber,
    nickname: "",
    serviceTypeCode: data.serviceTypeCode,
  };

  const SaveBenificiarySubmit = (formData: any) => {
    setSaveData ({
      nickname: formData.nickName,
      serviceTypeCode: data.serviceTypeCode,
      accountNumber: data.accountNumber,
    });
    if (data.serviceTypeCode === "Salik") {
      setSaveData({
        ...saveData,
        salikPinCode: "NDIxOQ==",
        savePinCode: false,
      });

    }
    console.log("SaveBenificiarySubmit -> saveData", saveData);
    dispatch(
      Actions.addUpdateBeneficiaryRequest({ updateMode: false, data: saveData })
    );
    setEditModal(false);
    setSucessModel(true);
  };

  return (
    <SectionSplitter
      height="calc(100vh - 250px)"
      top={
        <>
          <SucessFailureIcon success={success} warning/>
          <UnderlineText color="primary">
            <H2>{title}</H2>
          </UnderlineText>

          {subTitle && (
            <Box mt={6} mb={6}>
              <Caption>{subTitle}</Caption>
            </Box>
          )}
          {success ? (data && type && (
            <>
              <ReviewAmountType
                data={data}
                type={type}
                leftIcon={Check}
                isSuccess
                title={"Debited"}
              />
              <Box mt={6}>
              <Button onClick={() => setEditModal(true)}>
                <CardPayNow
                  arrow={true}
                  heading={t(`billPayments.steps.confirmation.payment`)}
                  subheading={t(`billPayments.steps.confirmation.saveIt`)}
                />
                </Button>
              </Box>
            </>
          ))
          :
            <>
            <Box mt={10} display="flex" alignItems="center">
            <H4>{t(`billPayments.steps.confirmation.contactus`)} </H4>
            </Box>
            <Box mt={5} mb={5} display="flex" alignItems="center">
            <CardPayNow
              icon={<SvgIcon color="primary" component={Phone24} />}
              style={{ justifyContent: "space-evenly" }}
              arrow={true}
              heading={t(`billPayments.steps.confirmation.customerCare`)}
              subheading={t(`billPayments.steps.confirmation.support`)}
            />
            </Box>
          </>
          }

          {editModal && (
            <SaveBeneficiaryPrompt
              title={t("beneficiary.manage.prompts.edit.titleSvaveBenificiary")}
              buttonLabel={t("beneficiary.manage.prompts.edit.buttonLabel2")}
              desc={""}
              beneficiaryItemForSave={beneficiaryItemForEdit}
              openModal={editModal}
              onCloseModal={() => {
                // dispatch(ManageActions.clearBeneficiaryAddNew());
                setEditModal(false);
              }}
              onSubmitSave={(val: any) => SaveBenificiarySubmit(val)}
            />
          )}

          {sucessModel && ( <SuccessModel data={saveData} />)}
        </>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">
          <Box>
          {success && (
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                if (
                  onReceiptCallback &&
                  typeof onReceiptCallback === "function"
                ) {
                  onReceiptCallback();
                }
              }}
              color="primary"
            >
              {t(`common.action.receipt`)}
            </Button>
          )}
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => {
              onDoneCallback();
            }}
            color="primary"
          >
            {t(`common.action.done`)}
          </Button>
        </Box>
      }
    />
  );
};

Success.defaultProps = {
  success: true,
};

export default Success;
