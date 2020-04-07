import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  H3,
  Caption,
  H5,
  makeStyles,
  Theme
} from "@mashreq-digital/ui";
import CardPayNow from "../../../common/card/CardPayNow";

const useStyles = makeStyles((theme: Theme) => ({
  capitalize: {
    textTransform: "capitalize"
  }
}));

type DueAmountProps = {
  dueAmount?: number;
  onClickButton?: any | undefined;
}

const DueAmount = (props: DueAmountProps) => {
  const { dueAmount, onClickButton } = props;
  const { capitalize} = useStyles();
  const { t } = useTranslation();

  console.log(dueAmount)
  if(typeof dueAmount !== "undefined") {

  return(
  <>
    {(dueAmount === 0 || dueAmount < 0) ? (
      <>
        <Box mt={5} mb={5}>
          <H3 gutterBottom>
            {t("beneficiary.manage.details.billDetected.title")}
          </H3>
          <Box mt={5}>
            <Caption>
              {t("beneficiary.manage.details.billDetected.zeroAmount")}
            </Caption>
          </Box>
        </Box>
      </>
    ) : null}

    {dueAmount > 0? (
      <>
        <Box mt={5} mb={5}>
          <H3 gutterBottom>
            {t("beneficiary.manage.details.billDetected.title")}
          </H3>
          <Caption>{t("beneficiary.manage.details.billDetected.desc")}</Caption>
        </Box>

        <CardPayNow
          buttonLable={t("common.action.payNow")}
          style={{justifyContent: "space-between", paddingRight: 0}}
          // heading="Rent Dubai"
          // image={getBeneficiariesAvatar("DU")}
          callback={onClickButton}
          subheading={
            <Box display="flex" alignItems="center">
              <Box mr={1}>
                <Caption color="textSecondary" className={capitalize}>
                  AED
                </Caption>
              </Box>
              <H5>{dueAmount}</H5>
            </Box>
          }
        />
      </>
    ) : null}
  </>
  );
}
return <></>;
};

export default DueAmount;
