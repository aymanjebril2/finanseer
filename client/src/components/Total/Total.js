import React, { useContext } from "react";
import { Card } from "@material-ui/core";
import { ExpenseTrackerContext } from "../../context/context";
import formatPrice from "../../utils/formatPrice";

export const Total = () => {
  const { balance } = useContext(ExpenseTrackerContext);
  return (
    <div>
      <Card raised="true">
        <h1>Total Balance: { formatPrice(balance) }</h1>
      </Card>
    </div>
  );
};
