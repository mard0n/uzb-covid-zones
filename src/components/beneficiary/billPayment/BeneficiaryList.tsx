import React from "react";
import {
  Box,
  H5,
  Grid,
  // IconText,
  makeStyles,
  Theme,
  // Caption
} from "@mashreq-digital/ui";
// import { useDispatch } from "react-redux";
// import { Gift } from "@mashreq-digital/webassets";
// import { useHistory } from "react-router-dom";
// import { BENIFICIARY_BILL_PAYMENT_ADD_EDIT } from "../../../router/config";
// import { updateBeneficiaryStatus } from "../../../redux/actions/beneficiary/billPayment/addBillPaymentActions";
// import getBeneficiariesAvatar from "../../util/getBeneficiariesAvatar";
import ImageWithText from "../../../common/imageWithText";

const useStyles = makeStyles((theme: Theme) => ({
  firstIconText: {
    "& .MuiListItem-root": {
      paddingLeft: 0
    }
  },
  cursor: {
    cursor: "pointer"
  }
}));

interface BeneficiaryListProps {
  list: Array<any>;
  onClickServiceTypeCallback: any
}

const BeneficiaryList = (props: BeneficiaryListProps) => {
  const { list, onClickServiceTypeCallback } = props;
  const { firstIconText, cursor } = useStyles();
  // const dispatch = useDispatch();
  // const history = useHistory();

  const onClickServiceType = (name: string, dItem: any) => {
    // dispatch(updateBeneficiaryStatus("add"));
    if(onClickServiceTypeCallback && typeof onClickServiceTypeCallback === "function"){
    onClickServiceTypeCallback(name);
  }
    // history.push(BENIFICIARY_BILL_PAYMENT_ADD_EDIT);
  };

  return (
    <>
      {list &&
        list.length > 0 &&
        list.map((item: any, i: number) => {
          const { name, data } = item;
          return (
            <Box my={2.5} key={i}>
              <Box mb={2}>{name && <H5>{name}</H5>}</Box>
              <Grid container>
                {data &&
                  data.length > 0 &&
                  data.map((dItem: any, j: number) => {
                    const { name } = dItem;
                    if (name) {
                      return (
                        <Grid
                          key={i + "" + j}
                          item
                          xs={12}
                          sm={12}
                          md={4}
                          className={firstIconText}
                        >
                          <ImageWithText className={cursor} name={name} data={dItem} onClick={() => onClickServiceType(name, dItem)}/>
                        </Grid>
                      );
                    }
                    return null;
                  })}
              </Grid>
            </Box>
          );
        })}
    </>
  );
};

export default BeneficiaryList;
