import React, { useState } from "react";
import "./LogOut.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const LogOut = ({ setIsLog }) => {
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("user-info")) || {});
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    setUser({});
    setIsLog(false);

    // TODO logout API for cookies
    history.push("/login");
  };

  if (!user.firstName) {
    return null;
  }

  return (
    <div className="logout_div">
      <h2> {`${user.firstName} ${user.lastName}`}</h2>
      <h3>{user.email}</h3>
      <div className="logoutBtn">
        <Button variant="contained" color="primary" onClick={ handleLogout }>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default LogOut;
