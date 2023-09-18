import React, { useState } from "react";
import DebtItem from "./DebtItem";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

function Debts({ budget, refreshBudget }) {

    return (
        <div>
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
        </div>
    )
}
export default Debts