import React, { useState } from "react";
import MonthlyExpenseItem from "./MonthlyExpenseItem";
import NewExpensesForm from "./NewExpensesForm"
import ExpensesChart from "./home/ExpensesChart";
import axios from "axios";


const BASE_URL = "http://localhost:3000";

function MonthlyExpenses({ budget, budgetExpenses, addExpense, refreshBudget, budgetUsed }) {
  const [isEditing, setEditing] = useState(false)
  const [isAddingPurchase, setAddingPurchase] = useState(false)

  function handleAddExpense(resObj) {
    setAddingPurchase(true)
  }
  function handleDoneAdding() {
    setAddingPurchase(false)
  }


  async function deleteExpense(id) {
    await axios.delete(`${BASE_URL}/api/recurringtransactions/${id}`).then((res) => res.data);
    refreshBudget()
  }
 
  return (
    <div className="home-card">
      {isAddingPurchase ? (
        <div className="card-head">
          <NewExpensesForm addExpense={addExpense} handleDoneAdding={handleDoneAdding} />
        </div>
      ) : (
        <div className="card-head">
          <div className="purchases-expense-card">
            <div>
              <div className="home-card-heading">Monthly Expenses</div>
              <div className="expenses-total"> ${budgetUsed.monthlyExpenseTotal.toLocaleString()}</div>
            </div>

            <div className="home-card-icon" onClick={(e) => { setAddingPurchase(true) }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
            </div>
          </div>



        </div>
      )}

      <div className="expenses-chart">
        <ExpensesChart budget={budget} budgetUsed={budgetUsed} />
      </div>

      {isEditing ? (
        <>
          <div className="expenses-edit" onClick={(e) => { setEditing(false) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
          </div>
          {budgetExpenses.map((item, index) => (
            <MonthlyExpenseItem
              amount={item.amount}
              description={item.description}
              id={item.id}
              key={index}
              deleteExpense={deleteExpense}
              canDelete={true} />
          ))}
        </>
      ) : (
        <>
          <div className="expenses-edit" onClick={(e) => { setEditing(true) }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
          </div>
          {budgetExpenses.map((item, index) => (
            <MonthlyExpenseItem
              amount={item.amount}
              description={item.description}
              id={item.id}
              key={index}
              deleteExpense={deleteExpense}
              canDelete={false} />
          ))}
        </>
      )}
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