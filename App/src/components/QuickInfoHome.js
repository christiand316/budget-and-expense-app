import React from "react";

function QuickInfo({budget}) {
    

    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();  // Month is 0 indexed so increment +1 to get the correct month
      }
      
      const currentDate = new Date();
      const dayOfMonth = currentDate.getDate();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      
      const totalDaysInMonth = getDaysInMonth(year, month);


    return (
        <div className="card">
            <div>
                <div>{budget.budgetRemaining} / {budget.budgetAmount} budget left</div>
                <div> {dayOfMonth} / {totalDaysInMonth} days left</div>
                
                <div>
                    <h1>bar visualizing expenses</h1>
                </div>
            </div>
        </div>
    )
}

export default QuickInfo