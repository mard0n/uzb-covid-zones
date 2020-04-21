import React from "react";
import { Box, Caption, makeStyles, SvgIcon, Avatar } from "@mashreq-digital/ui";
import getBeneficiariesAvatar from "../../util/getBeneficiariesAvatar";

type ImageWithTextProps = {
  name: string;
  className?: any;
  iconType?: any;
  onClick?: any;
  data?: any;
};

const useStyles = makeStyles((theme: any) => ({
  captionStyle: {
    textTransform: "capitalize",
  },
  avt: {
    minHeight: "64px",
    minWidth: "64px",
    color: theme.palette.getContrastText("rgba(255, 94, 0, 0.14)"),
    backgroundColor: "rgba(255, 94, 0, 0.14)",
  },
}));

const ImageWithText = (props: ImageWithTextProps) => {
  const { name, data, className, onClick, iconType } = props;
  const { captionStyle, avt } = useStyles();
  return (
    <Box
      display="inline-flex"
      className={className}
      my={1.5}
      alignItems="center"
      onClick={() => onClick(data)}
    >
      {iconType ? (
        <Box mr={2.5}>
          <Avatar className={avt}>
            <SvgIcon
              fontSize={"large"}
              color={"primary"}
              component={getBeneficiariesAvatar(
                data && data.code ? data.code.toLowerCase() : name.toLowerCase()
              )}
            />
          </Avatar>
        </Box>
      ) : (
        <Box mr={2.5}>
          <img
            src={getBeneficiariesAvatar(
              data && data.code ? data.code.toLowerCase() : name.toLowerCase()
            )}
            alt={name}
          />
        </Box>
      )}

      <Caption className={captionStyle}>{name}</Caption>
    </Box>
  );
};

export default ImageWithText;
