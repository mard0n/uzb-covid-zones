import React from 'react'
import { Box, SvgIcon, makeStyles, Theme, colors } from '@mashreq-digital/ui';
import { Check, Cross, WarningCircle , Warning} from '@mashreq-digital/webassets';

type SucessFailureIconProps = {
  success: boolean
  warning?: boolean
  warning2?: boolean

}

const useStyles = makeStyles((theme: Theme) => ({
  iconWrapperStyle: (props: any) => ({
    boxShadow: "-3px 8px 10px 0px rgba(255, 94, 0, 0.14)",
    backgroundColor: props && props.warning || props.warning2 && !props.success ? colors?.orange[500] : theme.palette[props && props.success ? 'success' : 'error']['main']
  }),
  svgIconStyle: {
    borderRadius: "50%",
    "& > svg": {
      height: "20px",
      width: "20px"
    }
  },
}));

const SucessFailureIcon = (props: SucessFailureIconProps) => {
  const { success, warning, warning2 } = props;
  const { iconWrapperStyle, svgIconStyle } = useStyles(props);

  return (
    <Box mb={4} className={iconWrapperStyle} display="inline-flex" borderRadius="50%" p={2}>
    <SvgIcon className={warning? svgIconStyle : ''} htmlColor="#fff" component={success ? Check : warning ? WarningCircle : warning2 ? Warning : Cross}/>
    </Box>
  )
}

export default SucessFailureIcon;
