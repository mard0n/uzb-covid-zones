import React from "react";
import { Box, makeStyles, Theme } from "@mashreq-digital/ui";
import NoBeneficiaryFound from "../../../components/beneficiary/billPayment/NoBeneficiaryFound";
import { Search } from "@mashreq-digital/webassets";
import BeneficiaryCardList from "../../../components/beneficiary/billPayment/BeneficiaryListCard";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "absolute",
    width: "100%",
    top: "100%",
    boxShadow: "0px 2px 24px 0px rgba(0, 0, 0, 0.12)",
    background: "#fff",
    height: "300px",
    padding: theme?.spacing(3.33),
    zIndex: 1
  }
}));

type SearchSuggestionProps = {
  searchValue: string;
  list: Array<any>;
  onClickCard?: any;
}

const SearchSuggestion = (props: SearchSuggestionProps) => {
  const { root } = useStyles();
  const { searchValue, list, onClickCard } = props;
  const lowercasedFilter = searchValue.toLowerCase();
  const filteredData = list.filter(item => {
    return Object.keys(item).some(() =>
      item["name"].toLowerCase().includes(lowercasedFilter)
    );
  });

  if (searchValue) {
    if(filteredData && filteredData.length > 0) {
      return <Box className={root}>
        <BeneficiaryCardList boxShadow={true} data={filteredData} onClick={onClickCard} />
      </Box>;
    }
    return (
      <NoBeneficiaryFound
        className={root}
        icon={Search}
        title="billPayments.landing.search.notFound.title"
        desc="billPayments.landing.search.notFound.desc"
      />
    );
    
  }
 return <></>;
};

export default SearchSuggestion;
