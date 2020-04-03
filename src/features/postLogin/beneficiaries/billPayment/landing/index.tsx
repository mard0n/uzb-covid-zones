import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Snackbar,
  Toast,
  UnderlineText,
  H2
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import ListServiceTypes from "./ListServiceTypes";
import AddServiceType from "./AddServiceType";
import FilledCheckBox from "../../../../../common/filledCheckbox";
import * as Actions from "../../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
import InputSearch from "../../../../../common/inputSearch";

const BillPaymentLanding = (props: any) => {
  let dispatch = useDispatch();

  const billPaymentState = useSelector(
    (state: any) => state?.beneficiary?.billPayment
  );

  const { errorCode } = billPaymentState;

  const [openModal, setOpenModal] = useState(false);
  const [addServiceType, setAddServiceType] = useState("");
  const { t } = useTranslation();
  const tabs: Array<string> = t("beneficiary.landing.tabs", {
    returnObjects: true
  });

  const [openErrorToast, setOpenErrorToast] = useState(true);
  // console.log("BillPaymentLanding -> errorCode", errorCode);

  // useEffect(() => {
  //   if(!errorCode){
  //     console.log("BillPaymentLanding -> errorCode", errorCode)
  //     setOpenErrorToast(true);
  //   }
  // });

  const handleOpen = () => {
    setOpenModal(true);
  };

  const onCloseErrorSnackBar = (reason: any) => {
    dispatch(Actions.addUpdateBeneficiaryFailure(""));
    setOpenErrorToast(false);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const onClickService = (name: any) => {
    setAddServiceType(name.toLowerCase());
    setOpenModal(false);
  };

  const onCloseDialog = () => {
    setAddServiceType("");
  };

  return (
    <Box>
      {openModal && (
        <AddServiceType
          openModal={openModal}
          onClickService={(dItem: any) => onClickService(dItem)}
          handleClose={handleClose}
        />
      )}
      <Box>
        <UnderlineText color="primary">
          <H2>{t("beneficiary.landing.title")}</H2>
        </UnderlineText>
      </Box>
      <Box mb={5}>
        {tabs && tabs.length > 0 && (
          <Box my={5}>
            <FilledCheckBox options={tabs} init="Bill Payments" />
          </Box>
        )}
        <Grid container justify="space-between" alignItems="center">
          <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
            <InputSearch placeholder={t("beneficiary.landing.searchPlaceholder")} />
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen()}
              >
                {t("beneficiary.landing.addButtonLabel")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <ListServiceTypes
          addServiceType={addServiceType}
          onCloseDialog={onCloseDialog}
        />
      </Box>

      {errorCode && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={openErrorToast}
          autoHideDuration={5000}
          onClose={onCloseErrorSnackBar}
        >
          <Toast
            severity={"error"}
            onClose={onCloseErrorSnackBar}
            isNotification={openErrorToast}
            icon={false}
          >
            {"Error messages : " + errorCode}
          </Toast>
        </Snackbar>
      )}
    </Box>
  );
};

export default BillPaymentLanding;
