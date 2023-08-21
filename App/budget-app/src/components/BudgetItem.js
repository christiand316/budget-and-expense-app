import React from "react";
import '../styles/BudgetItem.css'

import { currencyFormatter } from "../utilities";

function BudgetItem({name, amount}) {
    return (
        <div className="budget-item">
            <div className="budget-item-values">
                <div className="budget-item-name">{name}</div>
                <div className="budget-item-amount">{currencyFormatter.format(amount)}</div>
            </div>

            <div>

            </div>
        </div>
    )
}

export default BudgetItem