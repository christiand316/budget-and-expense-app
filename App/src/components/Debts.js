import React, { useState } from "react";
import DebtItem from "./DebtItem";

function Debts({ budget }) {


    return (
        <div>
            {budget.map((item, index) => (
                <DebtItem
                    totalAmount={item.totalAmount}
                    description={item.description}
                    termLength={item.termLength}
                    termStart={item.termStart}
                    rate={item.rate}
                    id={item.id}
                    key={index} />
            ))}
        </div>
    )
}
export default Debts