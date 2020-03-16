import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Snackbar,
  Toast
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import SearchBeneficiary from "../landing/Search";
import ListServiceTypes from "../landing/ListServiceTypes";
import AddServiceType from "../landing/AddServiceType";


const BillPaymentLanding = (props: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [addServiceType, setAddServiceType] = useState('');
  const { t } = useTranslation();

  const handleOpen = () => {
    setOpenModal(true);
  }

  const handleClose = () => {
    setOpenModal(false);
  };

  const onClickService = (name: any) => {
    setAddServiceType(name.toLowerCase());
    setOpenModal(false);
  };

  const onCloseDialog = () => {
    setAddServiceType('');
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
      <Box mb={5}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
            <SearchBeneficiary />
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

      {
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={true}
          autoHideDuration={1000}
          onClose={() => {}}
        >
          <Toast
            severity={"error"}
            onClose={() => {}}
            isNotification={true}
            icon={false}
          >
            {"asdasdsd"}
          </Toast>
        </Snackbar>
      }
    </Box>
  );
};

export default BillPaymentLanding;
