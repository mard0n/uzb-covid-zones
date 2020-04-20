import React, { useState, useEffect } from "react";
import {
  UnderlineText,
  Button,
  Box,
  H2,
  H3,
  H5,
  Caption,
  SectionSplitter,
  makeStyles
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import SucessFailureIcon from "../../../../../../common/successFailureIcon";
import { replaceStr } from "../../../../../../util/helper";
import CardPayNow from "../../../../../../common/card/CardPayNow";
import getBeneficiariesAvatar from "../../../../../../util/getBeneficiariesAvatar";

type SuccessProps = {
  success: boolean;
  type: string;
  data: any;
  onButtonCallback?: any;
};

const useStyles = makeStyles(() => ({
  capitalize: {
    textTransform: "capitalize"
  },
  cardPay : {
    justifyContent: "center"
  }
}));

const Success = (props: SuccessProps) => {
  const { capitalize, cardPay } = useStyles();
  const { type, data, onButtonCallback } = props;
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();
  const successString = success ? "success" : "failure";
  let title = t(`beneficiary.manage.addEdit.${successString}.title`);

  useEffect(() => {
    if (data && data.id) {
      setSuccess(true);
    }
  }, [data]);

  if (success) {
    title = replaceStr(title, "--type--", type.toUpperCase());
  }

  return (
    <SectionSplitter
      height="calc(100vh - 250px)"
      top={
        <>
          <SucessFailureIcon success={success} />
          <UnderlineText color="primary">
            <H2>{title}</H2>
          </UnderlineText>

          <Box mt={6} mb={6}>
            <Caption>
              {t(`beneficiary.manage.addEdit.${successString}.desc`)}
            </Caption>
          </Box>
          {data && data.id && (
            <>
              <Box mt={6} mb={6}>
                <CardPayNow
                style={{justifyContent: "start"}}
                  heading={data.nickname}
                  subheading={
                    data.serviceTypeCode +
                    " " +
                    ((type && type.toLowerCase()! === ("du" || "etisalat"))
                      ? t("common.label.nickName")
                      : "") + " | " + data.accountNumber
                  }
                  image={getBeneficiariesAvatar(
                    type.toLowerCase()
                  )}
                />
              </Box>
              {data.dueAmount && data.dueAmount > 0 ? (
                <Box mt={6} mb={6}>
                  <Box mt={5} mb={5}>
                    <H3 gutterBottom>
                      {t("beneficiary.manage.details.billDetected.title")}
                    </H3>
                    <Caption>
                      {t("beneficiary.manage.details.billDetected.desc")}
                    </Caption>
                  </Box>

                  <CardPayNow
                    buttonLable={t("common.action.payNow")}
                    // heading="Rent Dubai"
                    // image={getBeneficiariesAvatar("DU")}
                    subheading={
                      <Box display="flex">
                        <Box mr={1}>
                          <Caption color="textSecondary" className={capitalize}>
                            AED
                          </Caption>
                        </Box>
                        <H5>{data.dueAmount}</H5>
                      </Box>
                    }
                  />
                </Box>
              ) : null}
            </>
          )}
        </>
      }
      bottom={
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              onButtonCallback();
            }}
            color="primary"
          >
            {t(`beneficiary.manage.addEdit.${successString}.buttonLanbel`)}
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
