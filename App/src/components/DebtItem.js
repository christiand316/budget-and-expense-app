import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

function DebtItem({ description, totalAmount, totalTerm, startTerm, rate, id, budgetId, refreshBudget }) {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(totalAmount);


  

  function handleDebtEdit() {
    setEditing(true);
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const patchObj = {
      budgetId: budgetId,
      description: description,
      rate: parseInt(rate,10),
      startTerm: startTerm,
      totalTerm: parseInt(totalTerm,10),
      totalAmount: parseInt(value, 10)
    }
    
    await axios.patch(`${BASE_URL}/api/debt/${id}`, patchObj).then((res) => res.data);

    refreshBudget();
    setEditing(false)
  }
/**
 *     budgetId: string;
    description: string;
    rate: number;
    startTerm: string;
    totalTerm: number;
    totalAmount: number;
 */
  const handleDebtDelete = async (e) => {
    await axios.delete(`${BASE_URL}/api/debt/${id}`)

    refreshBudget()
  }



  function monthsPassedSince(date) {
    const currentDate = new Date();
    const termDate = new Date(date);

    const monthsDiff = (currentDate.getFullYear() - termDate.getFullYear()) * 12 + (currentDate.getMonth() - termDate.getMonth());

    return monthsDiff;
  }

  const date = new Date(startTerm);
  const termRemaining = totalTerm - monthsPassedSince(date);

  let debtObj;
  function calculateMonthlyPayment(totalAmount, rate, totalTerm) {
    const monthlyInterestRate = rate / 12 / 100;
    const numberOfPayments = totalTerm;

    const monthlyPayment =
      (totalAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);


    const monthlyPrinciple = totalAmount / totalTerm;
    const date = new Date(startTerm);
    const termRemaining = totalTerm - monthsPassedSince(date);

    debtObj = {
      ...debtObj,
      paidAmount: Math.round(monthlyPrinciple) * termRemaining,
      monthlyAmount: Math.round(monthlyPayment),
      monthlyPrinciple: monthlyPrinciple,
      lostAmount: (monthlyPayment - monthlyPrinciple).toFixed(2),
      termRemaining: termRemaining
    }
    return Math.round(monthlyPayment);
  }

  calculateMonthlyPayment(totalAmount, rate, totalTerm)

  return isEditing ? (
    <div>
      <div>
        <form onSubmit={handleSubmit} >
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="What is the task today?"
          />
          <button type="submit" className="todo-btn">
            Update amount
          </button>
        </form>
      </div>
      <button onClick={handleDebtDelete}>Delete</button>
    </div>
  ) : (
    <div className="debt-card">
      <div className="debt-description">
        <div className="description">
          <p>{description}</p>
        </div>
        <div className="edit">
          <button onClick={handleDebtEdit}>

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>

          </button>
        </div>

      </div>

      <div className="debt-amount">
        <div className="debt-value"> ${(debtObj.monthlyPrinciple * termRemaining).toFixed()}</div> / <div className="debt-greyed-value">${totalAmount}</div>
      </div>

      <div className="debt-term">
        <div className="debt-value"> {debtObj.termRemaining} months </div>  /  <div className="debt-greyed-value"> {totalTerm} months </div>
      </div>
      <div className="debt-overview">
        <div className="debt-rate-payment">
          ${debtObj.monthlyAmount}/month - {rate}% apr
        </div>
        <div className="debt-lost-interest debt-greyed-value">
          ${(debtObj.monthlyAmount - debtObj.monthlyPrinciple).toFixed(2)} lost to interest
        </div>
      </div>
    </div>
  );
}
export default DebtItem;

//<button onClick={handleDebtEdit}>Edit</button>