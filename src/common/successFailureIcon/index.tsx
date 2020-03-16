import React from 'react'
import { Box, SvgIcon, makeStyles, Theme } from '@mashreq-digital/ui';
import { Check, Cross } from '@mashreq-digital/webassets';

type SucessFailureIconProps = {
  success: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  iconWrapperStyle: (props: any) => ({
    backgroundColor: theme.palette[props && props.success ? 'success' : 'error']['main']
  })
}));

const SucessFailureIcon = (props: SucessFailureIconProps) => {
  const { success } = props;
  const { iconWrapperStyle } = useStyles(props);

  return (
    <Box mb={4} className={iconWrapperStyle} display="inline-flex" borderRadius="50%" p={2}>
    <SvgIcon htmlColor="#fff" component={success ? Check : Cross}/>
    </Box>
  )
}

export default SucessFailureIcon;
