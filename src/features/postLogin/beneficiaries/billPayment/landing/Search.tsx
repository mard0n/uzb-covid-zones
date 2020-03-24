import React from 'react'
import { TextField, IconButton } from '@mashreq-digital/ui';
import { Search } from '@mashreq-digital/webassets';
import { useTranslation } from 'react-i18next';

const SearchBeneficiary = () => {
  const {t} = useTranslation();
  return (
    <TextField
      fullWidth
      placeholder={t("beneficiary.landing.searchPlaceholder")}
      inputProps={{
        "aria-label": t("beneficiary.landing.searchPlaceholder")
      }}
      InputProps={{
        startAdornment: (
          <IconButton type="submit" aria-label="search">
            <Search />
          </IconButton>
        )
      }}
    />
  )
}

export default SearchBeneficiary;
