import React from "react";
import {
  ListItem,
  Button,
  makeStyles,
  Theme,
  Body1,
} from "@mashreq-digital/ui";
import { Plus } from '@mashreq-digital/webassets';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: "6px",
    margin: `${theme.spacing(2.5)}px 0`,
    boxShadow: " 0px 8px 12px 0px rgba(0, 0, 0, 0.06)",
    border: "2px solid transparent",
    "&:hover, &:focus, &:active": {
      borderColor: "rgb(49, 49, 49)",
    },
    height: "72px",
    "& h3": {
      fontSize: `${theme.typography.pxToRem(16)}`,
    },
  },

  staticStyle: {
    cursor: "default",
    "&:hover, &:focus, &:active": {
      borderColor: "transparent",
      background: "transparent",
    },
  },
  activeStyle: {
    borderColor: "rgb(49, 49, 49)",
  },
}));

const EmtyList = (props: any) => {
  const { heading, button } = props;
  const { root, staticStyle } = useStyles(props);
  return (
    <ListItem button className={`${root} ${staticStyle}`}>
      <Body1> {heading} </Body1>
      {button && (
        <Button size="medium" variant="contained" color="primary">
          Get one in 4 steps
        </Button>
      )}

    </ListItem>
  );
};

export default EmtyList;
