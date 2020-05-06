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
  H5,
  H4,
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

const SmartPayList = (props: CustomListItemProps) => {
  const { disabled, color, isDefault, active, onClickCallback, data , select} = props;
  const { name, accNo, status, currency, balance, type, description } = data;
  const isCard = type && type === "cards";
  const { root, staticStyle, activeStyle, disabledStyle } = useStyles(
    props
  );
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
      {select ? (
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ width: "100%" }}
        >
          <ListItemText
            primary={<H3 noWrap> Please Select the card from list </H3>}
          />
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ width: "100%" }}
        >
          <Box width="calc(100% - 120px)">
            <ListItemText
              primary={
                <Caption noWrap>
                  {" "}
                  <b> {description} </b>
                </Caption>
              }
            />
            {status && (
              <ListItemText
                primary={
                  <Box display="flex">
                    {currency + " "}
                    <H4>
                      <b> {balance}</b>
                    </H4>
                  </Box>
                }
              />
            )}
          </Box>

          <Box>
            <ListItemText primary={<Caption>{accNo}</Caption>} />
            <ListItemText
              primary={
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  style={{ height: "23px", width: "61px", borderRadius: "5px" }}
                >
                  <Body1 color="primary">Mashreq</Body1>
                </Box>
              }
            />
          </Box>
        </Box>
      )}
    </ListItem>
  );
};

export default SmartPayList;
