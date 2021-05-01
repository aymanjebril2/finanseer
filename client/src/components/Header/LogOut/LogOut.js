import React, { useEffect } from "react";
import "./LogOut.css";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";

const LogOut = () => {
  const user = JSON.parse(localStorage.getItem("user-info"));
  // //   const history = useHistory();

  // //   const handleLogut = () => {
  // //     localStorage.clear();
  // //     history.push("/login");
  // //   };
  // //   useEffect(() => {
  // //     handleLogut();
  //   }, [history]);

  return (
    <div className="logout_div">
      <h2> {`${user.firstName} ${user.lastName}`}</h2>
      <div className="logoutBtn">
        <Button variant="contained" color="primary">
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default LogOut;
