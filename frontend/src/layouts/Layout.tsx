import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import SwipeableBottomSheet from "react-swipeable-bottom-sheet";
import { Embed } from "../components/Embed";
import { Map } from "../components/Map";
import "./Layout.css";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [zones, showOnlySelectedZones]: any = useLoaderData();

  const handleSwipeableChange = (isOpen: boolean) =>
    setIsBottomSheetOpen(isOpen);

  return (
    <>
      <div className="hidden md:flex h-screen w-screen ">
        <div className="w-[min(45vw,600px)] z-10 h-full shadow-[0px_4px_40px_rgba(0,30,89,0.09)]">
          <Outlet />
        </div>
        <div className="grow h-full relative">
          <Map zones={zones} showOnlySelectedZones={showOnlySelectedZones} />
        </div>
      </div>
      <div className="block md:hidden h-screen w-screen">
        <div className="h-full w-full">
          <Map zones={zones} showOnlySelectedZones={showOnlySelectedZones} />
        </div>
        <div className="absolute z-10 bottom-[210px] right-[10px]">
          {<Embed />}
        </div>
        <SwipeableBottomSheet
          overflowHeight={200}
          shadowTip={false}
          topShadow={false}
          overlay={false}
          scrollTopAtClose={true}
          open={isBottomSheetOpen}
          onChange={handleSwipeableChange}
          style={{ zIndex: 20 }}
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
            <Outlet />
          </div>
        </SwipeableBottomSheet>
      </div>
    </>
  );
};

export default Layout;
