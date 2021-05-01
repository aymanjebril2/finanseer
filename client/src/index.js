import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "./context/context";
import { SpeechProvider } from "@speechly/react-client";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <SpeechProvider appId="bea8dd8a-5a3c-431b-b9b7-0286bf41a42a" language="en-US">
    <Provider>
      <Router>
        <App />
      </Router>
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
