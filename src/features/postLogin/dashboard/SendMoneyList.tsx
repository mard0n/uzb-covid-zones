import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {
  Box,
  InfoCard,
  H4,
  Button,
  CircularProgress,
  makeStyles,
} from "@mashreq-digital/ui";
import CardPayNow from "../../../common/card/CardPayNow";
import getBeneficiariesAvatar from "../../../util/getBeneficiariesAvatar";
import * as RoutePath from "../../../router/config";
import * as Actions from "../../../redux/actions/moneyTransfer/fetchBeni";
import NoBeneficiaryFound from "../../../components/beneficiary/billPayment/NoBeneficiaryFound";

const useStyles = makeStyles(() => ({
  notFoundStyle: {
    height: "auto",
  },
}));

const SendMoneyList = () => {
  const { notFoundStyle } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { beneficiaryList, loading } = useSelector((state: any) => ({
    beneficiaryList: state?.moneyTransfer?.mtBeni?.beneficiaries || [],
    loading: state?.moneyTransfer?.mtBeni?.loading,
  }));

  useEffect(() => {
    dispatch(Actions.fetchMoneyTransferBeneficiariesRequest({count: 5}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfoCard
      minHeight={false}
      fullWidth
      content={
        <>
          <H4>{t("dashboard.sendMoney.title")}</H4>
          {!loading ? (
            <>
              {beneficiaryList && beneficiaryList.length > 0 ? (
                <>
                  <Box my={3.34} mb={2}>
                    {beneficiaryList.map((item: any, i: number) => {
                        const { nickname, serviceType, accountNumber } = item;
                        if (i < 3) {
                          return (
                            <CardPayNow
                              key={i}
                              fullWidth
                              image={getBeneficiariesAvatar("etisalat")}
                              boxShadow={false}
                              style={{ paddingLeft: 0 }}
                              heading={nickname}
                              subheading={`${serviceType} |  ${accountNumber}`}
                            />
                          );
                        }
                        return false;
                      })}
                  </Box>
                  <Button
                    fullWidth
                    variant="text"
                    color="primary"
                    onClick={() =>
                      history.push(RoutePath.MONEYTRANSFER)
                    }
                  >
                    {t("dashboard.sendMoney.buttonLinkLabel")}
                  </Button>
                </>
              ) : (
                <>
                  {beneficiaryList && beneficiaryList.length === 0 ? (
                    <Box display="flex" alignItems="baseline">
                      <NoBeneficiaryFound
                        fullWidth
                        className={notFoundStyle}
                        desc="notFound.title"
                      />
                    </Box>
                  ) : (
                    <Box display="flex" alignItems="baseline">
                      <CircularProgress />
                    </Box>
                  )}
                </>
              )}
              <Box mt={4}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    history.push(RoutePath.BENIFICIARY_BILL_PAYMENT)
                  }
                >
                  {t("dashboard.sendMoney.buttonLabel")}
                </Button>
              </Box>
            </>
          ) : (
            <Box display="flex" alignItems="baseline">
              <NoBeneficiaryFound
                fullWidth
                className={notFoundStyle}
                title="error.title"
                desc="error.somethingWrong"
              />
            </Box>
          )}
        </>
      }
    />
  );
};

export default SendMoneyList;
