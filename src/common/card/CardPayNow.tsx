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

import {ChevronRight} from "@mashreq-digital/webassets";

// const du = require("../../assets/images/beneficiaries/Du.png");

const useStyles = makeStyles((theme: any) =>
  createStyles({
    card: (props: any) => ({
      display: "flex",
      paddingRight: theme.spacing(0.5),
      width: "327px",
      borderRadius: "8px",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: `0 ${theme.spacing(4)}px`,
      cursor: props && props.link ? "pointer" : "default"
    }),
    button: {
      width: 118,
      height: 85
    },
    arrowStyle: {
      height: "15px"
    }
  })
);

type CardPayNowProps = {
  heading?: ReactNode | string | undefined;
  subheading? : ReactNode | string | undefined;
  callback? : any;
  buttonLable? : string; 
  arrow?:boolean;
  icon?: any;
  image? : string;
  link?: boolean;
  style? : any;
}

const CardPayNow = (props: CardPayNowProps) => {
  const { heading,arrow, icon, subheading, style={}, buttonLable, image, link,callback } = props;

  const { card, button, arrowStyle } = useStyles(props);
  return (
    <Card className={card} style={style}>
      {image && <Avatar src={image} />}
      {icon}
      <CardContent>
        <H4 gutterBottom> {heading} </H4>
        <Caption>{subheading}</Caption>
      </CardContent>
      {buttonLable && 
      <Button
        onClick={(e: any)=> {if(callback && typeof callback === "function"){callback(e)}}}
        variant="contained"
        color="primary"
        className={button}
      >
        {buttonLable}
      </Button>
      }
     {arrow && <SvgIcon className={arrowStyle} component={ChevronRight}/> }
    </Card>
  );
};

export default CardPayNow;

