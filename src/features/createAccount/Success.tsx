import React from "react";
import {
  H2,
  Button,
  Grid,
  Box,
  SectionSplitter,
  SubMain,
} from "@mashreq-digital/ui";
let   successImage = require("../../assets/images/success.png");



const LeftContent = (props:any) => {

  const { history } = props;

  return (
    <SectionSplitter
      top={
        <Grid 
        xs={8}
        sm={8}
        md={8}
        lg={8}
        xl={8}
        >        
        <Box mt={20}> 
          <H2>Success</H2>
          <Grid 
        xs={8}
        sm={8}
        md={8}
        lg={8}
        xl={8}
        >   
        <Box mt={2.5}>
          <img alt="success page" src={  successImage} width="400" height="400" />
          </Box>
        </Grid>
        </Box>
        </Grid>
      }
      bottom={
        <Box display="flex" justifyContent="flex-end">

          <Button
            variant="contained"
            size="medium"
            color="primary"
            onClick = {()=>history.push("/login")}
          >
            Start Demo again
          </Button>
        </Box>
      }
      borderTop={true}

    />
  );
};

const   success = (props:any) => {
  return (
    <SubMain content={<LeftContent {...props}/>} image={<Box></Box>} />
  );
};
export default   success;
