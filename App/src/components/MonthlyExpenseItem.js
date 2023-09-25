import React, { useState } from "react";

function MonthlyExpenseItem({ amount, description, deleteExpense, id, canDelete }) {
    const [value, setValue] = useState(null)
    const [isEditing, setEditing] = useState(false)



    const handleSubmit = (e) => {
        e.preventDefault()
        setEditing(false)
    }



    return (
        canDelete ? (
            <div className="monthly-expense-item">
            <p>${amount.toLocaleString()}   {description}</p>

            <div className="expense-item-delete" onClick={(e) => { deleteExpense(id) }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </div>
        </div>
            ) : (
                
                <div className="monthly-expense-item">
                    <p>${amount.toLocaleString()}   {description}</p>

               
                </div>
            )
    )
}

export default MonthlyExpenseItem


/*

    function handleDelete() {
        deleteTodo(task.id)
    }

    function handleEdit() {
        setEditing(true)
        updateTask(task.id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateTask(value, task.id);
        setEditing(false)
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }
*/