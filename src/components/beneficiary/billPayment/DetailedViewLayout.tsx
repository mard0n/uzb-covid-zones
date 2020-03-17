import React from "react";
import { useTranslation } from "react-i18next";
import {
  H2,
  H3,
  H5,
  Box,
  SvgIcon,
  UnderlineText,
  Caption,
  Grid,
  IconButton,
  makeStyles,
  Theme
} from "@mashreq-digital/ui";
import { Edit2, Trash } from "@mashreq-digital/webassets";
import CardPayNow from "../../../common/card/CardPayNow";
import ImageWithText from "../../../common/imageWithText";
import { capitalizeFirstLetter } from "../../../util/helper";

// import getBeneficiariesAvatar from "../../../../util/getBeneficiariesAvatar";

const useStyles = makeStyles((theme: Theme) => ({
  capitalize: {
    textTransform: "capitalize"
  },
  gridWrapperStyle: {
    margin: `${theme?.spacing(5)}px 0`
  },
  gridItemStyle: {
    padding: `${theme?.spacing(5)}px 0`
  }
}));

const DetailViewLayout = (props: any) => {
  const { capitalize, gridWrapperStyle, gridItemStyle } = useStyles();
  const { t } = useTranslation();
  const { onEditCallback, onDeleteCallback, bill} = props;
  const {
    serviceType,
    serviceTypeCodeTel,
    serviceTypeCode,
    accountNumber,
    nickname,
    status,
    createdDate,
    dueAmount
  } = bill;
  /* We are handling this data in landingSaga. 
  For detail view we are getting data through api call because of billdueAmount.
  If we are going to reuse the landing data then remove the below const telCode */

  let telCode = serviceTypeCode;
  if(serviceTypeCode.indexOf("etisalat") > -1) {
    telCode = 'etisalat';
  } else if(serviceTypeCode.indexOf("du") > -1) {
    telCode = 'du';
  }
  // console.log("DetailViewLayout -> telCode", telCode)
  /*change the below telcode to serviceTypeCodeTEL 
    const type = serviceTypeCodeTel || telCode? telCode : serviceType;
  */

 let sampleDate = new Date(createdDate);
 let month = sampleDate.getMonth()+1;
 let date = sampleDate.getDate() +'.' + (month< 10 ? ("0" + month) : month) + '.'+sampleDate.getFullYear();
  const type = telCode? telCode : serviceType;

  let BENIFICIARY_DETAILS = [
    { title: t("beneficiary.manage.details.type"), value: serviceType },
    {
      title: type + " " + t("common.label.accountNumber"),
      value: accountNumber
    },
    { title: t("common.label.nickName"), value: nickname },
    {
      title: t("beneficiary.manage.details.status"),
      value: capitalizeFirstLetter(status)
    },
    {
      title: t("beneficiary.manage.details.creationDate"),
      value: createdDate ? date : "-"
    }
  ];

  return (
    <Box>
      <Box mb={8}>
        <ImageWithText
          name={type}
        />
      </Box>
      <Box mb={5}>
        <Box>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
              <UnderlineText color="primary">
                <H2>{nickname}</H2>
              </UnderlineText>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
              <Box display="flex" justifyContent="flex-end">
                <Box>
                  <IconButton
                    edge="start"
                    aria-label="Edit"
                    color="primary"
                    onClick={(e: any) => onEditCallback(e)}
                  >
                    <SvgIcon component={Edit2} />
                  </IconButton>
                </Box>
                <Box>
                  <IconButton
                    color="primary"
                    edge="end"
                    aria-label="Delete"
                    onClick={(e: any) => onDeleteCallback(e)}
                  >
                    <SvgIcon component={Trash} />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container className={gridWrapperStyle} item xs={12}>
            {BENIFICIARY_DETAILS.map((details: any, i: number) => {
              const { title, value } = details;
              return (
                <Grid key={i} className={gridItemStyle} item xs={3}>
                  <Box display="flex" flexDirection="column">
                    <Caption
                      color="textSecondary"
                      gutterBottom
                      className={capitalize}
                    >
                      {title}
                    </Caption>
                    <Caption>{value}</Caption>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        {dueAmount && dueAmount > 0 ? (
          <>
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
                  <H5>{dueAmount}</H5>
                </Box>
              }
            />
          </>
        ): null}
      </Box>
    </Box>
  );
};

export default DetailViewLayout;
