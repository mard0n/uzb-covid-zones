import React, { useEffect } from "react";
import { UnderlineText, H2, Box, H4 } from "@mashreq-digital/ui";
import { useDispatch, useSelector } from "react-redux";
import BeneficiaryList from "../../../components/beneficiary/billPayment/BeneficiaryList";
import * as Actions from "../../../redux/actions/beneficiary/billPayment/addBillPaymentActions";
import Loader from "../../../common/loader";
import { useTranslation } from "react-i18next";
import NoBeneficiaryFound from "../../../components/beneficiary/billPayment/NoBeneficiaryFound";
import InputSearch from "../../../common/inputSearch";

export default function BillPaymentLanding(props: any) {
  const { onClickService } = props;
  const { t } = useTranslation();

  const serviceTypes = useSelector(
    (state: any) => state?.beneficiary?.billPayment?.serviceTypes
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.fetchBeneficiaryServiceType());
  }, [dispatch]);

  if (serviceTypes && serviceTypes.length > 0) {
    return (
      <>
        <Box mb={10}>
        <UnderlineText>
          <H2 noWrap>{t("billPayments.landing.title")}</H2>
        </UnderlineText>
        </Box>
        <Box mb={10}>
          <Box mb={4}><H4>{t("billPayments.landing.searchTitle")}</H4></Box>
          <InputSearch placeholder={t("billPayments.landing.searchPlaceholder")}/>
        </Box>
        <BeneficiaryList
          boxShadow
          onClickServiceTypeCallback={(name: any) => onClickService(name)}
          list={serviceTypes}
        />
      </>
    );
  } else {
    return <NoBeneficiaryFound
    title="error.title"
    desc="error.somethingWrong"
  />
  }
}
