import { createTheme } from "@material-ui/core/styles";
import { blueGrey, red } from "@material-ui/core/colors";

const theme = createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: "#4e5fdc",
      main: "#283EDE",
      dark: "#081aa0",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f88f83",
      main: "#F95D4B",
      dark: "#f9240d",
      contrastText: "#000",
    },
    openTitle: red["700"],
    protectedTitle: red["700"],
    type: "light",
  },
});

export default theme;
