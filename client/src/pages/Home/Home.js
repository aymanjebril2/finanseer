import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Details from "../../components/Details/Details";
import LoadingSpinner from "../../components/LoadingSpinner";
import "./Home.css";
import Main from "../../components/Main/Main";
import { Total } from "../../components/Total/Total";
import { SpeechState, useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";
import storage from "../../utils/storage";

const Home = () => {
  const history = useHistory();
  const { speechState } = useSpeechContext();
  const main = useRef(null);
  const executeScroll = () => main.current.scrollIntoView();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  useEffect(() => {
    const userId = storage.getUserId();

    if (!userId && window.location.pathname === "/") {
      history.push("/login");
    }
  }, [history]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    setTimeout(() => {
      try {
        // This is a hack for styling the mic
        document.querySelector("holdable-button").shadowRoot.children[1].children[1].shadowRoot.children[1].setAttribute("style", "margin-left: -48px");
      } catch (error) {}
    }, 10);
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
        <div className={ `themic_div${ !loading ? " show" : "" }` }>
          <PushToTalkButton size="6rem" />
        </div>
      </PushToTalkButtonContainer>
    </>
  );
};

export default Home;
