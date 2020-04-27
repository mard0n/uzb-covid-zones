import React, { useState, useEffect, Fragment } from "react";
import PayListItem from "./payList";
import {
  H4,
  Button,
  Box,
  makeStyles,
  Theme,
  CircularProgress,
} from "@mashreq-digital/ui";
import { API } from "../../../network";
import * as Endpoint from "../../../network/Endpoints";
import { useTranslation } from "react-i18next";
import { getPayListFromattedData } from "../../../util/getPayListFormattedData";

type PayFromListProps = {
  onChangeList?: any;
  heading?:any;
  selectOptions?:boolean;
  payListData?:any;
};

const useStyles = makeStyles((theme: Theme) => ({
  dropListStyle: {
    zIndex: 2,
    overflow: "auto",
    position: "absolute",
    top: "auto",
    width: "100%",
    paddingRight: theme.spacing(2),
    backgroundColor: "#fff",
  },
}));

const PayFromList = (props: PayFromListProps) => {
  const { onChangeList,heading, payListData,selectOptions} = props;
  const { t } = useTranslation();
  const { dropListStyle } = useStyles();
  const [active, setActive] = useState<any>({});
  const [suggestionList, setSuggestionList] = useState<any>([]);
  const [dropList, setDropList] = useState(false);
  const listItems = ["accounts","cards"];
  const [noSuggetion, setNosuggestion] = useState(false);

  // const callOnChangeList = useCallback((activeAct: any, type: string) => {
  //   let acctData = convertCardAccounts(activeAct, type);
  //   setActive(acctData);
  //   if(onChangeList && typeof onChangeList === "function") {
  //     onChangeList({...activeAct, balance: acctData.balance, type: type});
  //   }
  // }, [onChangeList]);

  useEffect(() => {
    
    const callOnChangeList = (activeAct: any, type: string) => {
      let acctData = getPayListFromattedData(activeAct, type);
      setActive(acctData);
      if(onChangeList && typeof onChangeList === "function") {
        onChangeList({...activeAct, balance: acctData.balance, type: type});
      }
    };


    const configurValues=(val:any)=>{      
        const {
          accounts,
          cards,
          suggestedAccount,
          suggestedCard,
        } = val;

        if (suggestedAccount && suggestedAccount.status) {
          callOnChangeList(suggestedAccount, "accounts");
        }else{
          setNosuggestion(true);
        }

        if (suggestedCard && suggestedCard.cardHolderName) {
          callOnChangeList(suggestedCard, "cards");
        }

        setSuggestionList({
          accounts: accounts && accounts.length > 0 ? accounts : [],
          cards: cards && cards.length > 0 ? cards : [],
        });

    };

    const getPaymentList = () => {
      let url = Endpoint.BILL_PAYMENT_SOURCE_ACCOUNTS_ENDPOINT,
        data = {
          minAmountToBeAvailable: "200",
          suggestAccountOrCard: true,
        };
      const config = {
        method: "POST",
        url,
        data,
      };

      payListData?configurValues(payListData):
      API(config).then((val: any) => {
        if (val && val.data && val.data.data) {
        configurValues(val.data.data);
        }
      });



    }

    getPaymentList();

    /* Patch - Don't remove the below comment otherwiser useeffect will expect a dependency. 
    We should add onChangeList as dependency then source api will get triggered infinitely */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const onClickCallback = (data: any, item?: any) => {
    setDropList(false);
    setActive(data);
    onChangeList(item);
  };

  // const convertCardAccounts = (obj: any, type: string) => {
  //   let data = {
  //     name: "",
  //     accNo: "",
  //     status: "",
  //     currency: "",
  //     balance: "",
  //     type: ""
  //   };
  //   data["type"] = type;
  //   if(type === "accounts") {
  //     const { customerName,
  //       accountNumber,
  //       status,
  //       currency,
  //       availableBalance} = obj;
  //     data["name"] = customerName;
  //     data["accNo"] = accountNumber;
  //     data["status"] = status;
  //     data["currency"] = currency;
  //     data["balance"] = availableBalance;

  //   } else if (type === "cards") {
  //     const { cardHolderName,
  //       cardNo,
  //       cardStatus,
  //       currency,
  //       availableCreditLimit} = obj;
  //       data["name"] = cardHolderName;
  //       data["accNo"] = cardNo;
  //       data["status"] = cardStatus;
  //       data["currency"] = currency;
  //       data["balance"] = availableCreditLimit;

  //   }
  //   return data;
  // }

  const allSuggestions = [...(suggestionList && suggestionList.cards && suggestionList.cards.length > 0 ? suggestionList.cards : []), 
  ...(suggestionList && suggestionList.accounts && suggestionList.accounts.length > 0 ? suggestionList.accounts : [])],
  listHeight = allSuggestions && allSuggestions.length > 4 ? 75 * 3 : "auto";

  if (active && active.currency || noSuggetion) {
    return (
      <Box position="relative" minHeight="110px">
        <Box display="flex" justifyContent="space-between">
          <H4>{ heading?heading:t("billPayments.steps.review.payingFrom")}</H4>
          <Button
            onClick={() => {
              setDropList(!dropList);
            }}
            color="primary"
          >
            {!dropList ? t("common.action.change") : t("common.action.cancel")}
          </Button>
        </Box>
        <Box className={dropListStyle} height={dropList ? listHeight : "auto"}>
          {!dropList && (active && active.currency)? <PayListItem isDefault data={active}/>:<PayListItem isDefault data={active} selectOptions={selectOptions}/>}

          {dropList && (
            <>
              {suggestionList &&
                <>
                  {listItems.map((list: string)=>{
                    if(suggestionList[list] && suggestionList[list].length > 0) {
                      return suggestionList[list].map((item: any, i:number)=>{
                        let data = getPayListFromattedData(item, list);
                        return (
                          <Fragment key={i + "PayListItem"}>
                            <PayListItem
                              onClickCallback={() => onClickCallback(data, {...item, balance: data.balance, type: list})}
                              active={data.accNo === active.accNo}
                              data={data}
                            />
                          </Fragment>
                        );
                      });
                    } else {
                      return false
                    }
                    
                  })}
                </>
              }
            </>
          )}
        </Box>
      </Box>
    );
  }
  return (
    <Box display="flex" alignItems="baseline">
      <CircularProgress />
    </Box>
  );
};

export default PayFromList;
