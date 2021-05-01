import React from "react";

const isIncome = Math.round(Math.random());

const InfoCard = () => {
  return (
    <div elevation={3} style={{ textAlign: "center", padding: "0 10%", backgroundColor: "rgba(0, 0, 0, 0.12)" }}>
      VOICE-ACTIVATED TRANSACTIONS <br />
      <br />
      Try saying: "Add {isIncome ? "Income " : "Expense "}
      for {isIncome ? "$100 " : "$50 "}
      in Category {isIncome ? "Salary " : "Travel "}
      for {isIncome ? "Monday " : "Thursday "}"
    </div>
  );
};

export default InfoCard;
