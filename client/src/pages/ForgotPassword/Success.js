import React from "react";
import { useLocation } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const Copyright = () => {
  return (
    <Typography
      variant="body2"
      style={{ color: "rgba(121,9,113,1)" }}
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Finanseer
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(18),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "rgba(121,9,113,1)",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "rgba(121,9,113,1)",
    color: "white",
    "&:hover": {
      backgroundColor: "#6F396D",
    },
  },
}));

const Success = () => {
  const location = useLocation();
  const classes = useStyles();

  const email = (new URLSearchParams(location.search)).get("email");
  const token = (new URLSearchParams(location.search)).get("token");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Success!
        </Typography>
        <Typography component="p">
          Please check your email.
        </Typography>
          <Grid container>
            <Grid item>
              <Link
                href={ `/reset-password?email=${ email }&token=${ token }` }
                variant="body2"
                style={{ color: "rgba(121,9,113,1)" }}
              >
                Since this is a demo we didn't hook up the email provider, so just click here to pretend you're coming from that flow
              </Link>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Success;
