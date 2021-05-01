import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./components/Header/Header";
import storage from "./utils/storage.js";

function App() {
  const history = useHistory();

  useEffect(() => {
    storage.checkForLoggedInUser();

    const userId = storage.getUserId();

    if (!userId && window.location.pathname === "/") {
      history.push("/login");
    }
  }, [history]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
