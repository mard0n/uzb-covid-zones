import React, { useState } from "react";
import {
  Button,
  Grid,
  Box,
  H4,
  SectionSplitter,
  Caption,
  makeStyles,
  Theme,
  colors,
  RadioWithLabel,
  IconText
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

const duVouchers: any = [ 
  { id: 1, heading: 'Get More Credit', subHeading: 'Get Higher credit for the same recharge value!' },
  { id: 2, heading: 'Get more Validity of Credit', subHeading: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore distinctio' },
  { id: 3, heading: 'More International Credit', subHeading: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore distinctio tenetur repudiandae expedita consectetur repellendus sapiente repellat' }
];

const RechargeAmount = (props: RechargeAmountProps) => {
  const { t } = useTranslation();
  const { type, activeTab, onClickBackCallback, activeBeneficiary, onSubmitPayment } = props;
  const { id, nickname, accountNumber, dueAmount, serviceType } = activeBeneficiary;
  const isPostpaid = activeTab && activeTab === "postpaid";
  const [amount, setAmount] = useState(null);
  const [selVoucher, setSelVoucher] = useState<any>({});
  const [payModal, setPayModal] = useState(false);

  const handleReviewPayment = (obj: any) => {
    console.log("handleReviewPayment", obj);
    if(onSubmitPayment && typeof onSubmitPayment === "function") {
      onSubmitPayment({...obj, telecomType: serviceType || activeTab});
    }
  };

  const onSubmitReview = () => {
    let submitObj = { ...activeBeneficiary, rechargeAmount: amount};
    if (isPostpaid) {
      if((dueAmount === 0 || dueAmount < 0)){
        setPayModal(true);
      } else {
        submitObj["rechargeAmount"] = dueAmount;
        handleReviewPayment(submitObj);
      }
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
    let typeWithTab = capitalizeFirstLetter(type) + ' '+ (activeTab ? capitalizeFirstLetter(activeTab) : ''),
    cardHeading = nickname ? nickname : `${typeWithTab}`,
      cardSubheading = nickname ? `${typeWithTab} | ${accountNumber}` : accountNumber;

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
                  heading={cardHeading}
                  subheading={cardSubheading}
                  image={getBeneficiariesAvatar(type.toLowerCase())}
                />
              )}
            </Box>

            {isPostpaid ? (
              <DueAmount dueAmount={dueAmount ? dueAmount : 0} onClickButton={onSubmitReview}/>
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
                    <Box mt={2}>
                      <Caption>
                        {t("billPayments.steps.startPayment.prepaidDesc")}
                      </Caption>
                    </Box>
                  </Grid>
                  {!isPostpaid && type === "du" && 
                  <Grid item xs={12}>
                    <Box my={3}>
                      <H4>{t("billPayments.steps.startPayment.voucher.title")}</H4>
                    </Box>
                    <Box mb={3}>
                      <Grid container>
                      {duVouchers.map((voucher: any, i:number)=>{
                        let { heading, subHeading } = voucher;
                        return (
                          <Grid xs={6} sm={3}>
                            <RadioWithLabel 
                            radioFixTop={true}
                            checked={selVoucher && selVoucher.id ? voucher.id === selVoucher.id : false}
                            onChange={()=>{setSelVoucher(voucher)}}
                            border={false}
                            label={
                              <IconText 
                                primaryText={heading}
                                secondaryText= {subHeading}
                              />
                            }
                            />
                          </Grid>
                        )
                      })}
                      </Grid>
                    </Box>
                  </Grid>
                  }
                </Grid>
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
            {!isPostpaid && 
            <Button
              variant={"contained"}
              onClick={() => onSubmitReview()}
              disabled={!amount}
              color="primary"
            >
              {t("common.action.reviewPayment")}
            </Button>}
            {isPostpaid && (dueAmount === 0 || dueAmount < 0) &&
            <Button
              variant={"outlined"}
              onClick={() => onSubmitReview()}
              color="primary"
            >
              {console.log(isPostpaid && (dueAmount === 0 || dueAmount < 0), activeTab, isPostpaid, dueAmount)}
              {t("common.action.payCustomAmount")}
            </Button>
        }
            {/* }*/}
          </Box>
        }
      />
    </>
  );
}
return null;
};

export default RechargeAmount;
