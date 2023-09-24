import React, { useState } from "react";

function MonthlyExpenseItem({ amount, description, deleteExpense, id }) {
    const [value, setValue] = useState(null)
    const [isEditing, setEditing] = useState(false)

    function handleDelete() {
        deleteExpense(id)
    }

    function handleEdit() {
        setEditing(true)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setEditing(false)
    }



    return (
        isEditing ?
            (<div className="expense-item expense-item-form">
                <form onSubmit={handleSubmit} >
                    <input type="text" value={value} onChange={(e) => {setValue(e.target.value)}} />
                    <button type="submit" className='home-button'>Set Task</button>
                </form>
            </div>
            ) : (
                <div className="monthly-expense-item">
                    <p>${amount}   {description}</p>
                    <div className="button-wrapper">
                        <button onClick={handleDelete}>Delete</button>
                    </div>
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