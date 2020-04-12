import React from 'react';
import {
  Box,
  makeStyles,
  H5,
  Body1,
  colors
} from "@mashreq-digital/ui";
import { SvgIcon } from "@mashreq-digital/ui";
import { capitalizeFirstLetter } from '../../../util/helper';
import CardPayNow from '../../../common/card/CardPayNow';
import { ArrowRight } from '@mashreq-digital/webassets';
import getBeneficiariesAvatar from '../../../util/getBeneficiariesAvatar';

const useStyles = makeStyles(() => ({
  iconStyle:{
    backgroundColor: "rgb(224, 224, 224)",
    "& > svg" : {
      height: "15px",
      width: "15px"
    }
  },
  successIconStyle: {
    backgroundColor: colors.green[100],
    "& > svg" : {
      fill: colors.green[500]
    }
  }
 
}));

type ReviewAmountTypeProps = {
  data: any, 
  type: string, 
  isSuccess?: boolean, 
  leftIcon?: any, 
  title: string
}

const ReviewAmountType = (props: ReviewAmountTypeProps) => {
  const { data, type, isSuccess, leftIcon, title } = props;
  const { rechargeAmount, telecomType, nickname, accountNumber } = data;
  const { iconStyle, successIconStyle } = useStyles();

  let typeWithTab = capitalizeFirstLetter(type) + ' '+ (telecomType ? capitalizeFirstLetter(telecomType) : ''),
  cardHeading = nickname ? nickname : `${typeWithTab}`,
  cardSubheading = nickname ? `${typeWithTab} | ${accountNumber}` : accountNumber;

  // let  cardHeading = nickname ? nickname : `${capitalizeFirstLetter(type)} ${
  //   telecomType ? capitalizeFirstLetter(telecomType) : ""}`,
  // cardSubheading = nickname ? `${capitalizeFirstLetter(type)} ${
  //   telecomType ? capitalizeFirstLetter(telecomType) : ""
  // } | ${accountNumber}` : accountNumber;

  return (
    <Box mt={6} mb={6} display="flex" alignItems="center" >
      <CardPayNow
        icon={<Box className={isSuccess ? successIconStyle : iconStyle} p={1.6} borderRadius="50%" display="flex">
        <SvgIcon height="1rem" width="1rem" component={leftIcon} />
      </Box>}
        heading={<Body1>{title}</Body1>}
        subheading={<H5>AED {Math.abs(rechargeAmount)}</H5>}
      />
      <Box ml={3} mr={3}>
        <SvgIcon component={ArrowRight} />
      </Box>
      {type && (
      <CardPayNow
        heading={cardHeading}
        subheading={cardSubheading}
        image={getBeneficiariesAvatar(type.toLowerCase())}
      />
    )}
      {/* <CardPayNow
        style={{ justifyContent: "space-evenly" }}
        heading={data.nickname}
        subheading={
          serviceTypeCode +
          " " +
          (type && type.toLowerCase()! === ("du" || "etisalat")
            ? t("common.label.nickName")
            : "") +
          " | " +
          accountNumber
        }
        image={getBeneficiariesAvatar(type.toLowerCase())}
      /> */}
    </Box>
  )
}

export default ReviewAmountType;
