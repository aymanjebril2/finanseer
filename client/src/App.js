import React from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import SingUp from "./pages/SingUp/SingUp";
import Login from "./pages/Login/Login";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/singup" component={SingUp} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
