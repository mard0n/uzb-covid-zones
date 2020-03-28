import React, { useState, useEffect } from 'react';
import { Box, TextField, colors, Caption, makeStyles, Theme, TextFieldProps } from "@mashreq-digital/ui";
import { RegEx } from "../../util/RegEx";
import AmountList from './AmountList';

const useStyles = makeStyles((theme: Theme) => ({
  inputStyle: {
    "& .MuiFilledInput-input" : {
      paddingTop: theme.spacing(5)
    },
    "& .MuiInputLabel-root": {
      top: "2px"
    }
  },
  adornmentStule:{
    color: colors.blueGrey[500]
  }
 
}));

type AmountWithInputProps = {
 amountOptions: Array<number>,
 activeAmount?: number,
 onChangeField?: any,
 input: TextFieldProps 
};


const AmountWithInput = (props: AmountWithInputProps) => {
  const {amountOptions, activeAmount, onChangeField, input} = props;
  const { adornmentStule, inputStyle } = useStyles();
  const [amount, setAmount] = useState('');
  const [defaultAmount, setDefaultAmount] = useState<any>('');

  useEffect(()=>{
    setDefaultAmount(activeAmount);
  },[activeAmount]);

  const onClickCallback = (data: any) => {
    setDefaultAmount(data);
    setAmount(data);
  }

  const onChange = (e: any) => {
    const isValidValue = new RegExp(RegEx.NUMERIC_ONLY),
    targetValue = e.target.value;
    onChange(e.target.value);
    /* onchange empty default amount */
    if(targetValue) {
      setDefaultAmount('');
    }

    if(!targetValue || isValidValue.test(targetValue)) {
      setAmount(targetValue);
    }
    if(onChangeField && typeof onChangeField === "function") {
      onChangeField(targetValue);
    }
  }
  return (
   <Box>
      <TextField
            className={inputStyle}
              value={amount}
              onChange={(e: any) => onChange(e)}
              InputProps={{
                startAdornment: <Box mt={3} mr={1}><Caption className={adornmentStule}>AED</Caption></Box>,
              }}
              
              {...input}
            />
            {/* [50, 70, 100, 125] */}
            <AmountList options={amountOptions} active={defaultAmount} onClickCallback={(data: number)=>onClickCallback(data)} />
   </Box>
  )
}

export default AmountWithInput;
