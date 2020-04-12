import React from "react";
import { Box, makeStyles, Theme } from "@mashreq-digital/ui";
import ImageWithText from "../../../common/imageWithText";

type BeneficiaryCardListProps = {
  data: Array<any>;
  boxShadow? : boolean;
  onClick?: any;
};

const useStyles = makeStyles((theme: Theme) => ({
  // firstIconText: {
  //   "& .MuiListItem-root": {
  //     paddingLeft: 0
  //   }
  // },
  boxShadowStyle: {
    boxShadow: "0px 8px 12px 0px rgba(0, 0, 0, 0.06)",
  },
  imageTextStyle: {
    minWidth: "192px",
    alignItems: "center",
    cursor: "pointer",
    padding: `${theme.spacing(1.7)}px ${theme.spacing(4.2)}px`,
    borderRadius: "6px",
    marginRight: `${theme.spacing(3.4)}px`,
    "&>div" : {
      display: "flex"
    }
  }
}));

const BeneficiaryCardList = (props: BeneficiaryCardListProps) => {
  const { boxShadowStyle, imageTextStyle } = useStyles(props);
  const { data, boxShadow, onClick } = props;
  return (
    <Box display="flex" flexWrap="wrap">
      {data &&
        data.length > 0 &&
        data.map((dItem: any, j: number) => {
          const { name } = dItem;
          if (name) {
            return (
              // <Grid
              //   key={i + "" + j}
              //   item
              //   xs={12}
              //   sm={12}
              //   md={4}
              //   className={firstIconText}
              // >
              <ImageWithText
                key={j + "beneficiaryImageList"}
                className={`${imageTextStyle} ${
                  boxShadow ? boxShadowStyle : ""
                }`}
                name={name}
                data={dItem}
                onClick={() => onClick(name, dItem)}
              />

              // </Grid>
            );
          }
          return null;
        })}
    </Box>
  );
};

export default BeneficiaryCardList;
