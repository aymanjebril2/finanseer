import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";
//import Team from "./pages/Team/Team";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ForgotPasswordSuccess from "./pages/ForgotPassword/Success";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import storage from "./utils/storage";


function App() {
  const [isLog, setIsLog] = useState(!!storage.getUserId());
  console.log(isLog);

  useEffect(() => {
    storage.checkForLoggedInUser();
  }, []);

  return (
    <div className="App">
      <Header isLog={isLog} setIsLog={setIsLog} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login">
          <Login setIsLog={setIsLog} />
        </Route>

        <Route exact path="/about" component={About} />
        {/* <Route exact path="/team">
          <Team />
        </Route> */}

        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/forgot-password-success"
          component={ForgotPasswordSuccess}
        />
        <Route exact path="/reset-password" component={ResetPassword} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
