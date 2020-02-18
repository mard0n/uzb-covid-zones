import React,{useState} from "react";
import {
  H2,
  Container,
  Button,
  Caption,
  Box,
  SectionSplitter,
  SubMain
} from "@mashreq-digital/ui";


const LeftContent = (props:any) => {
  const [ scrolled, setScrolled ] = useState(false);

  const handleScroll = (e: any) => { 
    const { scrollTop, scrollHeight, offsetHeight } = e.target;
    if( scrollTop === (scrollHeight - offsetHeight))
      {
        setScrolled(true)
      }
  }


  return (
    <SectionSplitter
      top={
        <Box mt={20}>
          <H2> Terms &amp; Conditions</H2>
          <Container>
          <Box my={2} id="termScroll" style={{height:'490px',overflowY: 'scroll' }} onScroll={handleScroll}>

          <Caption>
            {[...new Array(12)]
              .map(
                () => `Too many authentication attemps.
                For your security we have disabled this device for 15 minPhasellus sollicitudin hendrerit consectetur. Donec vitae mollis enim. Aenean vitae commodo diam. Integer a nulla vitae mauris facilisis vulputate ac et ipsum. Aenean consectetur quis nulla ac scelerisque. 
                
                Fusce sodales mi quis augue consequat porta. Fusce pharetra vulputate malesuada. Donec ut felis non sapien tempor lobortis sed at massa.
                
                Praesent a massa vehicula lacus finibus viverra. Nulla in dignissim enim, eget interdum nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin tristique turpis ultrices rutrum laoreet.
                Vestibulum euismod aliquam lorem. Donec sit amet leo vel neque vehicula elementum eget non sem. Sed mattis, leo sed porta vehicula, massa ligula condimentum justo, consequat elementum urna magna at nisi. Cras nec molestie odio, sit amet lacinia neque. . `,
              )
              .join('\n')}
              </Caption>
          </Box>
        </Container>
        </Box>
      }
      bottom={
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            size="medium"
            color="primary"
            disabled={!scrolled}
            onClick={props.handleNextStep}
          >
          Agree and proceed 
          </Button>
        </Box>
      }
      borderTop={true}

    />
  );
};

const Terms = (props:any) => {
  return (
    <SubMain content={<LeftContent {...props}/>} image={<Box></Box>} />
  );
};
export default Terms;
