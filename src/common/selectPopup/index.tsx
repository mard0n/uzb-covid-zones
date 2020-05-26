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
  selectBox: {
    background: "rgb(248, 249, 252)",
    borderRadius: "4px",
    border: "1px solid rgb(204, 214, 222)",
    paddingTop: "8px",
    paddingLeft: "15px",
    minHeight: "61px",
    minWidth: "513px",
    textAlign: "left"
},
}));

interface SelectPopupProps {
  title: string;
  content: string;
  onClick?: any;
};

const SelectPopup = (props: SelectPopupProps) => {
  const { selectBox } = useStyles();
  const { title, content, onClick } = props;

  return (
      <Box
        className={selectBox}
        display="flex"
        justifyContent="space-between"
        component={Button}
        onClick={onClick}
      >
        <Box>
          <Caption>
            <span style={{ color: "rgb(115, 135, 148)" }}>{title}</span>
          </Caption>
          <Body2>{content}</Body2>
        </Box>

        <Box mr={2}  alignItems="center" >
          <SvgIcon width="16px" height="16px" component={ChevronRight} />
        </Box>
      </Box>
  );
};

export default SelectPopup;
