import React, { useState } from "react";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import "./Layout.css";

interface LayoutProps {
  map: React.ReactNode;
  body: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ map, body }) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleSwipeableChange = (isOpen: boolean) =>
    setIsBottomSheetOpen(isOpen);

  return (
    <>
      <div className="hidden md:flex h-screen w-screen ">
        <div className="w-[min(45vw,600px)] z-10 h-full shadow-[0px_4px_40px_rgba(0,30,89,0.09)]">
          {body}
        </div>
        <div className="grow h-full relative">{map}</div>
      </div>
      <div className="block md:hidden h-screen w-screen">
        <div className="h-full w-full">{map}</div>
        <SwipeableBottomSheet
          overflowHeight={200}
          shadowTip={false}
          topShadow={false}
          overlay={false}
          scrollTopAtClose={true}
          open={isBottomSheetOpen}
          onChange={handleSwipeableChange}
          style={{ zIndex: 3 }}
          bodyStyle={{
            borderTopLeftRadius: "1.5rem",
            borderTopRightRadius: "1.5rem",
            boxShadow: "0px -10px 40px rgba(0, 30, 89, 0.09)",
            padding: "32px 20px",
            backgroundColor: "white",
          }}
        >
          <div className="max-h-[calc(100vh*0.65)] min-h-[136px]">
            <div className="bottom-sheet-notch" />
            {body}
          </div>
        </SwipeableBottomSheet>
      </div>
    </>
  );
};

export default Layout;
