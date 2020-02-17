import { withStyles } from "@mashreq-digital/ui";

const GlobalCss = withStyles({
  '@global': {
    '*, *::before, *::after': {
      margin: 0,
      padding: 0
    },
    "body":{
      backgroundColor:"#ffffff",
      '@media (min-width: 1440px)' : {
        maxWidth: '1440px',
        margin: '0 auto'
      }
    }
  },
})(() => null);

export default GlobalCss;