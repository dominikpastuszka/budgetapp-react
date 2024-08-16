import React, { useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import EditModal from "./components/EditModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);
  const [deleteTransactionId, setDeleteTransactionId] = useState(null);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );
    setEditTransaction(null);
  };

  const deleteTransaction = (transactionId) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== transactionId)
    );
    setDeleteTransactionId(null);
  };

  const getBalance = () => {
    return transactions.reduce(
      (balance, transaction) =>
        transaction.type === "income"
          ? balance + transaction.amount
          : balance - transaction.amount,
      0
    );
  };

  const balance = getBalance();
  const balanceText =
    balance > 0
      ? `Bilans: ${balance} zł Możesz jeszcze wydać ${balance} złotych`
      : balance === 0
      ? `Bilans: 0 zł Bilans wynosi zero`
      : `Bilans: ${balance} zł Bilans jest ujemny. Jesteś na minusie ${Math.abs(
          balance
        )} złotych`;

  return (
    <div className="container">
      <header>
        <h1 className="header-title">Budżet Domowy</h1>
      </header>
      <h2 className="balance">{balanceText}</h2>
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList
        transactions={transactions}
        onEdit={setEditTransaction}
        onDelete={(transactionId) => setDeleteTransactionId(transactionId)}
      />
      {editTransaction && (
        <EditModal
          transaction={editTransaction}
          onUpdate={updateTransaction}
          onClose={() => setEditTransaction(null)}
        />
      )}
      {deleteTransactionId !== null && (
        <ConfirmDeleteModal
          transactionId={deleteTransactionId}
          transactions={transactions}
          onConfirm={() => deleteTransaction(deleteTransactionId)}
          onCancel={() => setDeleteTransactionId(null)}
        />
      )}
    </div>
  );
};

export default App;
