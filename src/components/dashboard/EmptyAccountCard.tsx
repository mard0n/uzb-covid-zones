import React from 'react';
import { IconText, Box, makeStyles, SvgIcon } from '@mashreq-digital/ui';
import { Plus } from '@mashreq-digital/webassets';

type EmptyAccountCardprops = {
  icon: any,
  color: string,
  title: string,
  desc: string
}

const useStyles = makeStyles((theme)=>({
  root: (props: any) => ({
    border: `2px dashed ${props && props.color ? props.color : "#fff"}`,
    borderRadius: "6px",
    padding: `${theme.spacing(6.1)}px ${theme.spacing(5.8)}px`,
    position: "relative",
    cursor: "pointer"
  }),
  iconStyle: {
    marginRight: theme.spacing(4.7),
    height: "30px",
    width: "30px"
  },
  plusIconStyle: (props: any) => ({
    backgroundColor: props && props.color ? props.color : "#fff",
    display: "flex",
    borderRadius: "50%",
    padding: theme.spacing(1.4),
    position: "absolute",
    top: "50%",
    left: "60px",
    border: "4px solid #fff",
    "& svg": {
      height: "16px",
      width: "16px"
    }
  })
}))

const EmptyAccountCard = (props: EmptyAccountCardprops) => {
  const { icon, title, color, desc } = props;
  const { root, iconStyle, plusIconStyle } = useStyles(props);  
  return (
    <Box className={root}>
      <IconText
        icon={icon}
        primaryText={title}
        secondaryText={desc}
        iconProps={{
          className: iconStyle,
          htmlColor: color
        }}
      />
      <Box className={plusIconStyle}><SvgIcon htmlColor="#fff" component={Plus}/></Box>
    </Box>
  )
}

export default EmptyAccountCard;
