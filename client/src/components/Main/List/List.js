import React, { useContext, useEffect, useState } from "react";
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
import LoadingSpinner from "../../LoadingSpinner";
import { ExpenseTrackerContext } from "../../../context/context";
import backend from "../../../utils/backend";
import formatDate from "../../../utils/formatDate";
import formatPrice from "../../../utils/formatPrice";
import useStyles from "./styles";

const List = () => {
  const [ loading, setLoading ] = useState(false);
  const classes = useStyles();
  const { transactions, deleteTransaction, setTransactions } = useContext(ExpenseTrackerContext);

  useEffect(()=> {
    const fetchTransactions = async ()=>{
      setLoading(true);
      const { transactions } = await backend.get("/api/finance/overview");
      setTransactions(transactions);
      setLoading(false);
    };

    fetchTransactions();
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  async function deleteItem(id) {
    await backend.delete(`/api/finance/${ id }`);
    deleteTransaction(id);
  }

  return (
    <MUIList dense={false} className={classes.list}>
      <LoadingSpinner isLoading={ loading } />
      {transactions.map((transaction) => (
        <Slide
          direction="down"
          in
          mountOnEnter
          unmountOnExit
          key={transaction.id}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar
                className={
                  transaction.type === "Income"
                    ? classes.avatarIncome
                    : classes.avatarExpense
                }
              >
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={transaction.category}
              secondary={`${formatPrice(transaction.amount)} - ${formatDate(transaction.timestamp)}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteItem(transaction.id)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MUIList>
  );
};

export default List;
