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
import { useHistory } from "react-router-dom";
import { PIN_SET } from "../../routes/config";
import { useTranslation } from "react-i18next";

export interface PinResetFailProps {}

const PinResetFail: React.SFC<PinResetFailProps> = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const handleSubmit = () => {
    history.replace({
      pathname: PIN_SET,
    });
  };
  return (
    <JourneySidebar steps={"cards.cardActivation.steps"} currentStep={3}>
      <SectionSplitter
        top={
          <Grid>
            <Box mb={5}>
              <UnderlineText>
                <H2>{t("cards.cardActivation.fail.title")}</H2>
              </UnderlineText>
            </Box>

            <Box mb={5}>
              <Body1>{t("cards.cardActivation.fail.subTitle")}</Body1>
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
              {t("cards.cardActivation.fail.mainBtnText")}
            </Button>
          </Box>
        }
      />
    </JourneySidebar>
  );
};

export default PinResetFail;
