import React, { useState } from "react";
import {
  Button,
  Grid,
  Box,
  H4,
  SectionSplitter,
  Caption,
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
  const { nickname, accountNumber, dueAmount, serviceType } = activeBeneficiary || {};
  const isPrepaid = (activeTab && activeTab === "prepaid") || type === "noqodi" || type === "salik";
  const [amount, setAmount] = useState<any>(null);
  const [selVoucher, setSelVoucher] = useState<any>({});
  const [payModal, setPayModal] = useState(false);

  const handleReviewPayment = (obj: any) => {
    if(onSubmitPayment && typeof onSubmitPayment === "function") {
      onSubmitPayment({...obj, telecomType: serviceType || activeTab});
    }
  };

  const onSubmitReview = () => {
    let submitObj = { ...activeBeneficiary, rechargeAmount: amount};
    if (isPrepaid) {
      // if((dueAmount === 0 || dueAmount < 0)){
      //   setPayModal(true);
      // } else {
        handleReviewPayment(submitObj);
      // }
    } else {
      submitObj["rechargeAmount"] = dueAmount;
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

    const isValidAmount = amount && (type === "etisalat" || type === "salik") ? !(amount >= 50 && amount <= 1000) : false;
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

            {!isPrepaid ? (
              <DueAmount dueAmount={dueAmount ? dueAmount : 0} onClickButton={onSubmitReview}/>
            ) : (
              <>
                <Grid container spacing={5}>
                  <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                    <AmountWithInput
                      hideAmountList={type === "noqodi" || type === "salik"}
                      input={{
                        fullWidth: true,
                        autoFocus: true,
                        label: "Enter recharge amount",
                        inputProps: {
                          "aria-label": t("common.label.username"),
                          maxLength: 80
                        },
                        error: isValidAmount,
                        helperText: isValidAmount? replaceStr(replaceStr(t("beneficiary.manage.errors.matchNumber"), "--greater--", 50), "--lesser--", 1000) : ''
                      }}
                      amountOptions={[50, 70, 100, 125]}
                      onChangeField={(value: any) => onChangeField(value)}
                    />
                    {!(type === "noqodi") &&
                    <Box mt={2}>
                      <Caption>
                        {t("billPayments.steps.startPayment.prepaidDesc")}
                      </Caption>
                    </Box>
                    }
                  </Grid>
                  {isPrepaid && type === "du" && 
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
            {isPrepaid ? 
              (<Button
                variant={"contained"}
                onClick={() => onSubmitReview()}
                disabled={!amount}
                color="primary"
              >
                {t("common.action.reviewPayment")}
              </Button>) : (
                <Button
                variant={"outlined"}
                onClick={() => {setPayModal(true)}}
                color="primary"
                >
                {/* {console.log(isPostpaid && (dueAmount === 0 || dueAmount < 0), activeTab, isPostpaid, dueAmount)} */}
                {t("common.action.payCustomAmount")}
                </Button>
              )
            }
            {/* {isPostpaid && (dueAmount === 0 || dueAmount < 0) && */}
           
        {/* } */}
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
