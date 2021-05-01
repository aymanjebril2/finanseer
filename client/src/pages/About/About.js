import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="left"
            color="textPrimary"
            gutterBottom
            style={{
              marginTop: "8%",
              fontWeight: "bolder",
              color: "rgba(121,9,113,1)",
            }}
          >
            About Us
          </Typography>
          <Typography
            component="h3"
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom
            style={{
              marginTop: "3%",
            }}
          >
            What?
          </Typography>
          <Typography align="left" color="textSecondary" paragraph>
            Finanseer is a simple yet powerful tool for tracking your personal
            financial transactions. WIth an intuitive user interface, minimal
            sign up steps, we make it easy to get started and begin tracking
            your money.
          </Typography>
          <Typography
            component="h3"
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom
            style={{
              marginTop: "3%",
            }}
          >
            Who?
          </Typography>
          <Typography align="left" color="textSecondary" paragraph>
            Finanseer was created by a team of individuals that are passionate
            about technology & personal finance. Our goal is to make managing
            your money easy and fun!
          </Typography>
          <Typography
            component="h3"
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom
            style={{
              marginTop: "3%",
            }}
          >
            Why?
          </Typography>
          <Typography align="left" color="textSecondary" paragraph>
            Personal finance education is very important but not something
            that’s not covered in the core education curriculum. There is also a
            stigma associated with talking about money, which we want to
            eradicate.
          </Typography>
          <Typography
            component="h3"
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom
            style={{
              marginTop: "3%",
            }}
          >
            Why Now?
          </Typography>
          <Typography align="left" color="textSecondary" paragraph>
            With all the turbulence in the economy, there has never been a
            better time to take control of your personal finance.
          </Typography>
          <Typography
            component="h3"
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom
            style={{
              marginTop: "3%",
            }}
          >
            How?
          </Typography>
          <Typography align="left" color="textSecondary" paragraph>
            The idea and the initial phases of this application were done in a
            Hackathon! The group came together quickly, hashed out the idea and
            the initial scope and implemented initial functionality within 48
            hours!
          </Typography>
        </Container>
      </div>
    </main>
  );
};

export default About;
