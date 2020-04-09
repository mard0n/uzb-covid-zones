import React, { ReactElement } from "react";
import {
  Caption,
  Box
} from "@mashreq-digital/ui";


const TextWraper = (props:any)=>{
const {heading,subHeading} = props;
return(
<>
  <Caption> <span style={{ color:"#adb8bf"}}>{heading} </span></Caption><br/>
  <Caption>{subHeading} </Caption>
</>
)
}

export default TextWraper;
