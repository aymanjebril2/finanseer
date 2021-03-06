
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import logo from "./img/crystal-ball.png";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import "./Header.css";

import IconButton from "@material-ui/core/IconButton";
import LogOut from "./LogOut/LogOut";


const useStyles = makeStyles((theme) =>
  createStyles({
    orange: {
      backgroundColor: "#691b99",

      height: 50,
      width: 50,
      border: "3px solid plum",
    },
  })
);


const Header = ({ isLog, setIsLog }) => {
  const location = useLocation();
  const [openLogOut, setOpenLogOut] = useState(false);
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user-info"));
  const handleLogout = () => {
    setOpenLogOut((open) => !open);
  };


  return (
    <div>
      <AppBar style={{ backgroundColor: "rgba(121,9,113,1)" }}>
        <Toolbar style={{ display: "flex", flex: "1 1", justifyContent: "space-between" }}>
          <div className="logo_div">
            <Link to="/">
              <img src={logo} alt="fainaseer logo" className="logo_img" />
            </Link>
          </div>
          { ["/login", "/signup", "/forgot-password"].includes(location.pathname) ? (
            <div>
              <p className="salutation">
                <span className="primary"><span className="tertiary">Welcome to</span>FinanSeer</span><span className="secondary">A simple yet powerful personal finance tool</span>
              </p>
            </div>) : <div>
              <h1>FinanSeer</h1>
            </div>
          }
          <div>

            {isLog ? (
              <IconButton onClick={handleLogout}>
                <Avatar alt="" src="" className={classes.orange}>
                  {user?.firstName?.charAt(0)}
                </Avatar>
              </IconButton>
            ) : (
              ""
            )}

          </div>
        </Toolbar>
      </AppBar>
      {openLogOut ? <LogOut setIsLog={ setIsLog } /> : ""}
    </div>
  );
};

export default Header;
