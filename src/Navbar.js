import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import styles from "./styles/NavBarStyles";
import { ThemeContext } from "./contexts/ThemeContext";

const content = {
  player1: {
    flag: "🤾‍♂️️",
  },
  player2: {
    flag: "🤾‍♀️️",
  },
};
function Navbar(props) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { classes } = props;
  const { flag } = !isDarkMode ? content["player1"] : content["player2"];
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#9ccc65",
      },
      secondary: {
        main: "#b39ddb",
      },
    },
  });
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color={isDarkMode ? "primary" : "secondary"}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
              >
                Toggle Player
              </Typography>
              <Switch onChange={toggleTheme} />
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
              >
                {!isDarkMode ? "player 1" : "player 2"}
              </Typography>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                style={{ margin: "2px" }}
              >
                <span>{flag}</span>
              </IconButton>
            </div>
          </Grid>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
export default withStyles(styles)(Navbar);
