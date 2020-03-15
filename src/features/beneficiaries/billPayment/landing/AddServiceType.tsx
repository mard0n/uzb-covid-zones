import React, { useState, useEffect } from "react";
import {
  Modals,
  UnderlineText,
  H3,
  Caption
} from "@mashreq-digital/ui";
import { useDispatch, useSelector } from "react-redux";
import BeneficiaryList from "../../../../components/beneficiary/billPayment/BeneficiaryList";
import * as Actions from "../../../../redux/actions/beneficiary/billPayment/addBillPaymentActions";
import Loader from "../../../../common/loader";

export default function AddServiceType(props: any) {
  const { openModal, handleClose, onClickService } = props;
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    setOpen(openModal);
  },[openModal]);

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
        <Loader />
        <Modals
          heading={
            <UnderlineText>
              <H3 noWrap>Add a bill payment beneficiary</H3>
            </UnderlineText>
          }
          open={open}
          onBackdropClick={e => handleClose()}
          onClose={handleClose}
        >
           <>
            <Caption>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
              officia assumenda animi similique earum quos esse expedita
              dignissimos quod accusantium. Rerum perferendis ea beatae illo
              placeat vero, nesciunt animi incidunt.
            </Caption>
            <BeneficiaryList onClickServiceTypeCallback={(name: any)=>onClickService(name)} list={serviceTypes} />
            </>
        </Modals>
            
      </>
    );
  } else {
    return <Loader enable={serviceTypes && serviceTypes.length > 0} />;
  }
}
