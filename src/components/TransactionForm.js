import React, { useState, useEffect } from "react";

function TransactionForm({
  addTransaction,
  transactionToEdit,
  updateTransaction,
}) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  useEffect(() => {
    if (transactionToEdit) {
      setDescription(transactionToEdit.description);
      setAmount(transactionToEdit.amount);
      setType(transactionToEdit.type);
    }
  }, [transactionToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transactionToEdit) {
      updateTransaction({
        id: transactionToEdit.id,
        description,
        amount: parseFloat(amount),
        type,
      });
    } else {
      addTransaction({ description, amount: parseFloat(amount), type });
    }
    clearForm();
  };

  const clearForm = () => {
    setDescription("");
    setAmount("");
    setType("income");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Opis"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Kwota (PLN)"
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Przychód</option>
        <option value="expense">Wydatek</option>
      </select>
      <button type="submit">{transactionToEdit ? "Edytuj" : "Dodaj"}</button>
    </form>
  );
}

export default TransactionForm;
