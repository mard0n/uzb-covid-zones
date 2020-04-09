import React, { useState, useEffect } from "react";
import Amount from "./";
import { Box, makeStyles } from "@mashreq-digital/ui";

type AmountListProps = {
  options: Array<number>;
  active: string | number;
  onClickCallback?: any;
};

const useStyles = makeStyles(() => ({
  wrapperStyle: {
   cursor: "pointer"
  }
}));

const AmountList = (props: AmountListProps) => {
  const { options = [], active, onClickCallback } = props;
  const { wrapperStyle } = useStyles();
  const [activeAmount, setActiveAmount] = useState(active);

  useEffect(() => {
    setActiveAmount(active);
  }, [active]);

  const onClickOption = (item: number) => {
    setActiveAmount(item);
    if (onClickCallback && typeof onClickCallback === "function") {
      onClickCallback(item);
    }
  };

  if (options && options.length > 0) {
    return (
      <Box display="flex" justifyContent="space-between">
        {options.map((item: any, i: number) => {
          let customProps: any = {};
          customProps["py"] = 2;
          if(options.length - 1 === i ){
            customProps["pl"] = 2;
          }else if(i>0) {
            customProps["px"] = 2;
          } else  {
            customProps["pr"] = 2;
          }
          return (
            <Box className={wrapperStyle} key={i+"item"} onClick={() => onClickOption(item)} {...customProps}>
              <Amount value={item} active={item === activeAmount} />
            </Box>
          );
        })}
      </Box>
    );
  }
  return null;
};

export default AmountList;
