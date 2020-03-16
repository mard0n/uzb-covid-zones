import React, { useState, useEffect } from 'react'
import { Box, Caption, makeStyles } from '@mashreq-digital/ui';

const useStyles = makeStyles(() => ({
  root:{
   height: "48px",
   width: "150px",
   borderRadius: "2px",
   cursor: "pointer"
  },
  colorStyle : {
    color: '#fff'
   }
}));

type FilledCheckBoxProps = {
  options : Array<string>;
  onClickCallback? : any;
  init: string;
}
const FilledCheckBox = (props: FilledCheckBoxProps) => {
  const { options, init, onClickCallback } = props;
  const [ active, setActive ] = useState('');
  const { root, colorStyle } = useStyles(props);

  useEffect(() => {
    setActive(init);
  }, [init])

  const onClickOption = (data: string) => {
    setActive(data)
    if(onClickCallback && typeof onClickCallback === "function") {
      onClickCallback(data);
    }
  }

  return (
    <Box border='1px solid rgb(222, 223, 234)' display="inline-flex" borderRadius="2px">
      {options && options.length > 0 && options.map((item, i)=>{
        let isActive = active === item;
        return(
        <Box key={i+"Filledcheckbox"} style={{backgroundColor: isActive ? '#000' : '#fff'}} onClick={()=>onClickOption(item)} className={root} display="flex" justifyContent="center" alignItems="center">
          <Caption className={isActive ? colorStyle : ''}>{item}</Caption>
        </Box>
        )
      })
      }
    </Box>
  )
}

export default FilledCheckBox;
