import React, { ReactNode } from "react";
import {
  H4,
  Caption,
  Avatar,
  Card,
  Button,
  CardContent,
  makeStyles,
  createStyles,
} from "@mashreq-digital/ui";

// const du = require("../../assets/images/beneficiaries/Du.png");

const useStyles = makeStyles((theme: any) =>
  createStyles({
    card: {
      display: "flex",
      paddingLeft: "3px",
      width: "327px",
      borderRadius: "8px",
      alignItems: "center",
      justifyContent: "space-between"
    },
    button: {
      width: 118,
      height: 85
    }
  })
);

type CardPayNowProps = {
  heading?: ReactNode | string | undefined;
  subheading? : ReactNode | string | undefined;
  callback? : any;
  buttonLable? : string; 
  image? : string;
}

const CardPayNow = (props: CardPayNowProps) => {
  const { heading, subheading, callback, buttonLable, image } = props;

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      {image && <Avatar src={image} />}
      <CardContent>
        <H4> {heading} </H4>
        <Caption>{subheading}</Caption>
      </CardContent>
      {buttonLable && 
      <Button
        onClick={(e: any)=>callback(e)}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        {buttonLable}
      </Button>
      }
    </Card>
  );
};

export default CardPayNow;

