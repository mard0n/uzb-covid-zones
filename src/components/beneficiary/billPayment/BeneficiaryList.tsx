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
import { useDispatch } from "react-redux";
// import { Gift } from "@mashreq-digital/webassets";
// import { useHistory } from "react-router-dom";
// import { BENIFICIARY_BILL_PAYMENT_ADD_EDIT } from "../../../router/config";
import { updateBeneficiaryStatus } from "../../../redux/actions/beneficiary/billPayment/addBillPaymentActions";
// import getBeneficiariesAvatar from "../../util/getBeneficiariesAvatar";
import ImageWithText from "../../../common/imageWithText";

const useStyles = makeStyles((theme: Theme) => ({
  firstIconText: {
    "& .MuiListItem-root": {
      paddingLeft: 0
    }
  }
}));

interface BeneficiaryListProps {
  list: Array<any>;
}

const BeneficiaryList = (props: BeneficiaryListProps) => {
  const { list } = props;
  const { firstIconText } = useStyles();
  const dispatch = useDispatch();
  // const history = useHistory();

  const onClickServiceType = (dItem: any) => {
    dispatch(updateBeneficiaryStatus("add"));
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
                          <ImageWithText name={name} data={dItem} onClick={() => onClickServiceType(dItem)}/>
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
