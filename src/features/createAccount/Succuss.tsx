import React from "react";
import {
  H2,
  H3,
  Button,
  Caption,
  Grid,
  Box,
  SectionSplitter,
  SubMain,
} from "@mashreq-digital/ui";
let succussImage = require("../../assets/images/succuss.png");


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
          <H2>Succuss</H2>
          <Grid 
        xs={8}
        sm={8}
        md={8}
        lg={8}
        xl={8}
        >   
        <Box mt={2.5}>
          <img src={succussImage} width="400" height="400" />
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
            Start again
          </Button>
        </Box>
      }
      borderTop={true}

    />
  );
};

const Succuss = (props:any) => {
  return (
    <SubMain content={<LeftContent {...props}/>} image={<Box></Box>} />
  );
};
export default Succuss;
