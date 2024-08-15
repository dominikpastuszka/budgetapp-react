import React from "react";

const TransactionList = ({ transactions, onEdit, onDelete }) => (
  <ul className="transaction-list">
    {transactions.map((transaction) => (
      <li key={transaction.id} className={transaction.type}>
        {transaction.description}: {transaction.amount} zł
        <button onClick={() => onEdit(transaction)}>Edytuj</button>
        <button onClick={() => onDelete(transaction.id)}>Usuń</button>
      </li>
    ))}
  </ul>
);

export default TransactionList;
