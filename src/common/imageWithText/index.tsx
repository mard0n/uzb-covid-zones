import React from 'react';
import { Box, Caption, makeStyles } from '@mashreq-digital/ui';
import getBeneficiariesAvatar from '../../util/getBeneficiariesAvatar';

type ImageWithTextProps = {
  name: string;
  onClick?: any;
  data?: any
}

const useStyles = makeStyles(() => ({
  captionStyle: {
    textTransform: "capitalize"
  }
}));

const ImageWithText = (props: ImageWithTextProps) => {
  const { name, data, onClick } = props;
  const { captionStyle } = useStyles();
  return (
    <Box display="flex" my={1.5} alignItems="center" onClick={() => onClick(data)}>
        {name && 
        <Box mr={2.5}>
        <img src={getBeneficiariesAvatar(name.toLowerCase())} alt={name} />
        </Box>
      }
        <Caption className={captionStyle}>{name}</Caption>
      </Box>
  )
}

export default ImageWithText;
