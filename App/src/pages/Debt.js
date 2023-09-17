import React, { useState, useEffect } from 'react';
//import './styles/Debt.css'
import axios from "axios";
import QuickInfoDebt from '../components/QuickInfoDebt';
import Debts from '../components/Debts'
import NewDebtForm from "../components/NewDebtForm"

export function Debt({ group }) {
  const [budget, setBudget] = useState(null)
  const [isAddingDebt, setAddingDebt] = useState(false)

  function handleAddDebt(resObj) {
    setAddingDebt(true)
  }
  function handleDoneAdding() {
    setAddingDebt(false)
  }
  async function addDebt(addObj) {

    const data = {
      budgetId: budget.id,
      description: addObj.description,
      rate: addObj.rate,
      startTerm: addObj.startTerm,
      totalTerm: addObj.totalTerm,
      totalAmount:  parseInt(addObj.totalAmount, 10),
    }
    console.log(data)
    await axios.post(`${BASE_URL}/api/debt`, data)
    //
    //refreshBudget()

  }
// make sure debt endpoint can be request with group id as header
  async function refreshBudget() {
    const resBudget = await axios
      .get(`${BASE_URL}/api/debt/${group.id}`)
      .then((res) => res.data);


    setBudget(
      resBudget
    )
  }


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
  async function refreshBudget() {
    const resBudget = await axios
      .get(`${BASE_URL}/api/budgets/${group.id}`)
      .then((res) => res.data);


    setBudget(
      resBudget
    )
  }

  return (
    <div>
      {isAddingDebt ? (
        <>
          <NewDebtForm addDebt={addDebt} handleDoneAdding={handleDoneAdding} />
        </>
      ) : (
        <>
          <h1>Debt</h1> <button className="add-debt" onClick={handleAddDebt}>+</button>
        </>
      )
      }
      <div className='card'>
        <QuickInfoDebt />
        {budget && <Debts budget={budget.debt} />}
      </div>
    </div>
  )
}

//<Debts budget={budget.debt}/>