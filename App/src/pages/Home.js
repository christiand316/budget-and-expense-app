import React, { useState, useEffect } from 'react';
import MonthlyExpenses from '../components/MonthlyExpenses';
import QuickInfoHome from '../components/QuickInfoHome';
import SingleExpenses from '../components/SingleExpenses';
import axios from "axios";
//import './styles/Home.css'


export function Home({ group }) {
  //const [budget, setBudget] = useState(budgetProp.budget)
  const [budget, setBudget] = useState(null)


  const BASE_URL = "http://localhost:3000";

  useEffect(() => {
    async function fetchUserData() {

      try {
        if (!group) {
          return;
        }
        refreshBudget()

      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();

  }, [])


  function formatDateToYearMonthDay() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1);
    const day = String(today.getDate());

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  async function addExpense(addObj) {
    const amountInt = parseInt(addObj.amount, 10)
    const data = {
      budgetId: budget.id,
      description: addObj.description,
      amount: amountInt
    }
    await axios.post(`${BASE_URL}/api/recurringtransactions`, data)

    refreshBudget()
  }

  async function addPurchase(addObj) {
    
    const amountInt = parseInt(addObj.amount, 10)

    const data = {
      budgetId: budget.id,
      description: addObj.description,
      amount: amountInt,
      date: formatDateToYearMonthDay()
    }

    await axios.post(`${BASE_URL}/api/onetimetransactions`, data)

    refreshBudget()

  }
  /*
  async function deletePurchase(id) {
    await axios.delete(`${BASE_URL}/api/onetimetransactions/${id}`)
  }*/

  async function refreshBudget() {
    const resBudget = await axios
      .get(`${BASE_URL}/api/budgets/${group.id}`)
      .then((res) => res.data);


    setBudget(
      resBudget
    )
  }

  console.log(budget)
  return (
    <section>

      {budget ? (
        <div>
          <QuickInfoHome budget={budget} />
          <SingleExpenses budget={budget.oneTimeTransaction} addPurchase={addPurchase} refreshBudget={refreshBudget} />
          <MonthlyExpenses budget={budget.monthlyExpense} debt={budget.debt} addExpense={addExpense} refreshBudget={refreshBudget}/>
        </div>
      ) : (
        <p> Loading... </p>
      )
      }

    </section>
  );
}
//        <SingleExpenses budget={budget.oneTimeTransaction[0]}/>

/**
 * import React, { useState } from 'react';
import BudgetItem from "../components/BudgetItem";

export function Dashboard() {

    return (
        <div>
            <h1>this is the dashboard</h1>
        </div>
    );
}


 * 
 * 
 * 
 * 
 * 
 * 
 *     <section>
      <button>Add Budget</button>
      <button>Add Expense</button>
      
      <div>
        <BudgetItem name='fortnite cards' amount='200'></BudgetItem>
      </div>
    </section>

 */