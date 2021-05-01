import React, { useState, useContext } from "react";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Snackbar from "../Snackbar/Snackbar";
import formatDate from "../../../utils/formatDate";
import { ExpenseTrackerContext } from "../../../context/context";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import backend from "../../../utils/backend";
import useStyles from "./styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgba(121,9,113,1)",
    },
  },
});

const initialState = {
  amount: "",
  category: "",
  type: "Income",
  timestamp: new Date().getTime()
};

const Form = () => {
  const classes = useStyles();
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);

  const createTransaction = () => {
    if (
      formData.amount !== 0 &&
      formData.category !== "" &&
      formData.type !== ""
    ) {
      if (Number.isNaN(Number(formData.amount)))
        return;

      if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
        setFormData({ ...formData, type: "Income" });
      } else if (
        expenseCategories.map((iC) => iC.type).includes(formData.category)
      ) {
        setFormData({ ...formData, type: "Expense" });
      }

      setOpen(true);

      const itemData = {
        ...formData,
        amount: Number(formData.amount)
      };

      addTransaction(itemData);
      backend.post(`/api/finance/${ formData.type }`, itemData);
      setFormData(initialState);
    }
  };

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <Snackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {" "}
          some words{" "}
        </Typography>
      </Grid>
      <ThemeProvider theme={theme}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {selectedCategories.map((c) => (
                <MenuItem key={c.type} value={c.type}>
                  {c.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            type="number"
            label="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={formatDate(formData.timestamp)}
            onChange={(e) =>
              setFormData({ ...formData, timestamp: new Date(e.target.value).getTime() })
            }
          />
        </Grid>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={createTransaction}
        >
          Create
        </Button>
      </ThemeProvider>
    </Grid>
  );
};

export default Form;
