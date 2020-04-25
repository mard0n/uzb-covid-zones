import React, { ReactNode } from "react";
import {
  H4,
  Caption,
  Avatar,
  Card,
  Button,
  CardContent,
  SvgIcon,
  makeStyles,
  createStyles,
} from "@mashreq-digital/ui";

import { ChevronRight } from "@mashreq-digital/webassets";

// const du = require("../../assets/images/beneficiaries/Du.png");

const useStyles = makeStyles((theme: any) =>
  createStyles({
    card: (props: any) => ({
      display: "flex",
      paddingRight: theme.spacing(0.5),
      width: props && props.fullWidth ? "100%" : props && props.TIcon ? "408px" : "327px",
      borderRadius: "8px",
      alignItems: "center",
      justifyContent: "flex-start",
      boxShadow: props && props.boxShadow ? "0px 8px 12px 0px rgba(0, 0, 0, 0.06)" : "none",
      padding: `0 ${theme.spacing(4)}px`,
      cursor: props && props.link ? "pointer" : "default"
    }),
    iconStyle: {
      display: "flex",
      justifyContent: "left",
      marginBottom: theme.spacing(2.5),
    },
    avt: {
      minHeight: "64px",
      minWidth: "64px",
      color: theme.palette.getContrastText("rgba(255, 94, 0, 0.14)"),
      backgroundColor: "rgba(255, 94, 0, 0.14)",
    },
    button: {
      width: 118,
      height: 85,
    },
    arrowStyle: {
      height: "15px",
    },
  })
);

type CardPayNowProps = {
  heading?: ReactNode | string | undefined;
  subheading?: ReactNode | string | undefined;
  callback?: any;
  fullWidth?: boolean;
  boxShadow?: boolean;
  cardCallBack?: any;
  buttonLable?: string;
  arrow?: boolean;
  icon?: any;
  image?: string;
  TIcon?: any;
  logo?: boolean;
  link?: boolean;
  style?: any;
};

const CardPayNow = (props: CardPayNowProps) => {
  const {
    heading,
    arrow,
    icon,
    subheading,
    TIcon,
    logo,
    style = {},
    buttonLable,
    image,
    // link,
    cardCallBack,
    callback,
  } = props;

  const { card, button, arrowStyle, iconStyle, avt } = useStyles(props);
  return (
    <Card
      className={card}
      style={style}
      onClick={(e: any) => {
        if (cardCallBack && typeof cardCallBack === "function") {
          cardCallBack(e);
        }
      }}
    >
      {image && <Avatar src={image} />}
      {icon}
      {TIcon && (
        <div className={iconStyle}>
          {logo ? (
            <Avatar className={avt}>
              <TIcon width="50px" height="46px" />
            </Avatar>
          ) : (
            <Avatar className={avt}>
              <SvgIcon fontSize={"large"} color={"primary"} component={TIcon} />
            </Avatar>
          )}
        </div>
      )}
      <CardContent>
        <H4 gutterBottom> {heading} </H4>
        <Caption>{subheading}</Caption>
      </CardContent>
      {buttonLable && (
        <Button
          onClick={(e: any) => {
            if (callback && typeof callback === "function") {
              callback(e);
            }
          }}
          variant="contained"
          color="primary"
          className={button}
        >
          {buttonLable}
        </Button>
      )}
      {arrow && <SvgIcon className={arrowStyle} component={ChevronRight} />}
    </Card>
  );
};

CardPayNow.defaultProps = {
  boxShadow: true
}

export default CardPayNow;
