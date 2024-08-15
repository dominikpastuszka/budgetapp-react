import React from "react";

const ConfirmDeleteModal = ({
  transactionId,
  transactions,
  onConfirm,
  onCancel,
}) => {
  // Find the transaction based on the provided transactionId
  const transaction = transactions.find((t) => t.id === transactionId);

  if (!transaction) return null;

  return (
    <div id="confirm-delete-modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCancel}>
          &times;
        </span>
        <h2>Potwierdzenie usunięcia</h2>
        <p>
          Czy na pewno chcesz usunąć "{transaction.description}" o wartości{" "}
          {transaction.amount} zł?
        </p>
        <button onClick={onConfirm}>Tak, usuń</button>
        <button onClick={onCancel}>Anuluj</button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
