import React, { useEffect, useState } from "react";
import { UnderlineText, H2, Box, H4, makeStyles } from "@mashreq-digital/ui";
import { useDispatch, useSelector } from "react-redux";
import BeneficiaryList from "../../../components/beneficiary/billPayment/BeneficiaryList";
import * as Actions from "../../../redux/actions/beneficiary/billPayment/addBillPaymentActions";
import { useTranslation } from "react-i18next";
import NoBeneficiaryFound from "../../../components/beneficiary/billPayment/NoBeneficiaryFound";
import InputSearch from "../../../common/inputSearch";
import SearchSuggestion from "./SearchSuggestion";

const useStyles = makeStyles(() => ({
  disableList: {
   opacity: 0.5,
   "& .MuiBox-root > [class*='makeStyles-imageTextStyle-']" : {
     cursor: "no-drop"
   }
  
  }
}));

export default function BillPaymentLanding(props: any) {
  const { onClickService } = props;
  const { disableList } = useStyles();
  const [ searchInputValue, setSearchInputValue ] = useState('');
  const [ searchList, setSearchList ] = useState([]);
  const { t } = useTranslation();

  const serviceTypes = useSelector(
    (state: any) => state?.beneficiary?.billPayment?.serviceTypes
  );
  const dispatch = useDispatch();

  const onChangeSearch = (e: any) => {
    let targetValue = e.target.value;
    setSearchInputValue(targetValue);
  }

  const onClearSearch = () => {
    setSearchInputValue('');
  }

  useEffect(()=>{
    let updateSearchList: any = [];
    if(serviceTypes && serviceTypes.length > 0) {
      serviceTypes.map((serviceList:any)=>{
        const { data } = serviceList;
        if(data && data.length > 0) {
          updateSearchList.push(...data)
        }
      })
    }
    setSearchList(updateSearchList);
  },[serviceTypes])

  useEffect(() => {
    dispatch(Actions.fetchBeneficiaryServiceType());
  }, [dispatch]);

  if (serviceTypes && serviceTypes.length > 0) {
    return (
      <>
        <Box mb={10}>
        <UnderlineText>
          <H2 noWrap>{t("billPayments.landing.title")}</H2>
        </UnderlineText>
        </Box>
        <Box mb={10}>
          <Box mb={4}><H4>{t("billPayments.landing.searchTitle")}</H4></Box>
          <Box position="relative">
            <InputSearch value={searchInputValue} onClickClear={onClearSearch} onChange={onChangeSearch} placeholder={t("billPayments.landing.searchPlaceholder")}/>
            <SearchSuggestion list={searchList} searchValue={searchInputValue} onClickCard={(name: string) => {setSearchInputValue('');onClickService(name)}} />
          </Box>
        </Box>
        <Box className={searchInputValue ? disableList : ''}>
          <BeneficiaryList
            boxShadow
            onClickServiceTypeCallback={(name: any) => {if(!searchInputValue){onClickService(name)}}}
            list={serviceTypes}
          />
        </Box>
      </>
    );
  } else {
    return <NoBeneficiaryFound
    title="error.title"
    desc="error.somethingWrong"
  />
  }
}
