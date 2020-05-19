import React from "react";
import {
  Box,
  Body2,
  makeStyles,
  Theme,
  SvgIcon,
  Caption,
  Button,
} from "@mashreq-digital/ui";
import { ChevronRight } from "@mashreq-digital/webassets";

const useStyles = makeStyles((theme: Theme) => ({
  selectBox: (props: any) => ({
    background: "rgb(255, 255, 255)",
    borderRadius: "4px",
    border:  props.active ?  "2px solid rgb(49, 49, 49)" : "1px solid rgb(221, 224, 233)",
    paddingTop: "8px",
    paddingLeft: "15px",
    minHeight: "92px",
    minWidth: "300px",
    textAlign: "left",
  }),
}));

interface selectBoxProps {
  title: string;
  content: string;
  onClick?: any;
  active?:Boolean;
}

const SelectBox = (props: selectBoxProps) => {
  const { selectBox } = useStyles(props);
  const { title, content, onClick } = props;

  return (
    <Box
      className={selectBox}
      component={Button}
      ml={3}
      mt={3}
      onClick={onClick}
    >
      <Box>
        <Body2><b>{title}</b></Body2>
        <Caption> <span style={{ color: "rgb(110, 110, 110)" }}>{content}</span></Caption>
      </Box>
    </Box>
  );
};

export default SelectBox;
