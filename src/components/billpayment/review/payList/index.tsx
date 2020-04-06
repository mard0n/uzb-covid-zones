import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Body2,
  H3,
  H5,
  Caption,
  makeStyles,
  Theme,
  Box,
  colors,
} from "@mashreq-digital/ui";
import { capitalizeFirstLetter } from "../../../../util/helper";

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
    "& h3" : {
      fontSize: `${theme.typography.pxToRem(16)}`
    }
  },
  disabledStyle: {
    backgroundColor: "#f2f2f2",
    opacity: "0.4",
    cursor: "no-drop",
    "&:hover, &:focus, &:active": {
      borderColor: "transparent",
    },
  },
  goldStyle: {
    backgroundColor: "rgba(170, 145, 87, 0.1)",
    color: "#aa9157",
    border: "1px solid rgb(170, 145, 87)",
    borderRadius: "16px",
    fontSize: "11px",
    lineHeight: "12px",
    display: "inline-block",
    padding: `${theme.spacing(0.4)}px ${theme.spacing(2.5)}px`,
    textTransform: "uppercase",
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
  statusStyle: {
    color: colors.green[500]
  },
}));

/**
 * @customProps
 *  @prop {Component}  avatarComponent ,
 *  @prop {string} avatarImage,
 *  @prop {boolean} disabled,
 *  @prop {boolean} static,
 *  @prop {object} data,
 *  @prop {string} color,
 *  @prop {function} onClickCallback
 * @return {Component}
 *
 */

interface CustomListItemProps {
  avatarImage?: string | undefined;
  disabled?: boolean;
  active?: boolean;
  data: object | any;
  color?: string | undefined;
  isDefault?: boolean;
  onClickCallback?: any | undefined;
}

const PayListItem = (props: CustomListItemProps) => {
  const {
    avatarImage,
    disabled,
    color,
    isDefault,
    active,
    onClickCallback,
    data,
  } = props;
  const {
    customerName,
    accountNumber,
    status,
    currency,
    availableBalance,
  } = data;
  const { root, staticStyle, statusStyle, activeStyle, goldStyle, disabledStyle } = useStyles(props);
  let svgIconProps: any = {};

  if (color) {
    svgIconProps["color"] = color;
  }

  return (
    <ListItem
      onClick={onClickCallback}
      button
      className={`${root} ${active ? activeStyle : ""} ${isDefault ? staticStyle : ""} ${
        disabled ? disabledStyle : ""
      }`}
    >
      <ListItemAvatar>
        <Avatar alt={customerName} src={avatarImage} />
      </ListItemAvatar>
      <Box
        display="flex"
        justifyContent="space-between"
        style={{ width: "100%" }}
      >
        <Box width="calc(100% - 120px)">
          <ListItemText primary={<H3 noWrap> {customerName} </H3>} />
          {status && (
            <ListItemText
              primary={
                <>
                  <Box pr={1} display="inline-block"><Body2>{accountNumber}</Body2></Box>
                  <Box display="inline-block"><Body2>|</Body2></Box>
                  <Box pl={1} display="inline-block">
                    <Body2 className={statusStyle} >{capitalizeFirstLetter(status)}</Body2>
                  </Box>
                </>
              }
            />
          )}
        </Box>

        <Box>
          <ListItemText
            primary={
              <Caption>
                {currency} <b>{availableBalance}</b>
              </Caption>
            }
          />
          <ListItemText
            primary={
              <Box display="flex" justifyContent="flex-end">
                <H5 className={goldStyle}>Gold</H5>
              </Box>
            }
          />
        </Box>
      </Box>
    </ListItem>
  );
};

export default PayListItem;
