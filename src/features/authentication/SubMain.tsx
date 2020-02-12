import React from "react";
import { Grid , Box} from "@mashreq-digital/ui";


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
      <Box mr={5}> 
        {content}
        </Box>
      </Grid>

      <Grid
        item
        xs={5}
        sm={5}
        md={5}
        lg={5}
        xl={5}
      >{image}</Grid>
    </Grid>
  );
}
