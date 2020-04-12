import React from 'react'
import { TextField, IconButton, TextFieldProps } from '@mashreq-digital/ui';
import { Search, CrossCircle } from '@mashreq-digital/webassets';

type InputSearchProps = TextFieldProps & {
  onClickClear?: any,
}

const InputSearch = (props: InputSearchProps) => {
  const {onClickClear, ...rest} = props;
  let adornment: any = {
    startAdornment: (
      <IconButton type="submit" aria-label="search">
        <Search />
      </IconButton>
    )
  };

  if(rest.value) {
    adornment["endAdornment"] = (
      <IconButton onClick={onClickClear}>
        <CrossCircle />
      </IconButton>
    )
  }
  return (
    <TextField
      fullWidth
      placeholder={rest.placeholder}
      inputProps={{
        "aria-label": rest.placeholder
      }}
      InputProps={adornment}
      {...rest}
    />
  )
}

export default InputSearch;
