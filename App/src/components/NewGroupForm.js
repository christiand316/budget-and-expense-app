import React, { useState } from 'react'

function NewGroupForm({ addGroup, handleDoneAdding, ownerId }) {
    const [nameValue, setNameValue] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const resObj = {
            name: nameValue,
            ownerId: ownerId
        }
        addGroup(resObj)
        handleDoneAdding(false)
        //addTodo(value)
        //setValue('')
    }

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input type="text" value={nameValue} onChange={(e) => {setNameValue(e.target.value)}}  placeholder='Budget name' />
            <button type="submit">+</button>
        </form>
    )
}

export default NewGroupForm