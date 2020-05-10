import React, { useState, useEffect } from "react";
import { Grid, Box, useTheme, makeStyles } from "@mashreq-digital/ui";
import AccountCard from "../../../components/dashboard/AccountCard";
import EmptyAccountCard from "../../../components/dashboard/EmptyAccountCard";
import { ChartUpward, Umbrella } from "@mashreq-digital/webassets";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getPayListFormattedData } from "../../../util/getPayListFormattedData";
import { formatCurrency } from "../../../util/helper";
import NoBeneficiaryFound from "../../../components/beneficiary/billPayment/NoBeneficiaryFound";

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
    insurance: state?.products?.insurance?.response,
    mmc: state?.products?.mm?.response
  }));
  const { accountLoading, cardLoading, rewardLoading, insuranceLoading, mmLoading }: any = useSelector((state: any) => ({
    accountLoading: state?.products?.accountLoanDeposit?.loading,
    cardLoading: state?.products?.card?.loading,
    rewardLoading: state?.products?.rewards?.loading,
    insuranceLoading: state?.products?.insurance?.loading,
    mmLoading: state?.products?.mm?.loading
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
        let dataObj = productList[objName];
        let splicedList = dataObj.slice(0, 2);
        //pick 1 from motor and pick one from life
          if(type === "insurances" && dataObj[0] && dataObj[0]["motor"] && dataObj[0]["life"]) {
            splicedList = [...dataObj[0]['life'].slice(0, 1), ...dataObj[0]['motor'].slice(0, 1)];
            dataObj = [...dataObj[0]['life'], ...dataObj[0]['motor']];
          }
        splicedList = splicedList.length > 0 ? splicedList.map((splList: any)=> getPayListFormattedData(splList, type)) : [];
        returnObj["data"] = splicedList;
        returnObj["orgData"] = dataObj;
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
        if(type === "salaam" && returnObj && returnObj.salamPoints && returnObj.salamPoints > 0) {
          returnObj["data"] = [{...getPayListFormattedData(returnObj, type)}]
        }
      }
      return returnObj;
    };

    const generateRenderData = () => {
      let listItems: any = [];
      if (Products) {
        for (let list in Products) {
          if (list && Products[list]) {
            let prodList = Products[list] ? Products[list] : [];
            if (list === "accountLoanDeposit") {
              listItems.push(generateRenderObj("accounts", "acc", prodList));
              listItems.push(generateRenderObj("deposits", "dep", prodList));
              listItems.push(generateRenderObj("loans", "lon", prodList));
            } else if (list === "insurance") {
              listItems.push(generateRenderObj("insurances", "ins", prodList));
            } else if (list === "card") {
              listItems.push(generateRenderObj("cards", "crd", prodList));
            } else if (list === "reward") {
              listItems.push(generateRenderObj("salaam", "slm", prodList));
            } else if (list === "mmc") {
              listItems.push(generateRenderObj("mm", "mml", prodList));
            }
          }
          setRenderData(listItems);
        }
      }
    };
    if (Products && !(accountLoading && cardLoading && rewardLoading)) {
      generateRenderData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountLoading, cardLoading, rewardLoading, insuranceLoading, mmLoading]);

  console.log(renderData)

  return (
    <>
      <Box mt={1}>
        <Grid container spacing={4}>
          {renderData &&
            renderData.length > 0 ?
            (<>{renderData.map((listItem: any, i: number) => {
              const {
                type,
                count,
                availableBalance,
                currency,
                totalOutstanding,
                insuranceCount,
                totalInsuranceCover,
                totalMonthlyPremium,
                salamPointsInAed,
                currentBalance,
                totalAmount,
                data,
                orgData
              } = listItem;
              let totalCount: any = count, balanceAmount = currentBalance, remainingBalance = availableBalance;

              if(type === "insurances") {
                totalCount = insuranceCount;
                balanceAmount = Number(totalInsuranceCover);
                remainingBalance = Number(totalMonthlyPremium);
              } else if (type === "salaam") {
                totalCount = '';
                balanceAmount = salamPointsInAed;
              } else if ( type === "loans" ) {
                balanceAmount = totalOutstanding;
              } else if ( type === "mm" ) {
                balanceAmount = totalAmount;
              }
              
              if (data && data.length > 0) {
                return (
                  <Grid item xs={12} key={i}>
                    <AccountCard
                      type={type}
                      currency={currency}
                      title={
                        (totalCount) +
                        " " +
                        t(`dashboard.productSummary.${type}.title`)
                      }
                      btnLabel={type && orgData && orgData.length > 2 && type !== 'salaam' ? t(`dashboard.productSummary.${type}.seeAll`) : ''}
                      data={data}
                      balanceAmount={formatCurrency(balanceAmount)}
                      balance={t(
                        `dashboard.productSummary.${type}.availableBalance`
                      )}
                      currentBalance={t(
                        `dashboard.productSummary.${type}.currentBalance`
                      )}
                      currentBalanceAmount={formatCurrency(remainingBalance)}
                    />
                  </Grid>
                );
              } else {
                return (
                  <Grid key={i} item xs={6} className={emptyAcctStyle}>
                    <EmptyAccountCard
                     type={type}
                      title={t(`dashboard.productSummary.${type}.empty.title`)}
                      desc={t(`dashboard.productSummary.${type}.empty.desc`)}
                      icon={Umbrella}
                    />
                  </Grid>
                );
              }
            })}
            </>
            ): (
              <Grid item xs={12}>
              <NoBeneficiaryFound
                title="error.title"
                desc="error.somethingWrong"
              />
              </Grid>
            )}
        </Grid>
      </Box>
    </>
  );
};

export default CardAccountList;
