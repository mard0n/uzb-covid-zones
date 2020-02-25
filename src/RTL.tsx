import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mashreq-digital/ui";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const RTL = (props: any) => {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
};

export default RTL;
