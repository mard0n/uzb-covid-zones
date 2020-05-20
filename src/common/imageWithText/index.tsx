import React from "react";
import { Box, Caption, makeStyles, SvgIcon, Avatar } from "@mashreq-digital/ui";
import getBeneficiariesAvatar from "../../util/getBeneficiariesAvatar";

type ImageWithTextProps = {
  name: string;
  className?: any;
  iconType?: any;
  logo?: any;
  avtHight?:any;
  avtWidth?:any;
  onClick?: any;
  description?: any;
  data?: any;
};

const useStyles = makeStyles((theme: any) => ({
  captionStyle: {
    textTransform: "capitalize",
  },
  avt: (props: any) =>( {
    minHeight:props.avtHight,
    minWidth: props.avtWidth,
    color: theme.palette.getContrastText("rgba(255, 94, 0, 0.14)"),
    backgroundColor: "rgba(255, 94, 0, 0.14)",
  }),
}));

const ImageWithText = (props: ImageWithTextProps) => {
  const { name, data, className, onClick, description, iconType, logo , avtHight="64px", avtWidth="64px"} = props;
  const { captionStyle, avt } = useStyles({avtHight,avtWidth});
  let NotIcon = getBeneficiariesAvatar(
    data && data.code ? data.code.toLowerCase() : name.toLowerCase()
  );

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
          {logo ? (
            <Avatar className={avt}>
              <NotIcon width="50" height="50" />
            </Avatar>
          ) : (
            <img
              src={getBeneficiariesAvatar(
                data && data.code ? data.code.toLowerCase() : name.toLowerCase()
              )}
              alt={name}
            />
          )}
        </Box>
      )}

      <Caption className={captionStyle}>
        {description ? description : name}
      </Caption>
    </Box>
  );
};

export default ImageWithText;
