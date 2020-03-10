import React from "react";
import {
  H1,
  H3,
  Box,
  Button,
  SectionSplitter,
  SvgIcon,
  UnderlineText
} from "@mashreq-digital/ui";
import { ChevronLeft } from "@mashreq-digital/webassets";

const DetailedView = (props: any) => {
  return (
    <SectionSplitter
      borderTop
      top={
        <>
          <UnderlineText color="primary">
            <H1>Beneficiary details</H1>
          </UnderlineText>
          <H3>Bill Detected</H3>
        </>
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
