import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import logo from "./img/crystal-ball.png";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import "./Header.css";
import { deepOrange } from "@material-ui/core/colors";

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

const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar style={{ backgroundColor: "rgba(121,9,113,1)" }}>
        <Toolbar>
          <div className="logo_div">
            <Link to="/">
              <img src={logo} alt="fainaseer logo" className="logo_img" />
            </Link>
          </div>

          <div>
            <Avatar alt="" src="" className={classes.orange}>
              A
            </Avatar>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
