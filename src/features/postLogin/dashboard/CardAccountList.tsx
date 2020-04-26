import React, { useState, useEffect } from "react";
import { Grid, Box, useTheme, makeStyles } from "@mashreq-digital/ui";
import AccountCard from "../../../components/dashboard/AccountCard";
import EmptyAccountCard from "../../../components/dashboard/EmptyAccountCard";
import { ChartUpward, Umbrella } from "@mashreq-digital/webassets";
import { useSelector } from "react-redux";
import getProductColor from "../../../util/getProductColor";
import { useTranslation } from "react-i18next";
import { getPayListFromattedData } from "../../../util/getPayListFormattedData";

const useStyles = makeStyles(() => ({
  emptyAcctStyle: {
    order: 2,
  },
}));

const CardAccountList = () => {
  const { emptyAcctStyle } = useStyles();
  // const theme = useTheme();
  const { t } = useTranslation();
  const [renderData, setRenderData] = useState([]);
  const Products: any = useSelector((state: any) => ({
    accountLoanDeposit: state?.products?.accountLoanDeposit?.response,
    card: state?.products?.card?.response,
    reward: state?.products?.rewards?.response,
  }));

  useEffect(() => {
    const generateRenderObj = (type: string, objName: string, list: any) => {
      let returnObj: any = {},
        productList = list && list["products"] ? list["products"] : undefined,
        productSnapshot = list && list["snapshot"] ? list["snapshot"] : undefined;
      returnObj["type"] = type;
      // Product Data List
      if (
        productList &&
        productList[objName] &&
        productList[objName].length > 0
      ) {
        let splicedList = productList[objName].slice(0, 2);
        splicedList = splicedList.map((splList: any)=> getPayListFromattedData(splList, type));
        returnObj["data"] = splicedList;
      } else {
        returnObj["data"] = [];
      }
      //Snapshot
      if (
        productSnapshot &&
        productSnapshot[objName] &&
        productSnapshot[objName]
      ) {
        returnObj = { ...returnObj, ...productSnapshot[objName] };
        if(type === "salaam") {
          returnObj["data"] = [{...getPayListFromattedData(returnObj, type)}]
        }
      }
      return returnObj;
    };

    const generateRenderData = () => {
      if (Products) {
        let listItems: any = [];
        for (let list in Products) {
          if (list && Products[list]) {
            let prodList = Products[list] ? Products[list] : [];
            if (list === "accountLoanDeposit") {
              listItems.push(generateRenderObj("accounts", "acc", prodList));
              listItems.push(generateRenderObj("deposits", "dep", prodList));
              listItems.push(generateRenderObj("loans", "lon", prodList));
            } else if (list === "card") {
              listItems.push(generateRenderObj("cards", "crd", prodList));
            } else if (list === "reward") {
              listItems.push(generateRenderObj("salaam", "slm", prodList));
            }
          }
          setRenderData(listItems);
        }
      }
    };
    if (Products && Products.card && renderData && renderData.length === 0) {
      generateRenderData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Products]);

  return (
    <>
      <Box mt={1}>
        <Grid container spacing={4}>
          {renderData &&
            renderData.length > 0 &&
            renderData.map((listItem: any, i: number) => {
              const {
                type,
                count,
                availableBalance,
                currency,
                salamPointsInAed,
                currentBalance,
                data,
              } = listItem;
              if (data && data.length > 0) {
                return (
                  <Grid item xs={12} key={i}>
                    <AccountCard
                      color={getProductColor(type)}
                      title={
                        (count ? count : '') +
                        " " +
                        t(`dashboard.productSummary.${type}.title`)
                      }
                      data={data}
                      balanceAmount={salamPointsInAed || currentBalance}
                      balance={!salamPointsInAed ? t(
                        `dashboard.productSummary.${type}.availableBalance`
                      ) : ''}
                      currentBalance={t(
                        `dashboard.productSummary.${type}.currentBalance`
                      )}
                      currentBalanceAmount={availableBalance}
                    />
                  </Grid>
                );
              } else {
                return (
                  <Grid key={i} item xs={6} className={emptyAcctStyle}>
                    <EmptyAccountCard
                      color={getProductColor(type)}
                      title={t(`dashboard.productSummary.${type}.empty.title`)}
                      desc={t(`dashboard.productSummary.${type}.empty.desc`)}
                      icon={Umbrella}
                    />
                  </Grid>
                );
              }
            })}
        </Grid>
      </Box>
    </>
  );
};

export default CardAccountList;
