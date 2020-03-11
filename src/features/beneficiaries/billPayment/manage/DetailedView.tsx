import React from "react";
import {
  H2,
  H3,
  Box,
  Button,
  SectionSplitter,
  SvgIcon,
  UnderlineText,
  Caption,
  Grid,
  IconButton
} from "@mashreq-digital/ui";
import { ChevronLeft } from "@mashreq-digital/webassets";
import CardPayNow from "../../../../common/card/CardPayNow";
import getBeneficiariesAvatar from "../../../../util/getBeneficiariesAvatar";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import {Edit2, Trash} from "@mashreq-digital/webassets";
import * as RoutePath from "../../../../router/config";

const DetailedView = (props: any) => {
  const { t } = useTranslation();
  const history = useHistory();

  let BENIFICIARY_DETAILS = [
    "Account Type ",
    "DEWA Accont Number",
    "Nick Name",
    "Status",
    "Beneficiary Creation Date"
  ];

  const onEditCallback = () => {
    history.push(RoutePath.BENIFICIARY_BILL_PAYMENT_ADD_EDIT);
  };
  const onDeleteCallback = () => {
    // history.push(RoutePath.BENIFICIARY_BILL_PAYMENT_ADD_EDIT);
  };

  return (
    <SectionSplitter
      height="calc(100vh - 146px)"
      borderTop
      top={
        <Box>
          <Box mb={5}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                <UnderlineText color="primary">
                  <H2>{t("beneficiary.manage.details.title")}</H2>
                </UnderlineText>
              </Grid>
              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                <Box display="flex" justifyContent="flex-end">
                  <Box>
                    <IconButton
                      edge="start"
                      aria-label="Edit"
                      color="primary"
                      onClick={e => onEditCallback()}
                    >
                      <SvgIcon component={Edit2} />
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton
                      color="primary"
                      edge="end"
                      aria-label="Delete"
                      onClick={e => onDeleteCallback()}
                    >
                      <SvgIcon component={Trash} />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box mt={5} mb={5}>
              <Grid container item xs={12} spacing={3}>
                {BENIFICIARY_DETAILS.map((details: any) => {
                  return (
                    <Grid item xs={4}>
                      <Caption color="textSecondary"> {details} </Caption>{" "}
                      <br />
                      <Caption> Dewa </Caption>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            <Box mt={5} mb={5}>
              <H3>{t("beneficiary.manage.details.billDetected.title")}</H3>
              <Caption>
                {t("beneficiary.manage.details.billDetected.desc")}
              </Caption>
            </Box>

            <CardPayNow
              buttonLable={t("common.action.payNow")}
              heading="Rent Dubai"
              image={getBeneficiariesAvatar("DU")}
              subheading="AED 123"
            />
          </Box>
        </Box>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">
          <Button color="primary" size="medium">
            <SvgIcon color="primary" component={ChevronLeft} />
            <span color="primary">{t("common.action.back")}</span>
          </Button>
        </Box>
      }
    />
  );
};

export default DetailedView;
