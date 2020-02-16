import React from "react";
import { Grid } from "@mashreq-digital/ui";


export default function SubMain({content,image}:any) {
  return (
    <Grid container>
      <Grid
        item
        xs={7}
        sm={7}
        md={7}
        lg={7}
        xl={7}
      >
        {content}
      </Grid>

      <Grid
      item
      xs={1}
      sm={1}
      md={1}
      lg={1}
      xl={1}
    >        </Grid>

      <Grid
        item
        xs={4}
        sm={4}
        md={4}
        lg={4}
        xl={4}
      >{image}</Grid>
    </Grid>
  );
}
