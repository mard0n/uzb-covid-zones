import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Snackbar,
  Toast,
  createStyles,
  UnderlineText,
  Theme,
  makeStyles,
  H2,
  Chip
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import ListServiceTypes from "./ListServiceTypes";
import AddServiceType from "./AddServiceType";
import FilledCheckBox from "../../../../../common/filledCheckbox";
import * as Actions from "../../../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";
import InputSearch from "../../../../../common/inputSearch";
import { MONEY_TRANSFER_BENI_FILTER } from '../../../../../util/constants';
import * as RoutePath from '../../../../../router/config';
import { useHistory } from "react-router-dom";




const useStyles = makeStyles((theme: Theme) => ({
  activeChip: {
    background: "rgba(255, 94, 0, 0.1)",
    border: "1px solid rgb(255, 94, 0)",
    borderRadius: "16px",
    color: "rgb(255, 94, 0)"
  },
  normalChip: {
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgb(173, 184, 191)",
    borderRadius: "16px",
    color: "rgb(173, 184, 191)"

  },
}));

const BillPaymentLanding = (props: any) => {
  let dispatch = useDispatch();
  const history = useHistory();
  
  let {normalChip,activeChip} = useStyles();

  const billPaymentState = useSelector(
    (state: any) => state?.beneficiary?.billPayment
  );

  const { errorCode } = billPaymentState;
  const [switchValue, setSwitchValue] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("all");

  const [openModal, setOpenModal] = useState(false);
  const [openMoneyTransferModal, setOpenMoneyTransferModal] = useState(false);

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
    if(switchValue === "Money Transfer")
    {
    setOpenMoneyTransferModal(true);
    }else{
    setOpenModal(true);
 } 
  };

  const onCloseErrorSnackBar = (reason: any) => {
    dispatch(Actions.addUpdateBeneficiaryFailure(""));
    setOpenErrorToast(false);
  };

  const handleClose = () => {
    if(switchValue === "Money Transfer")
    {
    setOpenMoneyTransferModal(false);
    }else{
    setOpenModal(false);
 } 
  };

  const onClickService = (name: any) => {
    setAddServiceType(name.toLowerCase());
    if(switchValue === "Money Transfer")
    {
    setOpenMoneyTransferModal(false);
    }else{
    setOpenModal(false);
 }

  };

  const onCloseDialog = () => {
    setAddServiceType("");
  };

  const routeUAE = () => {
    history.push(RoutePath.BENIFICIARY_MONEY_TRANSFER_JOURNEY_LOCAL);
  }

  return (
    <Box>
      <Button onClick={routeUAE}>Local UAE Account</Button>
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
            <FilledCheckBox
              options={tabs}
              init="Bill Payments"
              onClickCallback={(data: any) => {
                console.log("BillPaymentLanding -> data", data);
                setSwitchValue(data);
              }}
            />
          </Box>
        )}

        <Grid container justify="space-between" alignItems="center">
          <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>


          {switchValue === "Money Transfer" ?   <Box>
          {MONEY_TRANSFER_BENI_FILTER.map((each: any) => {
            return(
              <Box ml={3} display="inline">
            <Chip
              label={each.label}
              variant="outlined"
              onClick={() => {
                setSelectedServiceType(each.serviceTypeCode);
              }}
              className={each.serviceTypeCode === selectedServiceType?activeChip:normalChip}
            />
              </Box>
            );
          })}
        </Box> : 
        <InputSearch
        placeholder={t("beneficiary.landing.searchPlaceholder")}
      />      
      }
   


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
          category={switchValue}
          selectedServiceType={selectedServiceType}
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
