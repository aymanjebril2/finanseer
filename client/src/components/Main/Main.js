import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { ExpenseTrackerContext } from "../../context/context";
import useStyles from "./styles";
import Form from "./Form/Form";
import List from "./List/List";
import InfoCard from "../InfoCard";

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontStyle: 'italic',
      color: 'rgba(0, 0, 0, 0.38)'
    }
  }
})

const Main = () => {
  const classes = useStyles();
  const { balance } = useContext(ExpenseTrackerContext);

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.root} raised={true} >
        <CardContent>
          <Typography
            variant="subtitle1"
            style={{ lineHeight: "1.5em", marginTop: "20px" }}
          >
            <Card variant="outlined" color="grey">
              <InfoCard />
            </Card>
          </Typography>
          <Divider className={classes.divider} />
          <Form />
        </CardContent>
        <CardContent className={classes.cartContent}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <List />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default Main;
