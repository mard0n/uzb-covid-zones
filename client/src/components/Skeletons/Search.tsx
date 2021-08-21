import * as React from "react";
import { Skeleton } from "@material-ui/lab";

export interface SearchProps {
  mdUp: boolean;
}

const Search: React.SFC<SearchProps> = (props) => {
  const style = {
    borderRadius: "24px",
    backgroundColor: props.mdUp ? "#ebebebc7" : "white",
    boxShadow: props.mdUp ? 'unset' : '0px -10px 40px rgba(0, 30, 89, 0.09)',
  }
  return (
    <Skeleton
      animation="wave"
      variant="rect"
      width="100%"
      height="48px"
      style={style}
    />
  );
};

export default Search;
