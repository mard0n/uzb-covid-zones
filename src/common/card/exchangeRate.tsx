import React from "react";
import {Card, CardContent, SvgIcon, makeStyles , H5} from "@mashreq-digital/ui";


const useStyles = makeStyles((theme:any) => ({
  card: ({fullWidth}: any) => ({
    width: fullWidth ? "100%" : "300px",
    minHeight: "284px",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(0.67),
    boxShadow: ` 4px 14px 17px 0px rgba(0, 0, 0, 0.03),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12)`,
  }),
  iconStyle: {
    display: "flex",
    justifyContent: "left",
    marginBottom: theme.spacing(2.5)
  },
  root: {
      padding: 0,
      marginTop: theme.spacing(2.9),
      fontSize: theme.spacing(2.5),
  }
}));


const ExchangeRate = (props: any) => {
  const { title, icon, content, color, fullWidth, ...rest } = props;
  const classes = useStyles({fullWidth});
  const { root, card, iconStyle} = classes;

  return (
    <Card className={card}>
              {icon && (
        <div className={iconStyle}>
          <SvgIcon {...rest} color={color} component={icon} />
        </div>
      )}
      {title && (
        <CardContent className={root}><H5>{title}</H5></CardContent>
      )}
      {content && (
        <CardContent className={root}>{content}</CardContent>
      )}
    </Card>
  );
};


export default ExchangeRate;