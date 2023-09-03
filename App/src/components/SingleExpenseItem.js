import React, { useState } from "react";

function SingleExpenseItem({amount, description, date, id, deletePurchase}) {
    const [value, setValue] = useState(null)
    const [isEditing, setEditing] = useState(false)

    function handleDelete() {
      
        deletePurchase(id)
    }



    return (
<div className="todo-item">
        <p>${amount} {description} {date}</p>
        <div className="button-wrapper">
            <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
    )
}

export default SingleExpenseItem