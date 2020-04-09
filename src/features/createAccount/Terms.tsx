import React, { useState } from "react";
import {
  H2,
  Container,
  Button,
  Caption,
  Box,
  SectionSplitter,
  SubMain
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import BackButton from "../../common/backButton";

const LeftContent = (props: any) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, offsetHeight } = e.target;
    if (scrollTop === scrollHeight - offsetHeight) {
      setScrolled(true);
    }
  };

  return (
    <SectionSplitter
      top={
        <Box mt={10}>
          <H2> {t("account.termsAndConditions.title")}</H2>
          <Container>
            <Box
              my={2}
              id="termScroll"
              style={{ height: "490px", overflowY: "scroll" }}
              onScroll={handleScroll}
            >
              <Caption>
                {[...new Array(12)]
                  .map(() => t("account.termsAndConditions.desc"))
                  .join("\n")}
              </Caption>
            </Box>
          </Container>
        </Box>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">
          <BackButton />

          <Button
            variant="contained"
            size="medium"
            color="primary"
            disabled={!scrolled}
            onClick={props.handleNextStep}
          >
            {t("account.termsAndConditions.action")}
          </Button>
        </Box>
      }
      borderTop={true}
    />
  );
};

const Terms = (props: any) => {
  return <SubMain content={<LeftContent {...props} />} image={<Box></Box>} />;
};
export default Terms;
