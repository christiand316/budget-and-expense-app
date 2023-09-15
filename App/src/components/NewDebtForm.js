import React, {useState} from 'react'

function NewDebtForm({addDebt, handleDoneAdding}) {
    const [costValue, setCostValue] = useState('')
    const [termValue, setTermValue] = useState('')
    const [lengthValue, setlengthValue] = useState('')
    const [rateValue, setRateValue] = useState('')
    const [nameValue, setNameValue] = useState('')

    const [selectedMonthYear, setSelectedMonthYear] = useState('');
    const [formattedDate, setFormattedDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        const resObj = {
            description: nameValue,
            rate: rateValue,
            startTerm: formattedDate,
            totalTerm: lengthValue,
            totalAmount: costValue

        }
        console.log(termValue)
        addDebt(resObj)
        handleDoneAdding(false)
    }

    const handleCostChange = (e) => {
        setCostValue(e.target.value)
    }
    const handleItemChange = (e) => {
        setTermValue(e.target.value)
    }
    const handleLengthChange = (e) => {
        setlengthValue(e.target.value)
    }
    const handleRateChange = (e) => {
        setRateValue(e.target.value)
    }
    const handleNameChange = (e) => {
        setNameValue(e.target.value)
    }

    const handleTermChange = (e) => {
        const inputMonthYear = e.target.value;
        setSelectedMonthYear(inputMonthYear);
    
        // Split the input value into year and month parts
        const [year, month] = inputMonthYear.split('-');
    
        // Check if the month is less than 10 and remove the leading zero if present
        const formattedMonth = parseInt(month, 10) < 10 ? month.substring(1) : month;
    
        // Construct the formatted date with a zero-prefixed or non-zero-prefixed month
        const formatted = `${year}-${formattedMonth}-1`;
    
        setFormattedDate(formatted);
      };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            
        <input type="text" value={nameValue} onChange={handleNameChange} className="todo-input" placeholder='Debt description' />
        <input type="text" value={costValue} onChange={handleCostChange} className="todo-input" placeholder='Total amount' />
        <input type="month" value={selectedMonthYear} onChange={handleTermChange} className="todo-input" placeholder='Start of term' />
        <input type="text" value={lengthValue} onChange={handleLengthChange} className="todo-input" placeholder='Length of term in months' />
        <input type="text" value={rateValue} onChange={handleRateChange} className="todo-input" placeholder='Interest rate' />
        <button type="submit" className='todo-btn'>+</button>
      </form>
    )
}

export default NewDebtForm

/**
 *    description: string;
    totalAmount: number;
    rate: number;
    budgetId: string;
    startTerm: string;
    totalTerm: number;
    
 */