import React from 'react'
import { useTranslation } from 'react-i18next';
import { Box, H3, Caption, SvgIcon, makeStyles, Theme, blueGrey } from '@mashreq-digital/ui';

const useStyles = makeStyles((theme: Theme) => ({
  svgIconStyle: {
    height: "100px",
    width: "100px",
    marginBottom: theme?.spacing(5)
  }
}));

type NoBeneficiaryFoundProps = {
  icon?: any;
  title: string;
  desc?: string;
}

function NoBeneficiaryFound(props: NoBeneficiaryFoundProps) {
  const { icon, title, desc} = props;
  const { svgIconStyle } = useStyles();
  const {t} = useTranslation();
  return (
    <Box display="flex" height="calc(100vh - 250px)" flexDirection="column" justifyContent="center" alignItems="center">
      {icon && <SvgIcon className={svgIconStyle} htmlColor={blueGrey[500]} component={icon} /> }
      <H3 gutterBottom>
        {t(`${title}`)}
      </H3>
      {desc && <Caption>
        {t(`${desc}`)}
      </Caption>}
    </Box>
  )
}

export default NoBeneficiaryFound;
