import React, { useState, useEffect } from "react";
import {
  UnderlineText,
  Button,
  Box,
  H2,
  H4,
  Caption,
  SectionSplitter,
  makeStyles,
  SvgIcon
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import SucessFailureIcon from "../successFailureIcon";
import { replaceStr } from "../../util/helper";
import CardPayNow from "../card/CardPayNow";
import { ArrowRight } from "@mashreq-digital/webassets";
import getBeneficiariesAvatar from "../../util/getBeneficiariesAvatar";

type ConfirmationProps = {
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

const Confirmation = (props: ConfirmationProps) => {
  // const { capitalize, cardPay } = useStyles();
  const {
    type,
    data,
    onDoneCallback,
    onReceiptCallback,
    title,
    subTitle
  } = props;
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (data && data.id) {
      setSuccess(true);
    }
  }, [data]);

  return (
    <SectionSplitter
      height="calc(100vh - 400px)"
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
          {success ? data && data.id && (
            <>
              <Box mt={6} mb={6} display="flex" alignItems="center">
                <CardPayNow
                  style={{ justifyContent: "space-evenly" }}
                  heading={t(`billPayments.steps.confirmation.debited`)}
                  subheading={Math.abs(data.dueAmount)}
                />
                <Box ml={3} mr={3}>
                  <SvgIcon component={ArrowRight} />
                </Box>
                <CardPayNow
                  style={{ justifyContent: "space-evenly" }}
                  heading={data.nickname}
                  subheading={
                    data.serviceTypeCode +
                    " " +
                    (type && type.toLowerCase()! === ("du" || "etisalat")
                      ? t("common.label.nickName")
                      : "") +
                    " | " +
                    data.accountNumber
                  }
                  image={getBeneficiariesAvatar(type.toLowerCase())}
                />
              </Box>
              <Box mt={6}>
                <CardPayNow
                  style={{ justifyContent: "space-evenly" }}
                  arrow={true}
                  heading={t(`billPayments.steps.confirmation.payment`)}
                  subheading={t(`billPayments.steps.confirmation.saveIt`)}
                />
              </Box>
            </>
          ) : 
          <>
          <Box mt={10} display="flex" alignItems="center">
          <H4>{t(`billPayments.steps.confirmation.contactus`)} </H4>
          </Box>
          <Box mt={5} mb={5} display="flex" alignItems="center">
          <CardPayNow
            style={{ justifyContent: "space-evenly" }}
            arrow={true}
            heading={t(`billPayments.steps.confirmation.customerCare`)}
            subheading={t(`billPayments.steps.confirmation.support`)}
          />
          </Box>
        </>
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
                onReceiptCallback();
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

Confirmation.defaultProps = {
  success: true
};

export default Confirmation;
