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
import getProductColor from "../../util/getProductColor";

type AccountCardProps = {
  type: string;
  title: string;
  balance?: string;
  currency?: string;
  data?: Array<any>;
  balanceAmount?: string | undefined;
  currentBalance?: string;
  currentBalanceAmount?: string | undefined;
  btnLabel?: string;
  onClickAllList?: any;
};

const useStyles = makeStyles((theme) => ({
  root: (props: any) => ({
    backgroundColor: props && props.type ? getProductColor(props.type) : "#fff",
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
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    // color: props && props.type ? getProductColor(props.type) : "#000",
    color: "#fff",
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
    type,
    title,
    currency,
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
              <Body1 noWrap> {title}</Body1>
              <Box className={aedStyle}>{currency ? currency : "AED"}</Box>
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
              
                <Box ml={1} className={currentBalanceStyle} component="span">
                  {currentBalance}
                </Box>
              </>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={7} sm={7} md={7}>
          {type === "mm" ? <PayListItem isDefault data={{balance: "12 Apr 2020", type: type}} />: 
          <>{data && data.length > 0 && data.map((item: any, i: number)=>{
            return <PayListItem isDefault key={i} data={item} />
          })}</>
          }
          {/* <PayListItem data={{}} />
          <PayListItem data={{}} /> */}
        </Grid>
      </Grid>
      {btnLabel && (
        <Box display="flex" justifyContent="center">
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
