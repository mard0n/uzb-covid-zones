import React, { useState } from 'react';
import { Box } from '@mashreq-digital/ui';
import BillPaymentLanding from './Landing';
import ManageBillPayments from './manage';

const BillPayments = () => {
  const [addServiceType, setAddServiceType] = useState("");
  const [addEditModal, setAddEditModal] = useState(false);

  const onClickService = (name: any) => {
    setAddServiceType(name.toLowerCase());
    setAddEditModal(true);
  };

  const closeDialogModal = () => {
    setAddEditModal(false);
  };

  const onSuccessCallback = () => {
    setAddEditModal(false);
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
