import React, { ReactElement } from "react";
import {
  Modals,
  SvgIcon,
  H4,
  Button,
  Caption,
  Box,
  makeStyles,
  Theme,
  ButtonProps,
  colors
} from "@mashreq-digital/ui";
// import { transitionModalProps } from "@mashreq-digital/ui/dist/types/components";

const useStyles = makeStyles((theme: Theme) => ({
  root: (props: any) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiPaper-root": {
      width: props && props.minWidth ? "312px" : "60%"
    }
  }),
  svgIconStyle: (props: any) => ({
    backgroundColor: props.iconBgVariant && props.iconBgVariant === "warning" ? colors?.orange[500] : theme?.palette[props.iconBgVariant === "success" ? "success" : "error"]["main"],
    borderRadius: "50%",
    "& > svg": {
      height: "20px",
      width: "20px"
    }
  }),
  headingStyle: {
    marginBottom: theme?.spacing(2)
  }
}));

interface PrompTemplateProps {
  title: string;
  desc?: string;
  buttonLabel?: string;
  buttonProps?: ButtonProps;
  openModal: boolean;
  minWidth?: boolean;
  iconBgVariant?: "success" | "warning" | "error";
  onCloseModal?: any;
  modalProps: any;
  content?: ReactElement | undefined;
  icon?: any;
}

const PromptTemplate = (props: PrompTemplateProps) => {
  const { root, svgIconStyle, headingStyle } = useStyles(props);
  const {
    title,
    icon,
    desc,
    content,
    buttonLabel,
    buttonProps,
    openModal,
    onCloseModal,
    iconBgVariant,
    modalProps
  } = props;

  const onClose = () => {
    if (onCloseModal && typeof onCloseModal === "function") {
      onCloseModal();
    }
  };

  return (
    <Modals
      className={root}
      open={openModal}
      onClose={() => onClose()}
      {...modalProps}
    >
      <>
        {icon && (
          <Box
            mb={2}
            display="inline-block"
            pt={2}
            pb={1.3}
            px={2.3}
            className={svgIconStyle}
          >
            <SvgIcon htmlColor="#fff" component={icon} />
          </Box>
        )}
        <Box mt={2} mb={3.5}>
          <H4 className={headingStyle} gutterBottom>
            {title}
          </H4>
          {desc && <Caption>{desc}</Caption>}
        </Box>
        {content && <Box>{content}</Box>}
        {buttonLabel && (
          <Button color="primary" {...buttonProps} fullWidth>
            {buttonLabel}
          </Button>
        )}
      </>
    </Modals>
  );
};

PromptTemplate.defaultProps = {
  buttonProps: {},
  minWidth: true,
  iconBgVariant: "success",
  modalProps: { children: <></> }
};

export default PromptTemplate;
