const contextReducer = (state, action) => {
  let transactions;

  switch (action.type) {
    case "DELETE_TRANSACTION":
      transactions = state.filter(
        (transaction) => transaction.id !== action.payload
      );

      localStorage.setItem("transactions", JSON.stringify(transactions));

      return transactions;
    case "ADD_TRANSACTION":
      transactions = [action.payload, ...state];

      localStorage.setItem("transactions", JSON.stringify(transactions));

      return transactions;
    case "SET_TRANSACTIONS":
      if (!action.payload) {
        return state;
      }

      localStorage.setItem("transactions", JSON.stringify(action.payload));

      return action.payload;
    default:
      return state;
  }
};

export default contextReducer;
