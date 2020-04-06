import React, { useState } from "react";
import {
  Button,
  Grid,
  Box,
  SectionSplitter,
  Caption,
  makeStyles,
  Theme,
  colors
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import CardPayNow from "../../../../../common/card/CardPayNow";
import getBeneficiariesAvatar from "../../../../../util/getBeneficiariesAvatar";
import BackButton from "../../../../../common/backButton";
import AmountWithInput from "../../../../../common/amount/AmountWithInput";
// import { MoneyPouch } from "@mashreq-digital/webassets";
import PayCustomAmount from "./PayCustomAmount";
import { capitalizeFirstLetter, replaceStr } from "../../../../../util/helper";
import DueAmount from "../../../../../components/beneficiary/billPayment/DueAmount";

// 3px 16px

type RechargeAmountProps = {
  type: string;
  activeTab?: string;
  onClickBackCallback?: any;
  activeBeneficiary?: any;
  onSubmitPayment?: any;
};

const useStyles = makeStyles((theme: Theme) => ({
  prepaidAmountStyle: {
    backgroundColor: colors.blueGrey[50],
    borderRadius: "2px",
    "& .MuiTypography-root, & .MuiTypography-body1": {
      fontSize: theme.typography.pxToRem(14)
    },
    "& .MuiListItem-root": {
      padding: `${theme.spacing(0.5)}px ${theme.spacing(3.6)}px ${theme.spacing(
        0.5
      )}px ${theme.spacing(2.6)}px`
    }
  },
  amountStyle: {
    "& .MuiTypography-root": {
      fontWeight: "bold"
    }
  }
}));

const RechargeAmount = (props: RechargeAmountProps) => {
  const { type, activeTab, onClickBackCallback, activeBeneficiary, onSubmitPayment } = props;
  const { id, nickname, accountNumber, dueAmount } = activeBeneficiary;
  const { prepaidAmountStyle, amountStyle } = useStyles();
  const isPostpaid = activeTab && activeTab === "postpaid";
  const [amount, setAmount] = useState(null);
  const [payModal, setPayModal] = useState(false);

  const { t } = useTranslation();

  const handleReviewPayment = (obj: any) => {
    if(onSubmitPayment && typeof onSubmitPayment === "function") {
      onSubmitPayment(obj);
    }
  };

  const onSubmitReview = () => {
    let submitObj = { ...activeBeneficiary, rechargeAmount: amount};
    if (isPostpaid) {
      setPayModal(true);
    } else {
      handleReviewPayment(submitObj);
    }
  };

  const onChangeField = (value: any) => {
    setAmount(value);
  };

  const onCloseModal = () => {
    setPayModal(false);
  };

  const onSubmitAmount = (customAmount: number) => {
    onCloseModal();
    let submitObj = { ...activeBeneficiary, rechargeAmount: customAmount};
    handleReviewPayment(submitObj);
  };


  if(type && activeBeneficiary && accountNumber) {
    let cardSubheading = nickname ? `${capitalizeFirstLetter(type)} ${
      activeTab ? capitalizeFirstLetter(activeTab) : ""
    } | ${accountNumber}` : accountNumber;

  return (
    <>
      {payModal && (
        <PayCustomAmount
          openModal={payModal}
          onCloseModal={() => onCloseModal()}
          onSubmitCallback={onSubmitAmount}
        />
      )}
      <SectionSplitter
        height={"calc(100vh - 400px)"}
        top={
          <>
            <Box my={6} mt={8}>
              {type && (
                <CardPayNow
                  heading={nickname ? nickname : capitalizeFirstLetter(type)}
                  subheading={cardSubheading}
                  image={getBeneficiariesAvatar(type.toLowerCase())}
                />
              )}
            </Box>

            {isPostpaid ? (
              <DueAmount dueAmount={dueAmount ? dueAmount : 0}/>
            ) : (
              <>
                <Grid container spacing={5}>
                  <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                    <AmountWithInput
                      input={{
                        fullWidth: true,
                        autoFocus: true,
                        label: "Enter recharge amount",
                        inputProps: {
                          "aria-label": t("common.label.username"),
                          maxLength: 80
                        }
                      }}
                      amountOptions={[50, 70, 100, 125]}
                      onChangeField={(value: any) => onChangeField(value)}
                    />
                  </Grid>
                  {/* <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <Box className={prepaidAmountStyle} display="inline-block">
                      <IconText
                        icon={MoneyPouch}
                        primaryText={replaceStr(
                          replaceStr(
                            t("billPayments.steps.startPayment.prepaidBalance"),
                            "--type--",
                            capitalizeFirstLetter(type)
                          ),
                          "--serviceType--",
                          activeTab ? capitalizeFirstLetter(activeTab) : ""
                        )}
                        secondaryText={
                          <Box display="flex">
                            <Box mr={1.5}>
                              <Caption>AED</Caption>
                            </Box>
                            <Box className={amountStyle}>
                              <Caption>10.00</Caption>
                            </Box>
                          </Box>
                        }
                      />
                    </Box>
                  </Grid> */}
                </Grid>
                <Box mt={2}>
                  <Caption>
                    {t("billPayments.steps.startPayment.prepaidDesc")}
                  </Caption>
                </Box>
              </>
            )}
          </>
        }
        bottom={
          <Box display="flex" justifyContent="space-between">
            <BackButton
              disableRoute
              onClickBack={() => onClickBackCallback()}
            />
            {dueAmount && dueAmount !== 0 && dueAmount > 0 &&
            <Button
              variant={isPostpaid ? "outlined" : "contained"}
              onClick={() => onSubmitReview()}
              disabled={isPostpaid ? false : !amount}
              color="primary"
            >
              {isPostpaid
                ? t("common.action.payCustomAmount")
                : t("common.action.reviewPayment")}
            </Button>
            }
          </Box>
        }
      />
    </>
  );
}
return null;
};

export default RechargeAmount;
