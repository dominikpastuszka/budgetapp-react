import React from "react";

const TransactionList = ({ transactions, onEdit, onDelete }) => (
  <ul className="transaction-list">
    {transactions.map((transaction) => (
      <li
        key={transaction.id}
        className={`transaction-list-item transaction-${transaction.type}`}
      >
        <div className="transaction-details">
          <span className="transaction-description">
            {transaction.description}:
          </span>
          <span className="transaction-amount">{transaction.amount} zł</span>
        </div>
        <div className="transaction-buttons">
          <button className="edit-button" onClick={() => onEdit(transaction)}>
            Edytuj
          </button>
          <button
            className="delete-button"
            onClick={() => onDelete(transaction.id)}
          >
            Usuń
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default TransactionList;
