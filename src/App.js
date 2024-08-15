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
      transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );
    setEditTransaction(null);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    setDeleteTransactionId(null);
  };

  const getBalance = () => {
    return transactions.reduce(
      (acc, transaction) =>
        transaction.type === "income"
          ? acc + transaction.amount
          : acc - transaction.amount,
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
        <h1>Budżet Domowy</h1>
      </header>
      <h2 id="balance">{balanceText}</h2>
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList
        transactions={transactions}
        onEdit={setEditTransaction}
        onDelete={(id) => setDeleteTransactionId(id)}
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
          transactions={transactions} // Pass the transactions here
          onConfirm={() => deleteTransaction(deleteTransactionId)}
          onCancel={() => setDeleteTransactionId(null)}
        />
      )}
    </div>
  );
};

export default App;
