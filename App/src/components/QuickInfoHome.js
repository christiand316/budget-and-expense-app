import React, { useState } from "react";
import axios from "axios";

import HomeChart from "./home/HomeChart";
const BASE_URL = "http://localhost:3000";

function QuickInfo({ budget, budgetUsed }) {
    const [value, setValue] = useState(null)
    const [isEditing, setEditing] = useState(false)




    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();  // Month is 0 indexed so increment +1 for correct month
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();


    const totalDaysInMonth = getDaysInMonth(year, month);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            groupId: budget.groupId,
            budgetAmount: parseInt(value)
        }

        await axios.patch(`${BASE_URL}/api/budgets/${budget.id}`, data)
        setEditing(false)
    }

    return (
        isEditing ? (
            <div className="quickinfo-item quickinfo-item-form" >
                <form onSubmit={handleSubmit} >
                    <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} />
                    <button type="submit" className='home-button'>Set Task</button>
                </form>
            </div>
        ) : (
            <div className="quickinfo-card home-card">
                <div className="quickinfo-info-container">


                    <div className="quickinfo-subcontainer">
                        <div className="quickinfo-highlighted">
                            <div className="primary-value">${(budget.budgetAmount - (budgetUsed.oneTimeTransactionTotal+budgetUsed.monthlyExpenseTotal)).toLocaleString()}.00 </div>
                            <div className="secondary-value"> /{budget.budgetAmount.toLocaleString()}.00</div>
                        </div>
                        <div className="primary-value-text">budget left</div>
                    </div>

                    <div className="quickinfo-subcontainer">
                        <div className="quickinfo-highlighted">
                            <div className="primary-value"> {totalDaysInMonth - dayOfMonth} </div>
                            <div className="secondary-value month-value"> /{totalDaysInMonth} </div>
                        </div>
                        <div className="primary-value-text">days left in {monthNames[month]}</div>

                    </div>

                    <div className="quickinfo-subcontainer setting-cog" onClick={(e) => { setEditing(true) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                    </div>

                </div>
                <div className="home-quickinfo-chart">
                    <HomeChart budget={budget} budgetUsed={budgetUsed} />
                </div>

            </div >)


    )
}

export default QuickInfo