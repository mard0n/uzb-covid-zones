import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Body1,
  H3,
  Caption,
  makeStyles,
  Theme,
  Box,
  colors,
  SvgIcon,
} from "@mashreq-digital/ui";
import CardIcon from "../cardIcon";
import { capitalizeFirstLetter } from "../../util/helper";
import { MoneyPouch } from "@mashreq-digital/webassets";

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
    color: colors.green[500],
  },
  avatarSvgStyle: {
    backgroundColor: colors.teal[50],
    padding: `${theme.spacing(1.66)}px ${theme.spacing(2)}px`,
    "& > svg": {
      height: "20px",
      width: "16px",
    },
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
  select?: boolean;
  active?: boolean;
  data?: object | any;
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
    select,
    active,
    onClickCallback,
    data,
  } = props;
  const { name, accNo, status, currency, balance, type } = data;
  const isCard = type && type === "cards";
  const {
    root,
    staticStyle,
    avatarSvgStyle,
    statusStyle,
    activeStyle,
    disabledStyle,
  } = useStyles(props);
  let svgIconProps: any = {};

  if (color) {
    svgIconProps["color"] = color;
  }

  return (
    <ListItem
      onClick={onClickCallback}
      button
      className={`${root} ${active ? activeStyle : ""} ${
        isDefault ? staticStyle : ""
      } ${disabled ? disabledStyle : ""}`}
    >
      {/* <Avatar alt={name} src={avatarImage} /> */}
      
      {select ?       <Box
        display="flex"
        justifyContent="space-between"
        style={{ width: "100%" }}
      >
      <ListItemText primary={<H3 noWrap> Please Select the card from list </H3>} /> 
      </Box>     :
      <>
      <ListItemAvatar>
        {type && isCard ? (
          <CardIcon />
        ) : (
          <Box
            className={avatarSvgStyle}
            p={1.5}
            display="inline-flex"
            borderRadius="50%"
          >
            <SvgIcon
              height="14"
              width="16"
              htmlColor={colors.teal[800]}
              component={MoneyPouch}
            />
          </Box>
        )}
      </ListItemAvatar>
      <Box
        display="flex"
        justifyContent="space-between"
        style={{ width: "100%" }}
      >
        <Box width="calc(100% - 120px)">
          <ListItemText primary={<H3 noWrap> {name} </H3>} />
          {status && (
            <ListItemText
              primary={
                <Box display="flex">
                  <Box pr={1} display="inline-block">
                    <Body1>
                      {type && isCard ? "**** **** **** " : ""}
                      {accNo}
                    </Body1>
                  </Box>
                  {type && !isCard && (
                    <>
                      <Box display="inline-block">
                        <Body1>|</Body1>
                      </Box>
                      <Box pl={1} display="inline-block">
                        <Body1 className={statusStyle}>
                          {capitalizeFirstLetter(status)}
                        </Body1>
                      </Box>
                    </>
                  )}
                </Box>
              }
            />
          )}
        </Box>

        <Box>
          <ListItemText
            primary={
              <Caption>
                {currency} <b>{balance}</b>
              </Caption>
            }
          />
          <ListItemText
            primary={
              <Box display="flex" justifyContent="flex-end">
                {/* <H5 className={goldStyle}>Gold</H5> */}
              </Box>
            }
          />
        </Box>
      </Box>
      </>
    }
    </ListItem>
  );
};

export default PayListItem;
