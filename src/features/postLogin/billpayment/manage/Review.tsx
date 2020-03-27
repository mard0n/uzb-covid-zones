import React, { useState } from "react";
import CardPayNow from "../../../../common/card/CardPayNow";
import {
  Box,
  UnderlineText,
  H2,
  H4,
  H5,
  SectionSplitter,
  Button,
  Grid
} from "@mashreq-digital/ui";
import getBeneficiariesAvatar from "../../../../util/getBeneficiariesAvatar";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "@mashreq-digital/webassets";
import { SvgIcon } from "@mashreq-digital/ui";
import BackButton from "../../../../common/backButton/index";
import PayListItem from "../../../../common/payList/index";

const Review = (props: any) => {
  const { data, type, title } = props;
  const { t } = useTranslation();
  const [dropList, setDropList] = useState(false);

  return (
    <SectionSplitter
      height="calc(100vh - 250px)"
      top={
        <>
          <UnderlineText color="primary">
            <H2>{t("review.title")}</H2>
          </UnderlineText>
          {data && data.id && (
            <>
              <Box mt={6} mb={6} display="flex" alignItems="center">
                <CardPayNow
                  style={{ justifyContent: "space-evenly" }}
                  heading="You are paying"
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
            </>
          )}

          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
            <Box mb={3} mt={5} display="flex" justifyContent="space-between">
              <H4>Paying From </H4>
              <Button
                onClick={() => {
                  setDropList(!dropList);
                }}
                color="primary"
              >
                Change
              </Button>
            </Box>
            <PayListItem
              avatarName="asdsada"
              nickname="test"
              accountNumber="12312312"
              amount="AED 121"
            />
            
            {dropList && (
              <>
                <PayListItem
                  avatarName="asdsada"
                  nickname="test"
                  accountNumber="12312312"
                  amount="AED 121"
                />
                <PayListItem
                  avatarName="asdsada"
                  nickname="test"
                  accountNumber="12312312"
                  amount="AED 121"
                />
              </>
            )}
          </Grid>
        </>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">
          <BackButton />

          <Button
            variant="contained"
            size="large"
            onClick={() => {
              console.log("Payclick");
            }}
            color="primary"
          >
            Pay AED {Math.abs(data.dueAmount)}
          </Button>
        </Box>
      }
    />
  );
};

export default Review;
