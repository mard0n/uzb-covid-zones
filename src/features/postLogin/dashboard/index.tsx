import React from 'react'
import { Grid, Body2, colors, makeStyles, H2 } from '@mashreq-digital/ui';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(()=>({
  welcomeNoteStyle: {
    color: colors.grey[600]
  }
}))
const Dashboard = () => {
  const { welcomeNoteStyle } = useStyles();
  const {t} = useTranslation();

  return (
    <Grid container>
      <Grid item xs={8} sm={8} md={8}>
        <Body2 gutterBottom className={welcomeNoteStyle}>{t('dashboard.welcomeNote')}</Body2>
        <H2 noWrap>M Masood Hussain</H2>
      </Grid>
      <Grid item xs={4} sm={4} md={4}>

      </Grid>
    </Grid>
  )
}

export default Dashboard;
