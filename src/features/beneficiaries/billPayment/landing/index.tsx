import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import SearchBeneficiary from "../landing/Search";
import ListServiceTypes from "../landing/ListServiceTypes";
import AddServiceType from "../landing/AddServiceType";


const BillPaymentLanding = (props: any) => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  const handleOpen = () => {
    setOpenModal(true);
  }

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      {openModal && 
      <AddServiceType openModal={openModal} handleClose={handleClose}/>
    }
      <Box mb={5}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
            <SearchBeneficiary/>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                {t("beneficiary.landing.addButtonLabel")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <ListServiceTypes />
      </Box>
    </Box>
  );
};

export default BillPaymentLanding;
