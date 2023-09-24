import React, { useState } from "react";
import SingleExpenseItem from "./SingleExpenseItem";
import NewPurchaseForm from "./NewPurchaseForm"
import axios from "axios";


const BASE_URL = "http://localhost:3000";

function SingleExpenses({budget, addPurchase, refreshBudget, deletePurchase}) {
    const [budgets, setBudgets] = useState([])
    const [isAddingPurchase, setAddingPurchase] = useState(false)
//


    function handleAddExpense() {
        setAddingPurchase(true)
    }
    function handleDoneAdding() {
        setAddingPurchase(false)
    }
//


    


//
//


//

   
    return (
        <div className="home-card">
            {isAddingPurchase ? (
                <>
                <NewPurchaseForm addPurchase={addPurchase} handleDoneAdding={handleDoneAdding}/>
                </>
            ) : (
                <>
                <h1>Purchases</h1> <button className="add-expense" onClick={handleAddExpense}>+</button>
                </>
            )
            }      
                {budget.map((item, index) => (
                    <SingleExpenseItem 
                    amount={item.amount}
                    description={item.description}
                    date={item.date}
                    id={item.id} 
                    key= {index}
                    deletePurchase={deletePurchase} />
                ))}
        </div>
    )
}

export default SingleExpenses