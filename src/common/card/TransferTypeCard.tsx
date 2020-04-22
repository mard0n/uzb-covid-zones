import React from "react";
import {
  Card,
  CardContent,
  SvgIcon,
  H5,
  Avatar,
  makeStyles,
} from "@mashreq-digital/ui";

const useStyles = makeStyles((theme) => ({
  card: ({ fullWidth }: any) => ({
    width: fullWidth ? "100%" : "192px",
    height: "172px",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(0.67),
    boxShadow: `0px 8px 12px 0px rgba(0, 0, 0, 0.06)`,
  }),
  iconStyle: {
    display: "flex",
    justifyContent: "left",
    marginBottom: theme.spacing(3.5),
  },
  avt: {
    minHeight: "64px",
    minWidth: "64px",
    color: theme.palette.getContrastText("rgba(255, 94, 0, 0.14)"),
    backgroundColor: "rgba(255, 94, 0, 0.14)",
  },
  root: {
    padding: 0,
    fontSize: theme.spacing(2.5),
  },
}));

const TransferTypeCard = (props: any) => {
  const { title, callbak, logo, Icon, color, fullWidth, ...rest } = props;
  const classes = useStyles({ fullWidth });
  const { root, card, iconStyle, avt } = classes;

  return (
    <Card
      className={card}
      onClick={(e: any) => {
        if (callbak && typeof callbak === "function") {
            callbak(e);
        }
      }}
    >
   
      {title && (
        <CardContent className={root}>

        {Icon && (
            <div className={iconStyle}>
              {logo ? (
                <Avatar className={avt}>
                  <Icon width="50px" height="46px" />
                </Avatar>
              ) : (
                <Avatar className={avt}>
                  <SvgIcon
                    fontSize={"large"}
                    {...rest}
                    color={"primary"}
                    component={Icon}
                  />
                </Avatar>
              )}
            </div>
          )}

          <H5>{title}</H5>
        </CardContent>
      )}
    </Card>
  );
};

TransferTypeCard.defaultProps = {
  title: "This Is Title Props",
  color: "primary",
  fullWidth: false,
};

export default TransferTypeCard;
