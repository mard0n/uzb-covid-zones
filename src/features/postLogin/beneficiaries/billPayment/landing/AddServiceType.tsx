import React, { useState, useEffect } from "react";
import { Modals, UnderlineText, H3, Caption } from "@mashreq-digital/ui";
import { useDispatch, useSelector } from "react-redux";
import BeneficiaryList from "../../../../../components/beneficiary/billPayment/BeneficiaryList";
import * as Actions from "../../../../../redux/actions/beneficiary/billPayment/addBillPaymentActions";
import Loader from "../../../../../common/loader";
import { useTranslation } from "react-i18next";

export default function AddServiceType(props: any) {
  const { openModal, handleClose, onClickService } = props;
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const serviceTypes = useSelector(
    (state: any) => state?.beneficiary?.billPayment?.serviceTypes
  );

  useEffect(() => {
    dispatch(Actions.fetchBeneficiaryServiceType());
  }, [dispatch]);

  if (serviceTypes && serviceTypes.length > 0) {
    return (
      <>
        <Loader />
        <Modals
          heading={
            <UnderlineText>
              <H3 noWrap>{t("beneficiary.landing.addBeneficiary.title")}</H3>
            </UnderlineText>
          }
          open={open}
          onBackdropClick={e => handleClose()}
          onClose={handleClose}
        >
          <>
            <Caption>{t("beneficiary.landing.addBeneficiary.desc")}</Caption>
            <BeneficiaryList
              onClickServiceTypeCallback={(name: any) => onClickService(name)}
              list={serviceTypes}
            />
          </>
        </Modals>
      </>
    );
  } else {
    return <Loader enable={serviceTypes && serviceTypes.length > 0} />;
  }
}
