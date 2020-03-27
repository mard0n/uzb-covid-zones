import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  SvgIcon,
  H4,
  Caption,
  makeStyles,
  Button,
  Theme,
  Box
} from "@mashreq-digital/ui";
import { Trash, Edit2 } from "@mashreq-digital/webassets";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: "6px",
  boxShadow:" 0px 8px 12px 0px rgba(0, 0, 0, 0.06)",
  "&:hover, &:focus, &:active": {
    borderRadius: "4px",
    border: "2px solid rgb(49, 49, 49)"
      },
    height: "72px"
  }
}));

/**
 * @customProps
 *  @prop {Component}  avatarComponent ,
 *  @prop {string} avatarName,
 *  @prop {string} nickname,
 *  @prop {string} accountNumber,
 *  @prop {string} color,
 *  @prop {string} amount,
 *  @prop {function} editCallback,
 *  @prop {function} deleteCallback
 * @return {Component}
 *
 */

interface CustomListItemProps {
  avatarImage?: string | undefined;
  avatarName: string;
  amount: string;
  nickname: string;
  accountNumber: string;
  onResumeLabel?: string;
  color?: string | undefined;
  editCallback?: any | undefined;
  deleteCallback?: any | undefined;
  onResumeCallback?: any | undefined;
}

const PayListItem = (props: CustomListItemProps) => {
  const {
    avatarImage,
    amount,
    avatarName,
    nickname,
    accountNumber,
    color,
  } = props;
  const { root } = useStyles(props);
  let svgIconProps: any = {};

  if (color) {
    svgIconProps["color"] = color;
  }


  return (

      <ListItem button className={root}>
          <ListItemAvatar>
            <Avatar alt={avatarName} src={avatarImage} />
          </ListItemAvatar>
         <Box display="flex" justifyContent="space-between"  style={{width:"100%"}}>
          <Box>
        <ListItemText primary={<H4> {nickname} </H4>} />
        <ListItemText primary={<Caption> {accountNumber} | "Active" </Caption>} />
        </Box>

        <Box>
        <ListItemText primary={<Caption> {amount} </Caption>} />
        <ListItemText primary={<Caption> "Gold" </Caption>} />
        </Box>

        </Box>     
      </ListItem>

  );
};

export default PayListItem;
