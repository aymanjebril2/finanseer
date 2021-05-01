const incomeColors = [
  "#95b8e3",
  "#95dfe3",
  "#008080",
  "#665a72",
  "#a99887",
  "#d5ede6",
  "#587a8f",
  "#53af8b",
  "#454727",
  "#929195",
  "#fff384",
];
const expenseColors = [
  "#d99fce",
  "#e285ab",
  "#c25896",
  "#e1966e",
  "#d9753f",
  "#b2592d",
  "#ff7a00",
  "#ff5470",
  "#ff007c",
  "#e16b40",
  "#974458",
  "#9e5568",
  "#c25896",
  "#fc74fd",
];

export const incomeCategories = [
  { type: "Business", amount: 0, color: incomeColors[0] },
  { type: "Investments", amount: 0, color: incomeColors[1] },
  { type: "Freelance", amount: 0, color: incomeColors[2] },
  { type: "Deposits", amount: 0, color: incomeColors[3] },
  { type: "Lottery", amount: 0, color: incomeColors[4] },
  { type: "Gifts", amount: 0, color: incomeColors[5] },
  { type: "Salary", amount: 0, color: incomeColors[6] },
  { type: "Savings", amount: 0, color: incomeColors[7] },
  { type: "Rental income", amount: 0, color: incomeColors[8] },
  { type: "Allowance", amount: 0, color: incomeColors[9] },
  { type: "Selling goods", amount: 0, color: incomeColors[10] },
];

export const expenseCategories = [
  { type: "Bills", amount: 0, color: expenseColors[0] },
  { type: "Car", amount: 0, color: expenseColors[1] },
  { type: "Clothes", amount: 0, color: expenseColors[2] },
  { type: "Travel", amount: 0, color: expenseColors[3] },
  { type: "Groceries", amount: 0, color: expenseColors[4] },
  { type: "Shopping", amount: 0, color: expenseColors[5] },
  { type: "Rent/Mortage", amount: 0, color: expenseColors[6] },
  { type: "Entertainment", amount: 0, color: expenseColors[7] },
  { type: "Phone", amount: 0, color: expenseColors[8] },
  { type: "Pets", amount: 0, color: expenseColors[9] },
  { type: "Internet", amount: 0, color: expenseColors[10] },
  { type: "Transportation", amount: 0, color: expenseColors[11] },
  { type: "Personal care", amount: 0, color: expenseColors[12] },
  { type: "Other", amount: 0, color: expenseColors[13] },
];

export const resetCategories = () => {
  incomeCategories.forEach((c) => (c.amount = 0));
  expenseCategories.forEach((c) => (c.amount = 0));
};
