import * as React from "react";

export interface CardImagesProps {
  cardType: any;
}

const CardImages: React.SFC<CardImagesProps> = () => {
  return (
    <>
      <div
        style={{
          background: "rgb(250, 168, 0)",
          borderRadius: "3.5px",
          boxShadow: "-21px 84px 70px 0px rgba(91, 91, 91, 0.08)",
          height: " 96px",
          width: "152.6px",
        }}
      ></div>
    </>
  );
};

export default CardImages;
