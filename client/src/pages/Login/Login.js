import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Collapse, createMuiTheme, ThemeProvider } from "@material-ui/core";
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
import storage from "../../utils/storage.js";
import backend from "../../utils/backend.js";
import "./Login.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgba(121,9,113,1)",
    },
  },
});

const Copyright = () => {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ color: "rgba(121,9,113,1)" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="" style={{ color: "rgba(121,9,113,1)" }}>
        Finanseer
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    primary: "red",
  },
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "rgba(121,9,113,1)",
    color: "white",
    "&:hover": {
      backgroundColor: "#6F396D",
    },
  }
}));

const Login = ({ setIsLog }) => {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, revealAlert] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  async function submit(event) {
    event.preventDefault();

    const remember = !!document.getElementById("remember").checked;

    const response = await backend.post("/api/signin", {
      email,
      password,
      remember
    });

    if (!response.success) {
      setErrMsg(response.message)
      revealAlert(!response.success);
      return;
    }

    storage.setAuthTokens(response.id, response.token, remember);
    storage.setUserInfo(response.email, response.firstName, response.lastName);

    history.push("/");
    setIsLog((log) => !log);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={ submit }>
          <ThemeProvider theme={theme}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              onChange={(e) => {setEmail(e.target.value)}}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Passphrase"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </ThemeProvider>
          <Collapse in={alert}>
            <Alert severity="error">{errMsg}</Alert>
          </Collapse>
          <FormControlLabel
            control={
              <Checkbox
                id="remember"
                style={{ color: "rgba(121,9,113,1)" }}
                />
            }
            label="Remember me"
          />
          {/* {primary} */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // color="rgba(121,9,113,1)"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="space-between">
            <Grid item>
              <Link
                href="/forgot-password"
                variant="body2"
                style={{ color: "rgba(121,9,113,1)" }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="/signup"
                variant="body2"
                style={{ color: "rgba(121,9,113,1)" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
