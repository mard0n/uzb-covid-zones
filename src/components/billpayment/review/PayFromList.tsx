import React, { useState, useEffect, Fragment } from "react";
import PayListItem from "./payList";
import {
  H4,
  Button,
  Box,
  makeStyles,
  Theme,
  CircularProgress,
  Modals,
} from "@mashreq-digital/ui";
import { API } from "../../../network";
import * as Endpoint from "../../../network/Endpoints";
import { useTranslation } from "react-i18next";
import { getPayListFormattedData } from "../../../util/getPayListFormattedData";
import CardPayNow from "../../../common/card/CardPayNow";
import getBeneficiariesAvatar from "../../../util/getBeneficiariesAvatar";

type PayFromListProps = {
  onChangeList?: any;
  heading?: any;
  type?: any;
  stype?: any;
  activeItem?: any;
  selectOptions?: boolean;
  payListData?: any;
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
  const {
    onChangeList,
    heading,
    payListData,
    selectOptions,
    activeItem,
    type,
    stype,
  } = props;
  const { t } = useTranslation();
  const { dropListStyle } = useStyles();
  const [active, setActive] = useState<any>({});
  const [suggestionList, setSuggestionList] = useState<any>([]);
  const [dropList, setDropList] = useState(false);
  const listItems = ["accounts", "cards", "benificiary"];
  const [noSuggetion, setNosuggestion] = useState(false);
  const [check, setCheck] = useState(selectOptions);

  // const callOnChangeList = useCallback((activeAct: any, type: string) => {
  //   let acctData = convertCardAccounts(activeAct, type);
  //   setActive(acctData);
  //   if(onChangeList && typeof onChangeList === "function") {
  //     onChangeList({...activeAct, balance: acctData.balance, type: type});
  //   }
  // }, [onChangeList]);

  useEffect(() => {
    const callOnChangeList = (activeAct: any, type: string) => {
      let acctData = getPayListFormattedData(activeAct, type);
      setActive(acctData);
      if (onChangeList && typeof onChangeList === "function") {
        onChangeList({ ...activeAct, balance: acctData.balance, type: type });
      }
    };

    const configurValues = (val: any) => {
      const {
        accounts,
        cards,
        suggestedAccount,
        suggestedCard,
        benificiary,
      } = val;

      if (suggestedAccount && suggestedAccount.status) {
        callOnChangeList(suggestedAccount, "accounts");
      } else {
        setNosuggestion(true);
      }

      if (suggestedCard && suggestedCard.cardHolderName) {
        callOnChangeList(suggestedCard, "cards");
      }

      if (benificiary) {
        callOnChangeList(benificiary, "benificiary");
      }

      setSuggestionList({
        accounts: accounts && accounts.length > 0 ? accounts : [],
        cards: cards && cards.length > 0 ? cards : [],
        benificiary: benificiary && benificiary.length > 0 ? benificiary : [],
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

      payListData
        ? configurValues(payListData)
        : API(config).then((val: any) => {
            if (val && val.data && val.data.data) {
              configurValues(val.data.data);
            }
          });
    };

    getPaymentList();

    /* Patch - Don't remove the below comment otherwiser useeffect will expect a dependency. 
    We should add onChangeList as dependency then source api will get triggered infinitely */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const allSuggestions = [
      ...(suggestionList &&
      suggestionList.cards &&
      suggestionList.cards.length > 0
        ? suggestionList.cards
        : []),
      ...(suggestionList &&
      suggestionList.accounts &&
      suggestionList.accounts.length > 0
        ? suggestionList.accounts
        : []),
      ...(suggestionList &&
      suggestionList.benificiary &&
      suggestionList.benificiary.length > 0
        ? suggestionList.benificiary
        : []),
    ],
    listHeight = allSuggestions && allSuggestions.length > 4 ? 75 * 3 : "auto";

  if ((active && active.currency) || noSuggetion) {
    return (
      <Box position="relative" minHeight="110px">
        
      <Box display="flex" justifyContent="space-between">
          <H4>
            {heading ? heading : t("billPayments.steps.review.payingFrom")}
          </H4>
         {check ? null: <Button
            onClick={() => {
              setDropList(!dropList);
            }}
            color="primary"
          >
            {t("common.action.change")}
          </Button>
        }
        </Box>

        <Box className={dropListStyle} height={dropList ? listHeight : "auto"}>
          {!dropList && active && active.currency ? (
            <PayListItem activeSelected={true} isDefault data={active} />
          ) : (
            <PayListItem
              isDefault
              activeSelected={true}
              data={active}
              destinationSelect={()=>{
                setDropList(!dropList)
                setCheck(!selectOptions)}
            }
              selectOptions={check}
            />
          )}

          <Modals
            heading={<H4>Select Account</H4>}
            open={dropList}
            onBackdropClick={(e) => {
              console.log(e);
            }}
            onClose={() => {setDropList(!dropList)}}
          >
            
            <>
              {suggestionList && (
                <>
                  {listItems.map((list: string) => {
                    if (
                      suggestionList[list] &&
                      suggestionList[list].length > 0
                    ) {
                      return suggestionList[list].map(
                        (item: any, i: number) => {
                          let data = getPayListFormattedData(item, list);
                          return (
                            <Fragment key={i + "PayListItem"}>
                              <PayListItem
                                onClickCallback={() =>
                                  onClickCallback(data, {
                                    ...item,
                                    balance: data.balance,
                                    type: list,
                                  })
                                }
                                active={data.accNo === active.accNo}
                                data={data}
                              />
                              <hr/>
                            </Fragment>
                          );
                        }
                      );
                    } else {
                      return false;
                    }
                  })}
                </>
              )}
            </>
    
          </Modals>
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
