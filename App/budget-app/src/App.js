import { useEffect, useState } from "react";
import BudgetItem from "./components/BudgetItem";

function App() {

  return (
    <section>
      <button>Add Budget</button>
      <button>Add Expense</button>
      <div>
        <BudgetItem name='fortnite cards' amount='200'></BudgetItem>
      </div>
  </section>
  );
}

export default App;
