import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Details from "../../components/Details/Details";
import LoadingSpinner from "../../components/LoadingSpinner";
import "./Home.css";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={4}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={3}>
          main
        </Grid>

        <Grid item xs={12} sm={4}>
          <Details title="Expense" />
        </Grid>
      </Grid>
      <div className="Loading_Spinner">
        <LoadingSpinner isLoading={loading} />
      </div>
    </div>
  );
};

export default Home;
