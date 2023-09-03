import React, { useState } from "react";
import SingleExpenseItem from "./SingleExpenseItem";
import NewPurchaseForm from "./NewPurchaseForm"
import axios from "axios";

function SingleExpenses({budget, addPurchase, refreshBudget}) {
    const [budgets, setBudgets] = useState([])
    const [isAddingPurchase, setAddingPurchase] = useState(false)
//
const BASE_URL = "http://localhost:3000";


    function handleAddExpense(resObj) {
        setAddingPurchase(true)
    }
    function handleDoneAdding() {
        setAddingPurchase(false)
    }
//


    


//
//

    async function deletePurchase(id) {
       
        await axios.delete(`${BASE_URL}/api/onetimetransactions/${id}`).then((res) => res.data);
        refreshBudget()
    }

//

    const updateTask = (task, id) => {
        setBudgets(
            budgets.map((todo) =>
                todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
            )
        );
    };
    return (
        <div className="card">
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
            <div>
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
        </div>
    )
}

export default SingleExpenses