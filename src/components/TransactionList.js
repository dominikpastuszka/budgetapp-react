import React from "react";

function TransactionList({ transactions, deleteTransaction, editTransaction }) {
  return (
    <ul className="transaction-list">
      {transactions.map((transaction) => (
        <li key={transaction.id} className={transaction.type}>
          {transaction.description}: {transaction.amount} zł
          <div>
            <button onClick={() => editTransaction(transaction.id)}>
              Edytuj
            </button>
            <button onClick={() => deleteTransaction(transaction.id)}>
              Usuń
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
