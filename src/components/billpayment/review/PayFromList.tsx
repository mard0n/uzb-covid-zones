import React, { useState, useEffect, Fragment } from 'react';
import PayListItem from "./payList";
import {
  H4,
  Button,
  Box,
  makeStyles
} from "@mashreq-digital/ui";
import { API } from '../../../network';
import * as Endpoint from '../../../network/Endpoints';
import { useTranslation } from 'react-i18next';

type PayFromListProps = {
  onChangeList?: any
}

const useStyles = makeStyles(()=>({
  dropListStyle: {
    zIndex: 2, 
    overflow: "auto",
    position: "absolute",
    top: "auto",
    width: "100%",
    backgroundColor: "#fff"
  }
}))

const PayFromList = (props: PayFromListProps) => {
  const { onChangeList } = props;
  const {t} = useTranslation();
  const { dropListStyle } = useStyles();
  const [active, setActive] = useState<any>({});
  const [suggestionList, setSuggestionList] = useState<any>([]);
  const [dropList, setDropList] = useState(false);

  useEffect(()=>{
    let url = Endpoint.BILL_PAYMENT_SOURCE_ACCOUNTS_ENDPOINT, data={
      minAmountToBeAvailable : "200",
      suggestAccountOrCard : true
    };
    const config = {
      method: 'POST',
      url,
      data
    };

    API(config).then((val: any) => {
      if (val && val.data && val.data.data) {
        const { accounts, suggestedAccount } = val.data.data;
        if(suggestedAccount && suggestedAccount.status) {
          setActive(suggestedAccount);
          onChangeList(suggestedAccount);
        }
        if(accounts && accounts.length > 0) {
          setSuggestionList(accounts);
        }     
      }
    });
  },[onChangeList]);

  const onClickCallback = (item?: any) => {
    setDropList(false);
    setActive(item);
    onChangeList(item);
  }

  const listHeight = suggestionList && suggestionList.length > 4 ? 75*3 : "auto"
  
  // if(active && active.availableBalance) {
    return (
      <Box position="relative" minHeight="110px">
        <Box mt={5} display="flex" justifyContent="space-between">
                <H4>{t("billPayments.steps.review.payingFrom")}</H4>
                <Button
                  onClick={() => {
                    setDropList(!dropList);
                  }}
                  color="primary"
                >
                  {!dropList  ? t("common.action.change") : t("common.action.cancel")}
                </Button>
              </Box>
              <Box className={dropListStyle} height={dropList ? listHeight : "auto"}>
                {!dropList &&
              <PayListItem
                isDefault
                data={active}
              />
            }
              
              {dropList && (
                <>

                {suggestionList.map((item: any, i: number)=>{
                  return(
                    <Fragment key={i+"PayListItem"}>
                    <PayListItem
                      onClickCallback={()=>onClickCallback(item)}
                        active={item.accountNumber === active.accountNumber}
                      // disabled
                      data={item}
                      />
                      </Fragment>
                  )
                })}
                </>
              )}
              </Box>
      </Box>
    )
  // }
  // return <></>;
}

export default PayFromList;
