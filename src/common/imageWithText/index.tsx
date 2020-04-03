import React from 'react';
import { Box, Caption, makeStyles } from '@mashreq-digital/ui';
import getBeneficiariesAvatar from '../../util/getBeneficiariesAvatar';

type ImageWithTextProps = {
  name: string;
  className?: any;
  onClick?: any;
  data?: any;
}

const useStyles = makeStyles(() => ({
  captionStyle: {
    textTransform: "capitalize"
  }
}));

const ImageWithText = (props: ImageWithTextProps) => {
  const { name, data, className, onClick } = props;
  const { captionStyle } = useStyles();
  return (
    <Box display="inline-flex" className={className} my={1.5} alignItems="center" onClick={() => onClick(data)}>
        {name && 
        <Box mr={2.5}>
        <img src={getBeneficiariesAvatar(data && data.code ? data.code.toLowerCase() : name.toLowerCase())} alt={name} />
        </Box>
      }
        <Caption className={captionStyle}>{name}</Caption>
      </Box>
  )
}

export default ImageWithText;
