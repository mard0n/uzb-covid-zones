import React from "react";
import {
  Header,
  Main,
  H1,
  Select,
  H5,
  Container,
  Button,
  makeStyles,
  Caption,
  Box,
  SectionSplitter,
  SubMain
} from "@mashreq-digital/ui";
import { getMashreqLogo } from "@mashreq-digital/webassets";

interface State {
  number: string;
}

const useStyles = makeStyles(theme => ({

  formGroup: {
    width: theme.spacing(52.5)
  },
}));
const LeftContent = (props:any) => {

  const [values, setValues] = React.useState<State>({
    number: ""
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <SectionSplitter
      top={
        <>
          <H1> Terms &amp; Conditions</H1>
          <Container>
          <Box my={2} style={{height:'490px',overflowY: 'scroll'}}>
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
        </>
      }
      bottom={
        <Box
          borderTop={1}
          display="flex"
          justifyContent="space-between"
          borderColor="rgb(173, 184, 191)"
          pt={3}
        >
          <Button variant="outlined" color="primary" size="medium">
            <span color="primary"> Back </span>
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="primary"
          >
          Agree and proceed 
          </Button>
        </Box>
      }
    />
  );
};

const MobileInfo = () => {
  let LogoSimbol = getMashreqLogo();
  return (
    <Main
      header={
        <Header
          left={<LogoSimbol width="40px" height="40px" />}
          right={
            <Select native onChange={() => {}}>
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </Select>
          }
        />
      }
      main={<SubMain content={<LeftContent />} image={<Box></Box>} />}
      footer={<H5>Footer</H5>}
    />
  );
};
export default MobileInfo;
