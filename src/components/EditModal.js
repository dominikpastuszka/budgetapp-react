import React, { useState } from "react";

const EditModal = ({ transaction, onUpdate, onClose }) => {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [type, setType] = useState(transaction.type);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!description.trim()) {
      errors.description = "Opis jest wymagany.";
    }

    if (isNaN(amount) || amount < 0.01) {
      errors.amount = "Kwota musi być większa lub równa 0.01.";
    }

    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      onUpdate({
        ...transaction,
        description,
        amount: parseFloat(amount),
        type,
      });
      onClose();
    }
  };

  return (
    <div className="modal edit-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Edytuj transakcję</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" value={transaction.id} />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Opis"
          />
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Kwota"
            min="0.01"
            step="0.01"
          />
          {errors.amount && <p className="error-message">{errors.amount}</p>}
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Przychód</option>
            <option value="expense">Wydatek</option>
          </select>
          <button type="submit">Zapisz zmiany</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
