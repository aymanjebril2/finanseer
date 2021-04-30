import React from "react";
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Slide,
} from "@material-ui/core";
import { Delete, MoneyOff } from "@material-ui/icons";
import useStyles from "./styles";

const List = () => {
  const classes = useStyles();
  return (
    <MUIList dense={false} className={classes.list}>
      <Slide direction="down" in mountOnEnter unmountOnExit key="">
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <MoneyOff />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="" secondary="" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Slide>
    </MUIList>
  );
};

export default List;
