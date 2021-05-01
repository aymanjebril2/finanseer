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
    backgroundColor: "rgba(121,9,113,1)",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            <nav>
              <ul
                style={{
                  listStyle: "none",
                  textDecoration: "none",
                  marginRight: 20,
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
