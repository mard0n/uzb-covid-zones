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
  Grid
} from "@mashreq-digital/ui";
import { ChevronLeft } from "@mashreq-digital/webassets";
import CardPayNow from "../../components/card/CardPayNow";
import getBeneficiariesAvatar from "../../util/getBeneficiariesAvatar";

const DetailedView = (props: any) => {
  // {
  //     id: 111,
  //     accountNumber: "2751233956",
  //     nickname: "test Masood",
  //     category: "Telecom",
  //     serviceType: "DU",
  //     serviceTypeCode: "du-prepaid-mobile",
  //     status: "ACTIVE",
  //     createdDate: "2020-03-05T07:35:14.009Z",
  //     activeAfter: "2020-03-05T13:54:23.105Z"
  //   },

  let BENIFICIARY_DETAILS = [
    "Account Type ",
    "DEWA Accont Number",
    "Nick Name",
    "Status",
    "Beneficiary Creation Date"
  ];

  return (
    <SectionSplitter
      height="calc(100vh - 146px)"
      borderTop
      top={
        <Box>
          <UnderlineText color="primary">
            <H2>Beneficiary details</H2>
          </UnderlineText>
          <Box mt={5} mb={5}>
            <Grid container item xs={12} spacing={3}>
              {BENIFICIARY_DETAILS.map((details: any) => {
                return (
                  <Grid item xs={4}>
                    <Caption color="textSecondary"> {details} </Caption> <br />
                    <Caption> Dewa </Caption>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          <H3>Bill Detected</H3>
          <Box mt={5} mb={5}>
            <Caption>
              We have detected an outstanding bill payment for this account
              number
            </Caption>
          </Box>

          <CardPayNow
            heading="Rent Dubai"
            image={getBeneficiariesAvatar("DU")}
            subheading="AED 123"
          />
        </Box>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">
          <Button color="primary" size="medium">
            <SvgIcon color="primary" component={ChevronLeft} />
            <span color="primary">Back </span>
          </Button>
        </Box>
      }
    />
  );
};

export default DetailedView;
