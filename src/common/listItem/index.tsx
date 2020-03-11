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
  Theme
} from "@mashreq-digital/ui";
import { Trash, Edit2 } from "@mashreq-digital/webassets";

const useStyles = makeStyles((theme: Theme) => ({
  gridRoot: {
    paddingBottom: "inherit"
  },
  root: {
    borderColor: "#dde0e9",
    borderStyle: "solid",
    borderWidth: "thin",
    alignItems: "center",
    marginBottom: theme?.spacing(1.5),
    "&:hover, &:focus, &:active": {
      backgroundColor: "rgba(255, 79, 0, 0.05)"
    },
    height: "72px"
  },
  secondaryAction: {
    alignItems: "center"
  }
}));

/**
 * @customProps
 *  @prop {Component}  avatarComponent ,
 *  @prop {string} avatarName,
 *  @prop {string} nickname,
 *  @prop {string} accountNumber,
 *  @prop {string} color,
 *  @prop {function} editCallback,
 *  @prop {function} deleteCallback
 * @return {Component}
 *
 */

 interface CustomListItemProps {
  avatarImage? : string | undefined,
  avatarName: string,
  nickname: string,
  accountNumber: string,
  color?: string | undefined,
  editCallback?: any | undefined,
  deleteCallback?: any | undefined
 }

const CustomListItem = (props: CustomListItemProps) => {
  const {
    avatarImage,
    avatarName,
    nickname,
    accountNumber,
    color,
    editCallback,
    deleteCallback
  } = props;
  const { root, secondaryAction, gridRoot } = useStyles(props);
  let svgIconProps: any = {};  

  if(color) {
    svgIconProps["color"] = color;
  }

  const onEditCallback = (e: any) => {
    if(editCallback && typeof editCallback === "function") {
      editCallback(e);
    }
  }
  const onDeleteCallback = (e: any) => {
    if(deleteCallback && typeof deleteCallback === "function") {
      deleteCallback(e);
    }
  }

  return (
    <Grid xl={12} lg={12} md={12} sm={12} xs={12} className={gridRoot}>
      <ListItem className={root} button>
        {avatarImage &&
        <ListItemAvatar>
          <Avatar alt={avatarName} src={avatarImage} />
        </ListItemAvatar>
}
        <ListItemText primary={<H4> {nickname} </H4>} />
        <Grid xl={3} lg={3} md={3} sm={3} xs={3}>
          <ListItemText primary={<Caption> {accountNumber} </Caption>} />
        </Grid>
        <Grid xl={3} lg={3} md={3} sm={3} xs={3}></Grid>
        <ListItemSecondaryAction className={secondaryAction}>
          <IconButton edge="start" aria-label="Edit" onClick={(e)=>onEditCallback(e)}>
            <SvgIcon component={Edit2} {...svgIconProps} />
          </IconButton>
          <IconButton edge="end" aria-label="Delete" onClick={(e) => onDeleteCallback(e)}>
            <SvgIcon component={Trash} {...svgIconProps} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Grid>
  );
};

export default CustomListItem;
