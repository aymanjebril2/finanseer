import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
import Details from "../../components/Details/Details";
import LoadingSpinner from "../../components/LoadingSpinner";
import "./Home.css";
import useStyles from "./styles";
import Main from "../../components/Main/Main";
import { Total } from "../../components/Total/Total";
import { SpeechState, useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";

const Home = () => {
  const { speechState } = useSpeechContext();
  const classes = useStyles();
  const main = useRef(null);
  const executeScroll = () => main.current.scrollIntoView();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <div className="root_div_home">
        <div className="main_div" ref={main}>
          <Main />
        </div>
        <div className="total_div">
          <Total />
          <div className="main_details">
            <div className="details_div">
              <Details title="Income" />
            </div>
            <div className="details_div">
              <Details title="Expense" />
            </div>
          </div>
        </div>

        <div className="Loading_Spinner">
          <LoadingSpinner isLoading={loading} />
        </div>
      </div>

      <PushToTalkButtonContainer>
        <div className="themic_div">
          <PushToTalkButton size="6rem" />
        </div>
      </PushToTalkButtonContainer>
    </>
  );
};

export default Home;
