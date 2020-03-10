import React from "react";
import {
  H4,
  Caption,
  Avatar,
  Card,
  Button,
  Box,
  CardContent,
  makeStyles,
  createStyles,
  CardMedia
} from "@mashreq-digital/ui";

const du = require("../../assets/images/beneficiaries/Du.png");

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

const CardPayNow = (props: any) => {
  const { heading, subheading, callback, image } = props;

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Avatar src={image} />
      <CardContent>
        <H4> {heading} </H4>
        <Caption>{subheading}</Caption>
      </CardContent>
      <Button
        onClick={callback}
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Pay Now
      </Button>
    </Card>
  );
};

export default CardPayNow;

// <Box component={Button} bgcolor="#ff5e00" className={classes.button}>
// Pay Now
// </Box>
