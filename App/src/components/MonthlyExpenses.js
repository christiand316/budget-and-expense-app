import React, { useState } from "react";
import MonthlyExpenseItem from "./MonthlyExpenseItem";
import NewExpensesForm from "./NewExpensesForm"
import axios from "axios";

function MonthlyExpenses({ limit, budget, addExpense, refreshBudget }) {

  const [budgets, setBudgets] = useState([])
  const [isAddingPurchase, setAddingPurchase] = useState(false)

  const BASE_URL = "http://localhost:3000";

  function handleAddExpense(resObj) {
    setAddingPurchase(true)
  }
  function handleDoneAdding() {
    setAddingPurchase(false)
  }


  function deleteTodo(id) {
    setBudgets(budgets => budgets.filter(todo => todo.id !== id));
  }

  const updateTask = (task, id) => {
    setBudgets(
      budgets.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
  async function deleteExpense(id) {
       
    await axios.delete(`${BASE_URL}/api/recurringtransactions/${id}`).then((res) => res.data);
    refreshBudget()
}

  return (
    <div className="card">
      <h1>Monthly Expenses</h1>
      {isAddingPurchase ? (
        <>
          <NewExpensesForm addExpense={addExpense} handleDoneAdding={handleDoneAdding} />
        </>
      ) : (
        <>
          <button className="add-expense" onClick={handleAddExpense}>+</button>
        </>
      )}
      <div>

        {budget.map((item, index) => (
          <MonthlyExpenseItem
            amount={item.amount}
            description={item.description}
            id={item.id}
            key={index}
            deleteExpense={deleteExpense} />
        ))}
      </div>
    </div>
  )
}

export default MonthlyExpenses





/**
 * 
        <div className="card">
            <div>
                <h1>Monthly Expenses</h1><button className="add-expense" onClick={handleAddExpense}>+</button>
                <p>{ limit }</p>
            </div>
            <div>
                <h1>bar visualizing expenses</h1>
            </div>
           

      { budget ? (
        <>
        <div>
        {budget.map((item, index) => (
        <MonthlyExpenseItem 
        amount={item.amount}
        description={item.description}

        key={index} deleteTodo={deleteTodo} updateTask={updateTask} />
      ))} 
        </div>
        </>
      ) : (
        <div> no items... </div>
      )}
            
        </div>
    )
 */



/**
 * 
 *     function addTodo(budgets) {
        setBudgets([
          ...budgets,
          { id: uuid(), task: budgets, completed: false },
        ]);
      }

 */