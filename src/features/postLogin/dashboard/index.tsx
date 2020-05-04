import React, { useEffect } from 'react'
import { Grid, makeStyles, Box, InfoCard, H4, Button } from '@mashreq-digital/ui';
import { useTranslation } from 'react-i18next';
import WelcomeUser from './WelcomeUser';
import ImageWithText from '../../../common/imageWithText';
import { useHistory } from 'react-router-dom';
import * as RoutePath from '../../../router/config';
import CardBanner from './CardBanner';
import CardAccountList from './CardAccountList';
import { useDispatch } from 'react-redux';
import * as ActionsProductSummary from "../../../redux/actions/dashboard/productSummary";
import * as ActionsLandingBeneficiary from "../../../redux/actions/beneficiary/billPayment/landingActions";
import SendMoneyList from './SendMoneyList';

const useStyles = makeStyles((theme)=>({
  imageTextStyle: {
    flexDirection: "column",
    cursor: "pointer",
    "& > div": {
      marginRight: 0
    },
    "& img": {
      height: "49px",
      maxWidth: "100%"
    }
  },
  leftGridStyle: {
    paddingRight: theme.spacing(4)
  }
}));

const payBills = [
  {
    name: 'Etisalat',
    data: { code: 'etisalat' }
  },
  {
    name: 'Du',
    data: { code: 'du' }
  },
  {
    name: 'Salik',
    data: { code: 'Salik' }
  },
  {
    name: 'Dewa',
    data: { code: 'DEWA' }
  }
];

const Dashboard = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { imageTextStyle, leftGridStyle } = useStyles();

  useEffect(() => {
    dispatch(ActionsProductSummary.requestAccLoanDep());
    dispatch(ActionsProductSummary.requestCards());
    dispatch(ActionsProductSummary.requestReward());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const onClickServiceType = (item: any) => {
    dispatch(ActionsLandingBeneficiary.createNewBillPaymentBeneficiariesRequest(item.data.code));
    history.push(RoutePath.BILL_PAYMENTS);
  }

  return (
    <>
      <WelcomeUser />
      <Box mt={5.8}>
        <Grid container>
          <Grid item xs={8} sm={8} md={8} className={leftGridStyle}>
            <CardBanner />
            <Box mt={5.8}>
              <CardAccountList />
            </Box>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
          {/* @ts-ignore */}
          <InfoCard
            minHeight={false}
            fullWidth
            content={
              <>
              <H4>{t("dashboard.payYourBill.title")}</H4>
              <Box my={5.34} display="flex" justifyContent="space-between">
                {payBills.map((item: any, i: number) => {
                  const { name, data } = item;
                  return <ImageWithText className={imageTextStyle} key={i+"beneficiaryImageList"} name={name} data={data} onClick={() => onClickServiceType(item)}/>
                })}
              </Box>
              <Button fullWidth variant="text" color="primary" onClick={()=>{history.push(RoutePath.BILL_PAYMENTS)}}>{t("dashboard.payYourBill.buttonLinkLabel")}</Button>
              </>
            }
          />
          <Box mt={6.6}>
            <SendMoneyList />
          </Box>

          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Dashboard;
