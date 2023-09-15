import React, { useState } from "react";

function DebtItem({ description, totalAmount, termLength, termStart, rate, updateDebt, }) {
  const [isEditing, setEditing] = useState(false);
  //const [value, setValue] = useState(task.task);

  function handleDebtEdit() {
    setEditing(true);
    updateDebt(task.id);
  }

  const handleChange = (e) => {
    setValue(e.target.value)
}


  function monthsPassedSince(date) {
    const currentDate = new Date();

    const yearsDiff = currentDate.getFullYear() - date.getFullYear();
    const monthsDiff = currentDate.getMonth() - date.getMonth();

    const totalMonthsPassed = yearsDiff * 12 + monthsDiff;

    return totalMonthsPassed;
  }

  const date = new Date(termStart);
  const termRemaining = termLength - monthsPassedSince(date);

  const monthlyPrinciple = totalAmount / termLength;
  //console.log(monthlyPrinciple)
  //console.log(Math.round(monthlyPrinciple))
  // monthsPassedSince(date) * (termLength)
  //
  // .toFixed(2);
  //
  //
  //

  function calculateMonthlyPayment(totalAmount, rate, termLength) {
    const monthlyInterestRate = rate / 12 / 100; // Convert annual interest rate to monthly and percentage to decimal
    const numberOfPayments = termLength; // Convert loan term to months

    const monthlyPayment =
      (totalAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    return Math.round(monthlyPayment);
  }
  const monthlyPayment = calculateMonthlyPayment(totalAmount, rate, termLength);

  return isEditing ? (
    <div className="todo-item">
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="What is the task today?"
        />
        <button type="submit" className="todo-btn">
          Set Task
        </button>
      </form>
    </div>
  ) : (
    <div className="debt-item">
      <p>{description}</p>
      <div>
        {Math.round(monthlyPrinciple) * termRemaining} / {totalAmount}
      </div>
      <div>
        {termRemaining} / {termLength} months
      </div>
      <div>
        {monthlyPayment} - {rate}%
      </div>
      <div>
        {(monthlyPayment - monthlyPrinciple).toFixed(2)} lost to interest
      </div>

      <button onClick={handleDebtEdit}>Edit</button>
    </div>
  );
}
export default DebtItem;

//<button onClick={handleDebtEdit}>Edit</button>