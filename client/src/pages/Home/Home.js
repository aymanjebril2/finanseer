import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import Details from "../../components/Details/Details";
import LoadingSpinner from "../../components/LoadingSpinner";
import "./Home.css";
import useStyles from "./styles";
import Main from "../../components/Main/Main";

const Home = () => {
  const classes = useStyles();
  const main = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="root_div_home">
      <div className="main_div">
        <Main />
      </div>

      <div className="main_details">
        <div className="details_div">
          <Details title="Income" />
        </div>
        <div className="details_div">
          <Details title="Expense" />
        </div>
      </div>

      <div className="Loading_Spinner">
        <LoadingSpinner isLoading={loading} />
      </div>
    </div>
  );
};

export default Home;
