import React, { useState, useEffect } from 'react';
import axios from "axios";
import QuickInfoDebt from '../components/debt/QuickInfoDebt';
import DebtItem from "../components/debt/DebtItem";
import NewDebtForm from "../components/forms/NewDebtForm"

export function Debt({ group }) {
  const [budget, setBudget] = useState(null)

  const debtChartColors = ["#519848", "#F06449", "#D3CC00", "#12EAEA", "#55828B",  "#D89982"] //  1stExpense, 2ndExpense, 3rdExpense, 4thExpense, backgroundColor, expenseOverflow

// "#D89982", "#FF8A5B", "#54D180"

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



  if (budget) {
    return (
      <section>
        <QuickInfoDebt budget={budget.debt} budgetId={budget.id} debtChartColors={debtChartColors} refreshBudget={refreshBudget} />

        {budget.debt.map((item, index) => (
          <DebtItem
            totalAmount={item.totalAmount}
            description={item.description}
            totalTerm={item.totalTerm}
            startTerm={item.startTerm}
            rate={item.rate}
            id={item.id}
            key={index}
            budgetId={item.budgetId}

            debtChartColors={debtChartColors}
            refreshBudget={refreshBudget}
          />
        ))}

      </section>
    )
  }
}
