import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  return (
    <div>
      <AppBar style={{ backgroundColor: "rgba(121,9,113,1)" }}>
        <Toolbar></Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
