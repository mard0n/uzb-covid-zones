import React from "react";
import {
  UnderlineText,
  Button,
  Box,
  H2,
  Caption,
  SectionSplitter,
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import { Check } from "@mashreq-digital/webassets";
// import getBeneficiariesAvatar from "../../../../util/getBeneficiariesAvatar";
import SucessFailureIcon from "@mashreq-digital/ui/dist/components/successFailureIcon";
import ReviewAmountType from "../../../../components/billpayment/reviewAmountType";
import CardPayNow from "../../../../common/card/CardPayNow";

type SuccessProps = {
  success: boolean;
  type: string;
  title: string;
  subTitle?: string;
  data?: any;
  onDoneCallback?: any;
  onReceiptCallback?: any;
};

// const useStyles = makeStyles(() => ({
//   capitalize: {
//     textTransform: "capitalize"
//   },
//   cardPay: {
//     justifyContent: "center"
//   }
// }));

const Success = (props: SuccessProps) => {
  // const { capitalize, cardPay } = useStyles();
  const {
    type,
    data,
    onDoneCallback,
    onReceiptCallback,
    title,
    success,
    subTitle
  } = props;
  const { t } = useTranslation();

  return (
    <SectionSplitter
      height="calc(100vh - 250px)"
      top={
        <>
          <SucessFailureIcon success={success} />
          <UnderlineText color="primary">
            <H2>{title}</H2>
          </UnderlineText>

          {subTitle && (
            <Box mt={6} mb={6}>
              <Caption>{subTitle}</Caption>
            </Box>
          )}
          {data && type && (
            <>
              <ReviewAmountType data={data} type={type} leftIcon={Check} isSuccess title={"Debited"}/>
              <Box mt={6}>
                <CardPayNow
                  arrow={true}
                  heading={t(`billPayments.steps.confirmation.payment`)}
                  subheading={t(`billPayments.steps.confirmation.saveIt`)}
                />
              </Box>
            </>
          ) 
          //: 
        //   <>
        //   <Box mt={10} display="flex" alignItems="center">
        //   <H4>{t(`billPayments.steps.confirmation.contactus`)} </H4>
        //   </Box>
        //   <Box mt={5} mb={5} display="flex" alignItems="center">
        //   <CardPayNow
        //     style={{ justifyContent: "space-evenly" }}
        //     arrow={true}
        //     heading={t(`billPayments.steps.confirmation.customerCare`)}
        //     subheading={t(`billPayments.steps.confirmation.support`)}
        //   />
        //   </Box>
        // </>
        }
        </>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">
          {success && (
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                if(onReceiptCallback && typeof onReceiptCallback === "function") {
                  onReceiptCallback();
                }
              }}
              color="primary"
            >
              {t(`common.action.receipt`)}
            </Button>
          )}

          <Button
            variant="contained"
            size="large"
            onClick={() => {
              onDoneCallback();
            }}
            color="primary"
          >
            {t(`common.action.done`)}
          </Button>
        </Box>
      }
    />
  );
};

Success.defaultProps = {
  success: true
};

export default Success;
