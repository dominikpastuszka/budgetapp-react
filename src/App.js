import React, { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Balance from "./components/Balance";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const editTransaction = (id) => {
    const transaction = transactions.find(
      (transaction) => transaction.id === id
    );
    setTransactionToEdit(transaction);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );
    setTransactionToEdit(null);
  };

  const balance = transactions.reduce((acc, transaction) => {
    return transaction.type === "income"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  return (
    <div className="container">
      <h1>Monitorowanie Budżetu Domowego</h1>
      <Balance balance={balance} />
      <TransactionForm
        addTransaction={addTransaction}
        transactionToEdit={transactionToEdit}
        updateTransaction={updateTransaction}
      />
      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
      />
    </div>
  );
}

export default App;
