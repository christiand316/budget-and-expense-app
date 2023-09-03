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

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (isEditing ? (<div className="todo-item">
        <form onSubmit={handleSubmit} className="TodoForm">
            <input type="text" value={value} onChange={handleChange} className="todo-input"/>
            <button type="submit" className='todo-btn'>Set Task</button>
        </form>
    </div>) : (<div className="expense-item">
        <p>${amount}   {description}</p>
        <div className="button-wrapper">
            <button onClick={handleDelete}>Delete</button>
        </div>
    </div>))
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