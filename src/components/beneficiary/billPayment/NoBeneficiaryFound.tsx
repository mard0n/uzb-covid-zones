import React from 'react'
import { useTranslation } from 'react-i18next';
import { Box, H3, Caption, SvgIcon, makeStyles, Theme, colors } from '@mashreq-digital/ui';

const useStyles = makeStyles((theme: Theme) => ({
  root: (props: any) => ({
    width: props && props.fullWidth ? "100%" : "auto",
    padding: theme.spacing(3)
  }),
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
  fullWidth?: boolean;
  className?: any;
}

function NoBeneficiaryFound(props: NoBeneficiaryFoundProps) {
  const { className, icon, title, desc} = props;
  const { root, svgIconStyle } = useStyles(props);
  const {t} = useTranslation();

  return (
    <Box className={`${root} ${className}`} display="flex" height="40vh" flexDirection="column" justifyContent="center" alignItems="center">
      {icon && <SvgIcon className={svgIconStyle} htmlColor={colors.blueGrey[500]} component={icon} /> }
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
