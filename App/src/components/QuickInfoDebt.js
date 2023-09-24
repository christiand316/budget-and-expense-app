import React, { useState } from "react"
import DebtChart from '../components/DebtChart'
import NewDebtForm from "./NewDebtForm"
import DebtChartLegend from "../components/DebtChartLegend"

function QuickInfoDebt({ refreshBudget }) {
    const [isAddingDebt, setAddingDebt] = useState(false)

    function handleAddDebt(resObj) {
        setAddingDebt(true)
    }
    function handleDoneAdding() {
        setAddingDebt(false)
    }

    async function addDebt(addObj) {
        try {
            const data = {
                budgetId: budget.id,
                description: addObj.description,
                rate: addObj.rate,
                startTerm: addObj.startTerm,
                totalTerm: addObj.totalTerm,
                totalAmount: parseInt(addObj.totalAmount),
            }
            console.log(data)
            await axios.post(`${BASE_URL}/api/debt`, data)

            refreshBudget()
        } catch (error) {
            setAddingDebt(false)
            console.error(error)
        }
    }

    return (
        <div className="quickinfo-debt-card">
        {isAddingDebt ? (
            <>
                <NewDebtForm addDebt={addDebt} handleDoneAdding={handleDoneAdding} />
            </>
        ) : (
            <div>
                <div className="quickinfo-debt quickinfo-debt-form">
                    <div className="debt-chart">
                        <DebtChart />
                    </div>

                    <div className="debt-helpers-container">
                        <div className="legend-debt">
                            <DebtChartLegend />
                        </div>
                        <div>
                            <button className="add-debt" onClick={handleAddDebt}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-square"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M8 12h8" /><path d="M12 8v8" /></svg></button>
                        </div>
                    </div>

                    <div>

                    </div>
                </div>
            </div>
        )}
        </div>
    )
}

export default QuickInfoDebt