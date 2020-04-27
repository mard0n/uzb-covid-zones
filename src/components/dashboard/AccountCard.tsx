import React from "react";
import {
  Grid,
  Box,
  Body1,
  makeStyles,
  H3,
  Caption,
  Button,
} from "@mashreq-digital/ui";
import PayListItem from "../billpayment/review/payList";

type AccountCardProps = {
  color: string;
  title: string;
  balance?: string;
  data?: Array<any>;
  balanceAmount?: number;
  currentBalance?: string;
  currentBalanceAmount?: number;
  btnLabel?: string;
  onClickAllList?: any;
};

const useStyles = makeStyles((theme) => ({
  root: (props: any) => ({
    backgroundColor: props && props.color ? props.color : "#fff",
    borderRadius: "6px",
  }),
  aedStyle: (props: any) => ({
    fontSize: theme.typography.pxToRem(12),
    lineHeight: theme.typography.pxToRem(14),
    fontWeight: 600,
    borderRadius: "10px",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(
      0.5
    )}px`,
    backgroundColor: "#fff",
    color: props && props.color ? props.color : "#000",
  }),
  leftContent: {
    "& .MuiTypography-root": {
      color: "#fff",
    },
  },
  currentBalanceStyle: {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: theme.typography.pxToRem(14),
    color: "#fff",
  },
  buttonStyle: {
    color: "#fff",
  },
}));

const AccountCard = (props: AccountCardProps) => {
  const {
    title,
    balance,
    balanceAmount,
    currentBalance,
    currentBalanceAmount,
    btnLabel,
    data,
    onClickAllList,
  } = props;
  const {
    root,
    buttonStyle,
    leftContent,
    aedStyle,
    currentBalanceStyle,
  } = useStyles(props);
  return (
    <Box p={4} className={root}>
      <Grid container>
        <Grid item xs={5} sm={5} md={5}>
          <Box mr={4} className={leftContent}>
            <Box mb={1} display="flex" justifyContent="space-between">
              <Body1> {title}</Body1>
              <Box className={aedStyle}>AED</Box>
            </Box>
            {balanceAmount && 
              <>
                <H3>{balanceAmount}</H3>
                {balance && <Caption>{balance}</Caption>}
              </>
            }
            <Box mt={2.6}>
              {currentBalanceAmount && (
                <>
                <Body1 fontWeight={600} display="inline">
                  {currentBalanceAmount}
                </Body1>
              
              {currentBalance && (
                <Box ml={1} className={currentBalanceStyle} component="span">
                  {currentBalance}
                </Box>
              )}
              </>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={7} sm={7} md={7}>
          {data && data.length > 0 && data.map((item: any, i: number)=>{
            return <PayListItem isDefault key={i} data={item} />
          })}
          {/* <PayListItem data={{}} />
          <PayListItem data={{}} /> */}
        </Grid>
      </Grid>
      {btnLabel && (
        <Box mt={1.6} display="flex" justifyContent="center">
          <Button
            className={buttonStyle}
            onClick={onClickAllList}
            variant="text"
          >
            {btnLabel}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AccountCard;
