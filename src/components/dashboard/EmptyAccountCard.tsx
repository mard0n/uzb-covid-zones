import React from 'react';
import { IconText, Box, makeStyles, SvgIcon } from '@mashreq-digital/ui';
import { Plus } from '@mashreq-digital/webassets';
import getProductColor from '../../util/getProductColor';

type EmptyAccountCardprops = {
  icon: any,
  type: string;
  title: string,
  desc: string
}

const useStyles = makeStyles((theme)=>({
  root: (props: any) => ({
    border: `2px solid ${props && props.type ? getProductColor(props.type) : "#fff"}`,
    borderRadius: "6px",
    padding: `${theme.spacing(2.1)}px ${theme.spacing(2.8)}px`,
    position: "relative",
    cursor: "pointer"
  }),
  iconStyle: {
    marginRight: theme.spacing(4.7),
    height: "30px",
    width: "30px"
  },
  plusIconStyle: (props: any) => ({
    backgroundColor: props && props.type ? getProductColor(props.type) : "#fff",
    display: "flex",
    borderRadius: "50%",
    padding: theme.spacing(1.4),
    position: "absolute",
    top: "45%",
    left: "44px",
    border: "4px solid #fff",
    "& svg": {
      height: "16px",
      width: "16px"
    }
  })
}))

const EmptyAccountCard = (props: EmptyAccountCardprops) => {
  const { icon, title, type, desc } = props;
  const { root, iconStyle, plusIconStyle } = useStyles(props);  
  return (
    <Box className={root}>
      <IconText
        icon={icon}
        primaryText={title}
        secondaryText={desc}
        iconProps={{
          className: iconStyle,
          htmlColor: getProductColor(type)
        }}
      />
      <Box className={plusIconStyle}><SvgIcon htmlColor="#fff" component={Plus}/></Box>
    </Box>
  )
}

EmptyAccountCard.defaultProps = {
  type: "accounts"
}

export default EmptyAccountCard;
