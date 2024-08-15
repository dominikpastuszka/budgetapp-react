import React, { useState } from "react";

const TransactionForm = ({ addTransaction }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
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
      addTransaction({
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        type,
      });
      setDescription("");
      setAmount("");
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Opis"
        />
        {errors.description && (
          <p className="error-message">{errors.description}</p>
        )}
      </div>
      <div className="form-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Kwota"
          min="0.01"
          step="0.01"
        />
        {errors.amount && <p className="error-message">{errors.amount}</p>}
      </div>
      <div className="form-group">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Przychód</option>
          <option value="expense">Wydatek</option>
        </select>
      </div>
      <button type="submit">Dodaj</button>
    </form>
  );
};

export default TransactionForm;
