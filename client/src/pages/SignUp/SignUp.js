import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createMuiTheme, ThemeProvider, Tooltip, Collapse } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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

const SignUp = () => {
  const history = useHistory();
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [alert, revealAlert] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [termsAndConditions, agreeToTermsAndConditions] = useState(false);

  async function submit(event) {
    event.preventDefault();

    const response = await backend.post("/api/register", {
      email: signUpEmail,
      password: signUpPassword,
      firstName,
      lastName,
    });

    if (!response.success) {
      setErrMsg(response.message)
      revealAlert(!response.success);
      return;
    }

    if (!termsAndConditions) {
      console.log('here')
      setErrMsg('Please agree to Terms & Conditions')
      revealAlert(true)
      return;
    }

    history.push("/login");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submit}>
          <Grid container spacing={2}>
            <ThemeProvider theme={theme}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <Tooltip title="Passphrase must be 16 characters long" placement="left">
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Passphrase"
                    type="password"
                    id="password"
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </Tooltip>
              </Grid>
            </ThemeProvider>
            <Grid container xs={12} justify="center">
              <Grid item xs={9}>
              <Collapse in={alert}>
                <Alert severity="error">{errMsg}</Alert>
              </Collapse>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    style={{ color: "rgba(121,9,113,1)" }}
                    />
                  }
                onChange={(e) => agreeToTermsAndConditions(e.target.checked)}
                label="I agree to the Terms & Conditions and Privacy Policy."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="space-around">
            <Grid item>
              <Link
                href="/login"
                variant="body2"
                style={{ color: "rgba(121,9,113,1)" }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};

export default SignUp;
