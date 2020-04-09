import React from 'react'
import { TextField, IconButton, TextFieldProps } from '@mashreq-digital/ui';
import { Search } from '@mashreq-digital/webassets';

const InputSearch = (props: TextFieldProps) => {
  return (
    <TextField
      fullWidth
      placeholder={props.placeholder}
      inputProps={{
        "aria-label": props.placeholder
      }}
      InputProps={{
        startAdornment: (
          <IconButton type="submit" aria-label="search">
            <Search />
          </IconButton>
        )
      }}
      {...props}
    />
  )
}

export default InputSearch;
