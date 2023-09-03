import React from "react";


function DebtItem({ description, totalAmount, termLength, termStart, rate}) {

    function monthsPassedSince(date) {
        const currentDate = new Date();
        
        const yearsDiff = currentDate.getFullYear() - date.getFullYear();
        const monthsDiff = currentDate.getMonth() - date.getMonth();
        
        const totalMonthsPassed = yearsDiff * 12 + monthsDiff;
        
        return totalMonthsPassed;
      }
      
      const date = new Date(termStart)
      const termRemaining = termLength- monthsPassedSince(date)

      const monthlyPrinciple = totalAmount / termLength 
      //console.log(monthlyPrinciple)
      //console.log(Math.round(monthlyPrinciple))
      // monthsPassedSince(date) * (termLength)
      //
      // .toFixed(2);
      //
      //
      //

      function calculateMonthlyPayment(totalAmount, rate, termLength) {
        const monthlyInterestRate = (rate / 12) / 100; // Convert annual interest rate to monthly and percentage to decimal
        const numberOfPayments = termLength; // Convert loan term to months
      
        const monthlyPayment = totalAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        
        return Math.round(monthlyPayment);
      }
      const monthlyPayment = calculateMonthlyPayment(totalAmount, rate, termLength)
      
    return (
        <div className="debt-item">
            <p>{description}</p>
            <div>
                {Math.round(monthlyPrinciple)*termRemaining} / {totalAmount}
            </div>
            <div>
                {termRemaining} / {termLength} months
            </div>
            <div>
                {monthlyPayment} - {rate}%
            </div>
            <div>
                {(monthlyPayment-monthlyPrinciple).toFixed(2)} lost to interest
            </div>
            
        </div>
    )
}
export default DebtItem