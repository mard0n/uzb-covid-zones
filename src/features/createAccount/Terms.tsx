import React, { useState } from "react";
import {
  H2,
  Container,
  Button,
  Caption,
  Box,
  SectionSplitter,
  SubMain,
  SvgIcon
} from "@mashreq-digital/ui";
import { ChevronLeft } from "@mashreq-digital/webassets";
import { useTranslation } from "react-i18next";

const LeftContent = (props: any) => {
  const { t } = useTranslation();
  const { history } = props;
  const [scrolled, setScrolled] = useState(false);

  const handleBack = () => {
    history.push("/account/personalinfo");
  };

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
          <Button color="primary" onClick={handleBack} size="medium">
            <SvgIcon color="primary" component={ChevronLeft} />
            <span color="primary">{t("common.action.back")} </span>
          </Button>

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
