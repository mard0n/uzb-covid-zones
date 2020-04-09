import React, { useState } from 'react';
import { Box } from '@mashreq-digital/ui';
import BillPaymentLanding from './Landing';
import ManageBillPayments from './manage';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from "../../../redux/actions/beneficiary/billPayment/manageBeneficiaryActions";

const BillPayments = () => {
  const [addServiceType, setAddServiceType] = useState("");
  // const [addEditModal, setAddEditModal] = useState(false);
  const dispatch = useDispatch();
  let addEditModal = useSelector((state:any) => state.beneficiary.billPayment.addEditModal);

  const onClickService = (name: any) => {
    setAddServiceType(name.toLowerCase());
    dispatch(
      Actions.editAddModel(true)
    );
  };

  const closeDialogModal = () => {
    dispatch(
      Actions.editAddModel(false)
    );
  };

  const onSuccessCallback = () => {
    dispatch(
      Actions.editAddModel(false)
    );
  };
  
  return (
    <Box>
      {/* <RechargeAmount type="etisalat"/> */}
      <BillPaymentLanding onClickService={(dItem: any) => onClickService(dItem)}/>
      {addEditModal && (
        <ManageBillPayments
          billType={addServiceType}
          open={addEditModal}
          onCloseCallback={() => closeDialogModal()}
          finalCallback={() => onSuccessCallback()}
        />
      )}
      <ManageBillPayments />
    </Box>
  )
}

export default BillPayments;
