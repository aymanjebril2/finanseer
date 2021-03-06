import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    // marginTop: theme.spacing(10),
    // marginBottom: -20000,
    backgroundColor: "rgba(121,9,113,1)",
    position: "sticky",
    [theme.breakpoints.up(900)]: {
      position: "fixed",
      width: "100vw",
      bottom: 0
    }
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div>
      {/* <AppBar
        style={{
          backgroundColor: "rgba(121,9,113,1)",
        }}
        position="static"
      > */}
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <div
            style={{
              overflow: "hidden",
            }}
          >
            <nav>
              <ul
                style={{
                  listStyle: "none",
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  allignItems: "center",
                }}
              >
                <li>
                  <NavLink
                    exact
                    to={"/about"}
                    style={{
                      textDecoration: "none",
                      color: "#DD96D6",
                      fontWeight: "bolder",
                    }}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    exact
                    to={"/team"}
                    style={{
                      textDecoration: "none",
                      color: "#DD96D6",
                      fontWeight: "bolder",
                    }}
                  >
                    Team
                  </NavLink>
                </li>
                <li style={{ color: "#DD96D6", fontWeight: "bolder" }}>
                  Terms and Conditions
                </li>
              </ul>
            </nav>
          </div>
          <Copyright />
        </Container>
      </footer>
      {/* </AppBar> */}
    </div>
  );
};

export default Footer;
