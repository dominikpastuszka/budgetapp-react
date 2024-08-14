import React from "react";

function Balance({ balance }) {
  let message = "";
  if (balance > 0) {
    message = `Możesz jeszcze wydać ${balance} złotych`;
  } else if (balance < 0) {
    message = `Bilans jest ujemny. Jesteś na minusie ${-balance} złotych`;
  } else {
    message = "Bilans wynosi zero";
  }

  return (
    <div>
      <h2>Bilans: {balance} zł</h2>
      <p>{message}</p>
    </div>
  );
}

export default Balance;
