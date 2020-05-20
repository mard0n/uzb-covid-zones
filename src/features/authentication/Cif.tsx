import React from "react";
import {
  H1,
  TextField,
  FormControl,
  Button,
  FormGroup,
  makeStyles,
  Box,
  SectionSplitter,
  SubMain,
  Grid,
} from "@mashreq-digital/ui";
import { DASHBOARD } from "../../router/config";
import { useHistory } from "react-router-dom";

let landing = require("../../assets/images/landing.png");
let getCif: any = sessionStorage && sessionStorage.cif ? sessionStorage.getItem('cif') : '';

console.log(sessionStorage, getCif, "cif type ", typeof getCif)

interface State {
  cif: string;
}

const useStyles = makeStyles(theme => ({
  backgroundImg: {
    backgroundImage: `url(${landing})`,
    backgroundSize: "cover",
    backgroundPosition: "100%"
  },
  inputBox: {
    marginTop: theme.spacing(4.3)
  }
}));
const LeftContent = (props: any) => {
  const { inputBox } = useStyles();
  const history = useHistory();

  const [values, setValues] = React.useState<State>({
    cif: getCif
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onSignIn = () => {
    history.push(DASHBOARD);
    sessionStorage.clear();
    sessionStorage.setItem("cif", values.cif);
  };


  return (
    <SectionSplitter
      top={
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>

          <Box mt={10}>
            <H1>Enter CIF Number</H1>
            <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
              <FormGroup>
                <FormControl className={inputBox}>
                  <TextField
                    id="cif"
                    autoFocus={true}
                    value={values.cif}
                    label="CIF Number"
                    onChange={handleChange("cif")}
                    inputProps={{
                      maxLength: 80
                    }}
                  />
                </FormControl>
              </FormGroup>
            </Grid>
          </Box>
        </Grid>
      }
      bottom={
        <Box display="flex" justifyContent="space-between">
          <Box></Box>
          <Button
            variant="contained"
            color="primary"
            disabled={!values.cif}
            onClick={onSignIn}
          >
            Save
          </Button>
        </Box>
      }
      borderTop={true}
    />
  );
};

const Cif = (props: any) => {
  const { backgroundImg } = useStyles();
  return (
    <SubMain
      content={<Box height="100%" pb={5}><LeftContent {...props} /></Box>}
      image={<Box width="100%" height="100%" className={backgroundImg}></Box>}
    />
  );
};
export default Cif;
