import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import backend from "../../utils/backend.js";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgba(121,9,113,1)",
    },
    secondary: {
      main: "#0000FF",
    },
  },
});

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

const ForgotPassword = () => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");

  async function submit(event) {
    event.preventDefault();
  
    const response = await backend.post("/api/forgot-password", {
      email
    });

    if (!response.success) {
      console.error("HANDLE ERROR STATE FOR FORGOT_PASSWORD");
      return;
    }
  
    history.push(`/forgot-password-success?email=${ email }&token=${ response.token }`);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <form className={classes.form} onSubmit={ submit }>
          <Grid container spacing={2}>
            <ThemeProvider theme={theme}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
            </ThemeProvider>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container justify="space-between">
            <Grid item>
              <Link
                href="/login"
                variant="body2"
                style={{ color: "rgba(121,9,113,1)" }}
              >
                Already have an account?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="/signup"
                variant="body2"
                style={{ color: "rgba(121,9,113,1)" }}
              >
                {"Don't have an account?"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default ForgotPassword;
