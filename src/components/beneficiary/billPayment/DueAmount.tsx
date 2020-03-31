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
}

const DueAmount = (props: DueAmountProps) => {
  const { dueAmount } = props;
  const { capitalize} = useStyles();
  const { t } = useTranslation();

  return(
  <>
    {dueAmount && dueAmount < 0 ? (
      <>
        <Box mt={5} mb={5}>
          <H3 gutterBottom>
            {t("beneficiary.manage.details.billDetected.title")}
          </H3>
          <Box mt={5}>
            <Caption>
              We have detucted that you are in credit of AED{" "}
              <b> {Math.abs(dueAmount)} </b> for this account number.
            </Caption>
          </Box>
        </Box>
      </>
    ) : null}

    {dueAmount && dueAmount > 0 ? (
      <>
        <Box mt={5} mb={5}>
          <H3 gutterBottom>
            {t("beneficiary.manage.details.billDetected.title")}
          </H3>
          <Caption>{t("beneficiary.manage.details.billDetected.desc")}</Caption>
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
              <H5>{dueAmount}</H5>
            </Box>
          }
        />
      </>
    ) : null}
  </>
  );
};

export default DueAmount;
