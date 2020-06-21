import * as React from "react";
import {
  Box,
  UnderlineText,
  Body1,
  SectionSplitter,
  Button,
  Grid,
  H2,
} from "@mashreq-digital/ui";
import JourneySidebar from "../../../../components/JourneySidebar";
import { useTranslation } from "react-i18next";

export interface PinResetSuccessProps {}

const PinResetSuccess: React.SFC<PinResetSuccessProps> = () => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    // TODO: Redirect to wherever they came from
  };
  return (
    <JourneySidebar steps={"cards.cardActivation.steps"} currentStep={3}>
      <SectionSplitter
        top={
          <Grid>
            <Box mb={5}>
              <UnderlineText>
                <H2>{t("cards.cardActivation.success.title")}</H2>
              </UnderlineText>
            </Box>

            <Box mb={5}>
              <Body1>{t("cards.cardActivation.success.subTitle")}</Body1>
            </Box>
          </Grid>
        }
        bottom={
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handleSubmit}
            >
              {t("cards.cardActivation.success.mainBtnText")}
            </Button>
          </Box>
        }
      />
    </JourneySidebar>
  );
};

export default PinResetSuccess;
