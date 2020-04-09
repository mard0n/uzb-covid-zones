import React from 'react';
import { makeStyles, Box } from "@mashreq-digital/ui";

const useStyles = makeStyles(() => ({
  root: (props: any) => ({
    fontSize: props && props.size ? props.size : "12px",
    background: "rgb(49, 49, 49)",
    borderRadius: "4px",
    height: "2.1em",
    width: "3.5em",
    position: "relative",
   "&::after, &::before" : {
     content: `" "`,
     position: "absolute",
     background: "#fff",
     borderRadius: "50%",
     bottom: "0.42em",
     right: "0.83em",
     height: "0.55em",
     width: "0.59em"
   },
   "&::before" : {
    background: "#ccc",
    right: "0.42em",
   }
  })
}));

type CardIconProps = {
  size?: number
}

const CardIcon = (props: CardIconProps) => {
  const { root } = useStyles(props);

  return (
    <Box className={root} />
  )
}

export default CardIcon;
