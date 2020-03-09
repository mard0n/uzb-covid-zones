import React, { useState, useEffect } from "react";
import {
  Modals,
  Button,
  UnderlineText,
  H3,
  Caption
} from "@mashreq-digital/ui";
import BeneficiaryList from "../components/beneficiary/beneficiaryList";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../actions/beneficiaryActions";
import Loader from "../common/loader";

export default function Test() {
  const [open, setOpen] = useState(false);
  const serviceTypes = useSelector(
    (state: any) => state?.beneficiary?.serviceTypes
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.fetchBeneficiaryServiceType());
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (serviceTypes && serviceTypes.length > 0) {
    return (
      <>
        <Button variant="outlined" color="primary" onClick={() => handleOpen()}>
          Handle Modal
        </Button>
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
            <Caption>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
              officia assumenda animi similique earum quos esse expedita
              dignissimos quod accusantium. Rerum perferendis ea beatae illo
              placeat vero, nesciunt animi incidunt.
            </Caption>
            <BeneficiaryList list={serviceTypes} />
        </Modals>
      </>
    );
  } else {
    return <Loader enable={serviceTypes && serviceTypes.length > 0} />;
  }
}
