import React, {useState} from 'react'

function NewPurchaseForm({addPurchase, handleDoneAdding}) {
    const [costValue, setCostValue] = useState('')
    const [itemValue, setItemValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const resObj = {
            description: itemValue,
            amount: costValue
        }
        addPurchase(resObj)
        handleDoneAdding(false)
        //addTodo(value)
        //setValue('')
    }
    const handleCostChange = (e) => {
        setCostValue(e.target.value)
    }
    const handleItemChange = (e) => {
        setItemValue(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
        <input type="text" value={costValue} onChange={handleCostChange} className="todo-input" placeholder='Cost' />
        <input type="text" value={itemValue} onChange={handleItemChange} className="todo-input" placeholder='Item' />
        <button type="submit" className='todo-btn'>+</button>
      </form>
    )
}

export default NewPurchaseForm