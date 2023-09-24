import React, { useState, useEffect } from 'react';
//import './styles/Debt.css'
import axios from "axios";
import QuickInfoDebt from '../components/QuickInfoDebt';
import Debts from '../components/Debts'
import NewDebtForm from "../components/NewDebtForm"

export function Debt({ group }) {
  const [budget, setBudget] = useState(null)





  async function refreshBudget() {
    try {
      const resBudget = await axios
        .get(`${BASE_URL}/api/budgets/${group.id}`)
        .then((res) => res.data);


      setBudget(
        resBudget
      )
    } catch (error) {
      console.error(error)
    }

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



  return (
    <section>
      <QuickInfoDebt refreshBudget={refreshBudget} />
      {budget && <Debts budget={budget.debt} refreshBudget={refreshBudget} />}
    </section>
  )
}

//<Debts budget={budget.debt}/>