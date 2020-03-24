import React, { useEffect } from "react";
import { UnderlineText, H2, Box } from "@mashreq-digital/ui";
import { useDispatch, useSelector } from "react-redux";
import BeneficiaryList from "../../../components/beneficiary/billPayment/BeneficiaryList";
import * as Actions from "../../../redux/actions/beneficiary/billPayment/addBillPaymentActions";
import Loader from "../../../common/loader";
import { useTranslation } from "react-i18next";

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
        <BeneficiaryList
          onClickServiceTypeCallback={(name: any) => onClickService(name)}
          list={serviceTypes}
        />
      </>
    );
  } else {
    return <Loader enable={serviceTypes && serviceTypes.length > 0} />;
  }
}
