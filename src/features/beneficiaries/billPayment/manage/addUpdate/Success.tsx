import React from "react";
import {
  UnderlineText,
  Button,
  Box,
  H2,
  Caption,
  SectionSplitter
} from "@mashreq-digital/ui";
import { useTranslation } from "react-i18next";
import SucessFailureIcon from "../../../../../common/successFailureIcon";
import { replaceStr } from "../../../../../util/helper";

type SuccessProps = {
  success: boolean;
  type: string;
  onButtonCallback?: any;
};

const Success = (props: SuccessProps) => {
  const { success, type, onButtonCallback } = props;
  const { t } = useTranslation();
  const successString = success ? "success" : "failure";
  let title = t(`beneficiary.manage.addEdit.${successString}.title`);

  if(success) {
    title = replaceStr(title, '--type--', type.toUpperCase());
  }

  return (
    <SectionSplitter
      height="calc(100vh - 250px)"
      top={
        <>
          <SucessFailureIcon success={success} />
          <UnderlineText color="primary">
            <H2>{title}</H2>
          </UnderlineText>

          <Box mt={6} mb={6}>
            <Caption>
              {t(`beneficiary.manage.addEdit.${successString}.desc`)}
            </Caption>
          </Box>
        </>
      }
      bottom={
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              onButtonCallback();
            }}
            color="primary"
          >
            {t(`beneficiary.manage.addEdit.${successString}.buttonLanbel`)}
          </Button>
        </Box>
      }
    />
  );
};

Success.defaultProps = {
  success: true
}

export default Success;
