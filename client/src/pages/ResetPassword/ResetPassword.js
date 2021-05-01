import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Collapse, createMuiTheme, ThemeProvider } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
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

const ResetPassword = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [alert, revealAlert] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const email = (new URLSearchParams(location.search)).get("email");

  async function submit(event) {
    event.preventDefault();
  
    const response = await backend.post("/api/reset-password", {
      email,
      password,
      token: (new URLSearchParams(location.search)).get("token")
    });

    if (!response.success) {
        setErrMsg(response.message)
        revealAlert(!response.success);
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
          Reset Password
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
                  value={ email }
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </Grid>
            </ThemeProvider>
            <Collapse in={alert}>
              <Alert severity="error">{errMsg}</Alert>
            </Collapse>
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
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default ResetPassword;
