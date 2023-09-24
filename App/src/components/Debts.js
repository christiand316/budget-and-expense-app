import React, { useState } from "react";
import DebtItem from "./DebtItem";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

function Debts({ budget, refreshBudget }) {
    console.log(budget)
    if ( budget.length === 0) {
        return (
            <div className="missing-info">
            <h3> Please add your debt </h3>
            </div>
        )
    }
    return (
        <>
            {budget.map((item, index) => (
                <DebtItem
                    totalAmount={item.totalAmount}
                    description={item.description}
                    totalTerm={item.totalTerm}
                    startTerm={item.startTerm}
                    rate={item.rate}
                    id={item.id}
                    key={index} 
                
                    budgetId={item.budgetId}
                    refreshBudget={refreshBudget}
                    />
            ))}
        </>
    )
}
export default Debts