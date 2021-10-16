import * as React from "react";
import { Skeleton } from "@material-ui/lab";

export interface SuggestedZonesProps {
  mdUp: boolean;
}

const SuggestedZones: React.SFC<SuggestedZonesProps> = (props) => {
  const style = {
    display: "inline-block",
    marginRight: 4,
    borderRadius: 18,
    backgroundColor: props.mdUp ? "#ebebebc7" : "white",
    boxShadow: props.mdUp ? 'unset' : '0px -10px 40px rgba(0, 30, 89, 0.09)'
  }
  return (
    <div style={{ padding: "8px 0 16px" }}>
      <Skeleton
        animation="wave"
        variant="rect"
        width="150px"
        height="36px"
        style={style}
      />
      <Skeleton
        animation="wave"
        variant="rect"
        width="150px"
        height="36px"
        style={style}
      />
    </div>
  );
};

export default SuggestedZones;
