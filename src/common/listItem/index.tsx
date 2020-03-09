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
  H4, Caption,
  makeStyles,Theme
} from "@mashreq-digital/ui";
import { Trash, Edit2 } from "@mashreq-digital/webassets";



const useStyles = makeStyles((theme: Theme)=>({
    root: {
        alignItems: "center",
        '&:hover': {
            color:"red",
            backgroundColor: theme?.palette?.primary,
        }
    },
    secondaryAction :{
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

const CustomListItem = (props: any) => {
  const {
    avatarComponent,
    avatarName,
    nickname,
    accountNumber,
    color,
    editCallback,
    deleteCallback
  } = props;
  const {root, secondaryAction} = useStyles(props);
  return (
    <Grid xl={12} lg={12} md={12} sm={12} xs={12}>
      <ListItem className={root}>
        <ListItemAvatar>
          <Avatar alt={avatarName}>{avatarComponent}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={<H4> {nickname} </H4>} />
        <ListItemText primary={<Caption> {accountNumber} </Caption>} />
        <Grid xl={3} lg={3} md={3} sm={3} xs={3}></Grid>
        <ListItemSecondaryAction className={secondaryAction}>
          <IconButton edge="start" aria-label="Edit" onClick={editCallback}>
            <SvgIcon component={Edit2} color={color} />
          </IconButton>

          <IconButton edge="end" aria-label="Delete" onClick={deleteCallback}>
            <SvgIcon component={Trash} color={color} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Grid>
  );
};

export default CustomListItem;
