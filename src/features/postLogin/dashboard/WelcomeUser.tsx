import React from 'react'
import { Grid, Body2, colors, makeStyles, H2, Box, SvgIcon } from '@mashreq-digital/ui';
import { useTranslation } from 'react-i18next';
import CardPayNow from '../../../common/card/CardPayNow';
import { Exclamation, getFlag } from '@mashreq-digital/webassets';
import AccountType from '../../../common/accountType';

const useStyles = makeStyles((theme)=>({
  welcomeNoteStyle: {
    color: colors.grey[600]
  },
  exclamationStyle: {
    background: theme.palette.error.main,
    borderRadius: "50%",
    padding: `${theme.spacing(1.3)}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const WelcomeUser = () => {
  const { welcomeNoteStyle, exclamationStyle } = useStyles();
  const {t} = useTranslation();

  return (
    <Grid container>
      <Grid item xs={9} sm={9} md={9}>
        <Body2 gutterBottom className={welcomeNoteStyle}>{t('dashboard.welcomeNote')}</Body2>
        <Box display="flex" alignItems="center">
          <H2 noWrap>M Masood Hussain</H2>
          <Box ml={4} mr={1.3}><AccountType value="Individual" /></Box>
          <H2 noWrap>
          <SvgIcon
          height="14"
          width="16"
          htmlColor={colors.teal[800]}
          component={getFlag("AE")}
        />
          </H2>
        </Box>
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <CardPayNow
          fullWidth
          icon={<Box component="span" className={exclamationStyle}><SvgIcon htmlColor="#fff" component={Exclamation} /></Box>}
          style={{ justifyContent: "space-evenly" }}
          arrow={true}
          heading="KYC due to expire"
          subheading="Please, renew in 3 days"
        />
      </Grid>
    </Grid>
  )
}

export default WelcomeUser;
