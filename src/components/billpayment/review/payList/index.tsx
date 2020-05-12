import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Body1,
  H3,
  H5,
  Caption,
  makeStyles,
  Theme,
  Box,
  colors,
  SvgIcon,
  H4,
} from "@mashreq-digital/ui";
import CardIcon from "../../../../common/cardIcon";
import { capitalizeFirstLetter, formatCurrency } from "../../../../util/helper";
import { MoneyPouch, getMashreqLogo } from "@mashreq-digital/webassets";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: "6px",
    margin: `${theme.spacing(2.5)}px 0`,
    boxShadow: " 0px 8px 12px 0px rgba(0, 0, 0, 0.06)",
    border: "2px solid transparent",
    backgroundColor: "#fff",
    "&:hover, &:focus, &:active": {
      borderColor: "rgb(49, 49, 49)",
    },
    height: "72px",
    "& .MuiTypography-h4, & .MuiTypography-body1": {
      fontWeight: 600,
    },
    "& .MuiTypography-body1": {
      fontSize: `${theme.typography.pxToRem(14)}`,
      color: "rgba(20, 20, 20, 0.3)",
    },
  },
  descStyle: {
    fontWeight: "bold",
  },
  currencyStyle: {
    fontWeight: 600,
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
      borderColor: "#fff",
      background: "#fff",
    },
  },
  activeStyle: {
    borderColor: "rgb(49, 49, 49)",
  },
  statusStyle: {
    color: colors.green[500],
  },
  avatarSvgStyle: {
    backgroundColor: colors.deepOrange[50],
    padding: `${theme.spacing(1.66)}px ${theme.spacing(2)}px`,
    "& > svg": {
      height: "20px",
      width: "16px",
    },
  },
  listAvatarStyle: {
    minWidth: "auto",
    marginRight: theme.spacing(1),
  },
}));

const getSVG = (type: any) => {
  //update svg once we have updated mashreq-web-package icons
  switch (type) {
    case type === "loans":
      return MoneyPouch;
    case type === "deposits":
      return MoneyPouch;
    case type === "salaam":
      return MoneyPouch;    
    default:
      return MoneyPouch;
  }
};

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
  // avatarImage?: string | undefined;
  disabled?: boolean;
  active?: boolean;
  data: object | any;
  color?: string | undefined;
  isDefault?: boolean;
  selectOptions?: boolean;
  onClickCallback?: any | undefined;
}

const PayListItem = (props: CustomListItemProps) => {
  const {
    // avatarImage,
    disabled,
    color,
    isDefault,
    active,
    selectOptions,
    onClickCallback,
    data,
  } = props;

  const { name, accNo, status, currency, balance, type } = data;

  const {t} = useTranslation();
  
  const isCard = type && type === "cards",
    isAccountCard = isCard || type === "accounts";
  const {
    root,
    staticStyle,
    avatarSvgStyle,
    statusStyle,
    descStyle,
    currencyStyle,
    activeStyle,
    goldStyle,
    disabledStyle,
    listAvatarStyle,
  } = useStyles(props);
  let svgIconProps: any = {};

  let BeniLogo = getMashreqLogo("symbol");
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
    {selectOptions ?
    <Box
      display="flex"
      justifyContent="space-between"
      style={{ width: "100%" }}
    >
    <ListItemText primary={<H5 noWrap> Click on change and select </H5>} /> 
    </Box>:
    <>
      {/* <Avatar alt={name} src={avatarImage} /> */}
      {type && !isAccountCard && (
        <ListItemAvatar>
          <Box
            className={avatarSvgStyle}
            p={1.5}
            display="inline-flex"
            borderRadius="50%"
          >
          {type === "within-mashreq"? <BeniLogo width="20" height="20"/>:
            <SvgIcon
              height="14"
              width="16"
              htmlColor={colors.deepOrange[800]}
              component={getSVG(type)}
            />}
          </Box>
        </ListItemAvatar>
      )}

      {type && (type === "salaam" || type === "mm") && balance ? (
        <Box display="flex">
          <Box ml={2.6}>
            <H4>{type === "mm" ? "12 Apr 2020" : formatCurrency(balance)}</H4>
          </Box>
          <Box ml={1.3}><Caption>{t(`dashboard.productSummary.${type}.payList.title`)}</Caption></Box>
        </Box>
      ): type === "within-mashreq"? 
      (
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ width: "100%" }}
        >
          <Box width="calc(100% - 120px)">
            <ListItemText
            disableTypography={true}
            primaryTypographyProps={{noWrap: true}}
              primary={
                <Caption className={descStyle} noWrap>
                  {name}
                </Caption>
              }
            />
              <Box display="flex">
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <Box ml={1}>
                        <Body1> {accNo}</Body1>
                      </Box>
                    </Box>
                  }
                />
              
              </Box>
    
          </Box>
        </Box>
      )      
      : (
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ width: "100%" }}
        >
          <Box width="calc(100% - 120px)">
            <ListItemText
              primary={
                <Caption className={descStyle} noWrap>
                  {name}
                </Caption>
              }
            />
            {currency && (
              <Box display="flex">
                {isAccountCard && (
                  <ListItemAvatar className={listAvatarStyle}>
                    {type && isCard ? (
                      <CardIcon />
                    ) : (
                      <Box
                      // className={avatarSvgStyle}
                      // p={1.5}
                      // display="inline-flex"
                      // borderRadius="50%"
                      >
                        {/* Config Flag */}
                       <SvgIcon
                      height="14"
                      width="16"
                      htmlColor={colors.teal[800]}
                      component={MoneyPouch}
                    /> 
                      </Box>
                    )}
                  </ListItemAvatar>
                )}
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <Caption className={currencyStyle}>{currency}</Caption>
                      <Box ml={1}>
                        <H4>{formatCurrency(balance)}</H4>
                      </Box>
                    </Box>
                  }
                />
                {/* <ListItemText
                primary={
                  <Box display="flex" alignItems="center">
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
              /> */}
              </Box>
            )}
          </Box>

          <Box>
            <ListItemText
              primary={
                <Box display="flex" alignItems="center">
                  <Box pr={1} display="inline-block">
                    <Body1>
                      {type && isCard ? "**** " : ""}
                      {accNo}
                    </Body1>
                  </Box>
                  {/* {type && !isCard && (
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
              )} */}
                </Box>
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
      )
    
    }
</>
            }
    </ListItem>
  );
};

export default PayListItem;
