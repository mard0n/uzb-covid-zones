import React, { ReactElement } from "react";
import {
  Modals,
  SvgIcon,
  H4,
  Button,
  Caption,
  Box,
  colors,
  makeStyles,
  Theme,
  ButtonProps
} from "@mashreq-digital/ui";
import { transitionModalProps } from "@mashreq-digital/ui/dist/types/components";

const useStyles = makeStyles((theme: Theme) => ({
  svgIconStyle: {
    backgroundColor: colors?.orange[500],
    borderRadius: "50%",
    "& > svg" : {
      height: "20px",
      width: "20px"
    }
  },
  headingStyle: {
    marginBottom: theme?.spacing(2)
  }
}));

interface PrompTemplateProps {
  title: string;
  desc?: string;
  buttonLabel: string;
  buttonProps: ButtonProps;
  modalProps: transitionModalProps;
  content?: ReactElement | undefined;
  icon?: any;
}

const PromptTemplate = (props: PrompTemplateProps) => {
  const { svgIconStyle, headingStyle } = useStyles();
  const { title, icon, desc, content, buttonLabel, buttonProps, modalProps } = props;
  return (
    <Modals {...modalProps}>
      <>
      {icon && (
        <Box mb={2} display="inline-block" pt={2} pb={1.3} px={2.3} className={svgIconStyle}>
          <SvgIcon
            htmlColor="#ffffff"
            component={icon}
          />
        </Box>
      )} 
      <Box mt={2} mb={3.5}>
      <H4 className={headingStyle} gutterBottom>{title}</H4>
      {desc && <Caption>{desc}</Caption>}
      </Box>
      {content &&
        <Box>{content}</Box>
      }
      {buttonLabel && 
      <Button color="primary" {...buttonProps} fullWidth>
        {buttonLabel}
      </Button>
      }
      </>
    </Modals>
  );
};

PromptTemplate.defaultProps = {
  buttonProps:{},
  modalProps:{open:false, children:<></>}
}

export default PromptTemplate;
