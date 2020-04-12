import React, { useEffect, useState } from "react";
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
// import ImageWithText from "../../../common/imageWithText";
import BeneficiaryCardList from "./BeneficiaryListCard";

const useStyles = makeStyles((theme: Theme) => ({
  firstIconText: {
    "& .MuiListItem-root": {
      paddingLeft: 0
    }
  },
  boxShadowStyle: {
    boxShadow: "0px 8px 12px 0px rgba(0, 0, 0, 0.06)",
  },
  imageTextStyle: {
    minWidth: "192px",
    alignItems: "center",
    cursor: "pointer",
    padding: `${theme.spacing(1.7)}px ${theme.spacing(4.2)}px`,
    borderRadius: "6px",
    marginRight: `${theme.spacing(3.4)}px`,
    "&>div" : {
      display: "flex"
    }
  }
}));

interface BeneficiaryListProps {
  list: Array<any>;
  onClickServiceTypeCallback: any;
  boxShadow?: boolean;
}

const BeneficiaryList = (props: BeneficiaryListProps) => {
  const { list, onClickServiceTypeCallback, boxShadow } = props;
  const { boxShadowStyle, imageTextStyle } = useStyles(props);
  const [listItems, setListItems] = useState([]);
  // firstIconText,
  // const dispatch = useDispatch();
  // const history = useHistory();

  useEffect(()=>{
    let cloneList: any = [...list];
    if(cloneList && cloneList.length > 0) {
      let cardsObj = {
        name: "Credit Card Payments",
        data: [{name: "My Mashreq Credit Card", code: "AADC"}, 
        {name: "Another Mashreq Credit Card", code: "AADC"}, 
        {name: "Non-Mashreq Credit Card",   code: "AADC"}]
      };
      cloneList[cloneList.length] = cardsObj;
      setListItems(cloneList);    
    }
  },[list]);

  const onClickServiceType = (name: string, dItem: any) => {
    // dispatch(updateBeneficiaryStatus("add"));
    if(onClickServiceTypeCallback && typeof onClickServiceTypeCallback === "function"){
    onClickServiceTypeCallback(name);
  }
    // history.push(BENIFICIARY_BILL_PAYMENT_ADD_EDIT);
  };

  return (
    <>
      {listItems &&
        listItems.length > 0 &&
        listItems.map((item: any, i: number) => {
          const { name, data } = item;
          return (
            <Box my={5} key={i}>
              <Box mb={2}>{name && <H5>{name}</H5>}</Box>
              {/* <Grid container> */}
              <BeneficiaryCardList data={data} boxShadow={boxShadow} onClick={onClickServiceType}/>
              {/* <Box display="flex" flexWrap="wrap">
                {data &&
                  data.length > 0 &&
                  data.map((dItem: any, j: number) => {
                    const { name } = dItem;
                    if (name) {
                      return (
                        // <Grid
                        //   key={i + "" + j}
                        //   item
                        //   xs={12}
                        //   sm={12}
                        //   md={4}
                        //   className={firstIconText}
                        // >
                          <ImageWithText key={j+"beneficiaryImageList"} className={`${imageTextStyle} ${boxShadow ? boxShadowStyle : ''}`} name={name} data={dItem} onClick={() => onClickServiceType(name, dItem)}/>
                          
                        // </Grid>
                      );
                    }
                    return null;
                  })}
                  </Box> */}
              {/* </Grid> */}
            </Box>
          );
        })}
    </>
  );
};

export default BeneficiaryList;
