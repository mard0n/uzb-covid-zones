import React, { useRef } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import "./Layout.css";

interface LayoutProps {
  map: React.ReactNode;
  body: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ map, body }) => {
  const sheetRef = useRef<BottomSheetRef>(null);

  return (
    <>
      <div className="hidden md:flex h-screen w-screen ">
        <div className="w-[600px] h-full shadow-[0px_4px_40px_rgba(0,30,89,0.09)]">
          {body}
        </div>
        <div className="grow h-full relative">{map}</div>
      </div>
      <div className="block md:hidden h-screen w-screen">
        <div className="h-full w-full">{map}</div>
        <div className="px-8">
          <BottomSheet
            open
            skipInitialTransition
            ref={sheetRef}
            defaultSnap={({ maxHeight }) => maxHeight * 0.5}
            snapPoints={({ maxHeight }) => [
              maxHeight * 0.7,
              maxHeight * 0.5,
              maxHeight * 0.2,
            ]}
            expandOnContentDrag={true}
          >
            {body}
          </BottomSheet>
        </div>
      </div>
    </>
  );
};

export default Layout;
