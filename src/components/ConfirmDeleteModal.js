import React from "react";

const ConfirmDeleteModal = ({
  transactionId,
  transactions,
  onConfirm,
  onCancel,
}) => {
  const transaction = transactions.find(
    (transaction) => transaction.id === transactionId
  );

  if (!transaction) return null;

  return (
    <div className="modal confirm-delete-modal">
      <div className="modal-content">
        <span className="close" onClick={onCancel}>
          &times;
        </span>
        <h2>Potwierdzenie usunięcia</h2>
        <p>
          Czy na pewno chcesz usunąć "{transaction.description}" o wartości{" "}
          {transaction.amount} zł?
        </p>
        <button className="confirm-button" onClick={onConfirm}>
          Tak, usuń
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Anuluj
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
