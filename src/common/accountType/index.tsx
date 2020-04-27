import React from 'react';
import { Box, makeStyles, Body2 } from '@mashreq-digital/ui';

const useStyles = makeStyles((theme: any)=>({
  root: (props: any) => ({
    "& > .MuiTypography-body2": {
      backgroundColor: props && props.color ? theme.palette[props.color]["light"] : '',
      borderRadius: "5px",
      fontSize: theme.typography.pxToRem(12),
      lineHeight: theme.typography.pxToRem(12),
      padding: theme.spacing(1),
      fontWeight: 600,
      color: props && props.color ? theme.palette[props.color]["main"] : '',
    }
  })
}));

type AccountTypeProps = {
  value?: string;
  color?: any;
}

const AccountType = (props: AccountTypeProps) => {
  const { value } = props;
  const { root } = useStyles(props);
  return (
    <Box className={root} component="span">
      <Body2>{value}</Body2>
    </Box>
  )
}

AccountType.defaultProps = {
  color: "primary"
}

export default AccountType;
