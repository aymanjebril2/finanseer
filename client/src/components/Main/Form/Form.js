import React, { useState, useContext, useEffect } from "react";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider, Collapse, Typography } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Snackbar from "../Snackbar/Snackbar";
import formatDate from "../../../utils/formatDate";
import { ExpenseTrackerContext } from "../../../context/context";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import backend from "../../../utils/backend";
import useStyles from "./styles";
import { useSpeechContext } from "@speechly/react-client";

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
  timestamp: new Date().getTime(),
};

const Form = () => {
  const classes = useStyles();
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);

  const { segment } = useSpeechContext();

 const [alert, revealAlert] = useState(false);
  const [errMsg, setErrMsg] = useState("");


  const createTransaction = () => {
    if (
      formData.amount !== 0 &&
      formData.category !== "" &&
      formData.type !== ""
    ) {

      if (Number.isNaN(Number(formData.amount))) return;

      if (Number.isNaN(Number(formData.amount))) {
        setErrMsg("Input must be number");
        revealAlert(true);
        return;
      } else if (formData.amount < 0) {
        setErrMsg("Input cannot be negative");
        revealAlert(true);
        return;
      }
      revealAlert(false);


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
        amount: Number(formData.amount),
      };

      addTransaction(itemData);
      backend.post(`/api/finance/${formData.type}`, itemData);
      setFormData(initialState);
    }
  };
  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "Income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }

      segment.entities.forEach((s) => {
        const category = `${s.value.charAt(0)}${s.value
          .slice(1)
          .toLowerCase()}`;

        switch (s.type) {
          case "amount":
            setFormData({ ...formData, amount: s.value });
            break;
          case "category":
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: "Income", category });
            } else if (
              expenseCategories.map((iC) => iC.type).includes(category)
            ) {
              setFormData({ ...formData, type: "Expense", category });
            }
            break;
          case "date":
            setFormData({ ...formData, date: s.value });
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        createTransaction();
      }
    }
  }, [segment]);
  // console.log(segment);

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2} className={classes.form}>
      <Snackbar open={open} setOpen={setOpen} />

      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment ? (
            <div className="segment">
              {segment.words.map((w) => w.value).join(" ")}
            </div>
          ) : null}
        </Typography>
      </Grid>

      <ThemeProvider theme={theme}>
        <Grid item xs={6} className={classes.input}>
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

        <Grid item xs={6} className={classes.input}>
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
              setFormData({
                ...formData,
                timestamp: new Date(e.target.value).getTime(),
              })
            }
          />
        </Grid>
        <Collapse in={alert} className={classes.negAlert}>
          <Alert severity="warning" >{errMsg}</Alert>
        </Collapse>
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
