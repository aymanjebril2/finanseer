import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./components/Header/Header";
import storage from "./utils/storage.js";

import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";

import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ForgotPasswordSuccess from "./pages/ForgotPassword/Success";
import ResetPassword from "./pages/ResetPassword/ResetPassword";


function App() {
  const [isLog, setIsLog] = useState(false);
  const history = useHistory();
  console.log(isLog);

  useEffect(() => {
    storage.checkForLoggedInUser();

    const userId = storage.getUserId();

    if (!userId && window.location.pathname === "/") {
      history.push("/login");
    }
  }, [history]);

  return (
    <div className="App">
      <Header isLog={isLog} setIsLog={setIsLog} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login">
          <Login setIsLog={setIsLog} />
        </Route>

        <Route exact path="/login">
          <Login setIsLog={setIsLog} />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/forgot-password-success" component={ForgotPasswordSuccess} />
        <Route exact path="/reset-password" component={ResetPassword} />

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
