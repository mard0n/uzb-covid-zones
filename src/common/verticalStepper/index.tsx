import React, { useEffect, useState } from 'react'
import { Box, Caption, makeStyles, Theme, colors} from '@mashreq-digital/ui';

type VerticalStepperProps = {
  options : Array<string>;
  onClickCallback? : any;
  init: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  listStyle: {
    position: "relative",
    padding: `0px ${theme?.spacing(5)}px`,
    margin: `${theme?.spacing(3)}px 0px`,
    "& .MuiTypography-caption" : {
      color: colors?.grey[500]
    },  
    "&::after": {
      content: `''`,
      position: 'absolute',
      width: '15px',
      height: '15px',
      borderRadius: '50%',
      left: 9,
      top: "50%",
      backgroundColor: colors?.grey[500],
      transform:"translate(0, -50%)"
    },
    "&:not(:first-child)::before": {
      width: "1px",
      height: "100%",
      content: `''`,
      position: "absolute",
      transform: "translate(0, -50%)",
      backgroundColor: colors?.grey[500],
      bottom: "100%",
      left: "16px"
    }
  },
  
  activeStyle : {
    fontFamily: "Gilroy",
    fontWeight: "bold",
    "& .MuiTypography-caption" : {
      color: "#313131"
    },  
    "&::after": {
      left: 4,
      width: '24px',
      height: '24px',
      backgroundColor: "#313131",
    }
   }
}));

const VerticalStepper = (props: VerticalStepperProps) => {
  const { options, init, onClickCallback } = props;
  const [ active, setActive ] = useState('');
  const { listStyle, activeStyle } = useStyles(props);

  useEffect(() => {
    setActive(init);
  }, [init])

  const onClickOption = (data: string) => {
    if(onClickCallback && typeof onClickCallback === "function") {
      setActive(data);
      onClickCallback(data);
    }
  }

  return (
    <Box border='1px solid rgb(222, 223, 234)' ml={1} mt={3} display="flex" flexDirection="column" borderRadius="2px">
      {options && options.length > 0 && options.map((item, i)=>{
        let isActive = active === item;
        return(
        <Box className={`${listStyle} ${isActive ? activeStyle : ''}`} key={i+"verticalStepper"} onClick={()=>onClickOption(item)}>
          <Box display="flex" ml={3}><Caption>{item}</Caption></Box>
        </Box>
        )
      })
      }
    </Box>
  )
}

export default VerticalStepper;
