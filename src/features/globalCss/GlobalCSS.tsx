import { withStyles } from "@mashreq-digital/ui";

const GlobalCss = withStyles({
  '@global': {
    '*, *::before, *::after': {
      margin: 0,
      padding: 0
    },
  },
})(() => null);

export default GlobalCss;