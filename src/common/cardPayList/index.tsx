import React, { useState, useEffect, Fragment } from "react";
import PayListItem from "../payList";
import {
  H4,
  Button,
  Box,
  makeStyles,
  Theme,
  CircularProgress,
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
import SmartPayList from '../payList/smartPayList';

type CardPayListProps = {
  onChangeList?: any;
  type?:any;
  payListData?:any;
  heading?:any;
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

const CardPayList = (props: CardPayListProps) => {
  const { onChangeList , type,heading, payListData} = props;
  const { t } = useTranslation();
  const { dropListStyle } = useStyles();
  const [active, setActive] = useState<any>({});
  const [select, setSelect] = useState(false);
  const [suggestionList, setSuggestionList] = useState<any>([]);
  const [dropList, setDropList] = useState(false);
  const listItems = ["accounts","cards"];
  let transfer = useSelector(
    (state: any) => state.moneyTransfer.other.transfer
  );

  useEffect(() => {

    const callOnChangeList = (activeAct: any, type: string) => {
      let acctData = convertCardAccounts(activeAct, type);
      setActive(acctData);
      if(onChangeList && typeof onChangeList === "function") {
        onChangeList({...activeAct, balance: acctData.balance, type: type});
      }
    };

    const getPaymentList = () => {
          const {
            accounts,
            cards,
            suggestedAccount,
            suggestedCard,
          } = payListData;
          if (suggestedAccount && suggestedAccount.status) {
            callOnChangeList(suggestedAccount, "accounts");
          }else{
            setSelect(true);
          }
          if (suggestedCard && suggestedCard.cardHolderName) {
            callOnChangeList(suggestedCard, "cards");
          }
          setSuggestionList({
            accounts: accounts && accounts.length > 0 ? accounts : [],
            cards: cards && cards.length > 0 ? cards : [],
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

  const convertCardAccounts = (obj: any, type: string) => {
    let data = {
      name: "",
      description:"",
      accNo: "",
      status: "",
      currency: "",
      balance: "",
      type: ""
    };
    data["type"] = type;
    if(type === "accounts") {
      const { customerName,
        accountNumber,
        status,
        accountDescription,
        currency,
        availableBalance} = obj;
      data["name"] = customerName;
      data["accNo"] = accountNumber;
      data["description"] = accountDescription;
      data["status"] = status;
      data["currency"] = currency;
      data["balance"] = availableBalance;

    } else if (type === "cards") {
      const { cardHolderName,
        cardNo,
        cardStatus,
        currency,
        availableCreditLimit} = obj;
        data["name"] = cardHolderName;
        data["accNo"] = cardNo;
        data["status"] = cardStatus;
        data["currency"] = currency;
        data["balance"] = availableCreditLimit;

    }
    return data;
  }

  const allSuggestions = [...(suggestionList && suggestionList.cards && suggestionList.cards.length > 0 ? suggestionList.cards : []), 
  ...(suggestionList && suggestionList.accounts && suggestionList.accounts.length > 0 ? suggestionList.accounts : [])],
  listHeight = allSuggestions && allSuggestions.length > 4 ? 75 * 3 : "auto";

  if (active && active.currency || select) {
    return (
      <Box  minHeight="110px">

        <Box mt={5} display="flex" justifyContent="space-between">
          <H4>{heading}</H4>
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
          {!dropList && 
            Object.keys(active).length === 0? type === "smart" ? <SmartPayList isDefault select={select} disabled={true}  data={active} /> : <PayListItem isDefault select={select} disabled={true}  data={active} /> :
             type === "smart" ?<SmartPayList isDefault data={active} /> :<PayListItem isDefault data={active} />
        
        }

        


          {dropList && (
            <>
              {suggestionList &&
                <>
                  {listItems.map((list: string)=>{
                    if(suggestionList[list] && suggestionList[list].length > 0) {
                      return suggestionList[list].map((item: any, i:number)=>{
                        let data = convertCardAccounts(item, list);
                        return (
                          <Fragment key={i + "PayListItem"}>
                         { type === "smart" ?
                            <SmartPayList
                              onClickCallback={() => onClickCallback(data, {...item, balance: data.balance, type: list})}
                              active={data.accNo === active.accNo}
                              data={data}
                            />
                          :
                          <PayListItem
                          onClickCallback={() => onClickCallback(data, {...item, balance: data.balance, type: list})}
                          active={data.accNo === active.accNo}
                          data={data}
                        />
                          }
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

export default CardPayList;
