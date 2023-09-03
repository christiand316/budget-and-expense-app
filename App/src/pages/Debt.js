import React, {useState, useEffect} from 'react';
//import './styles/Debt.css'
import axios from "axios";
import QuickInfoDebt from '../components/QuickInfoDebt';
import Debts from '../components/Debts'

export function Debt({ group }) {
    const [budget, setBudget] = useState(null)


    const BASE_URL = "http://localhost:3000";
  
    useEffect(() => {
      async function fetchUserData() {
  
        try {
          if (!group) {
            return;
          }
          refreshBudget()
  
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchUserData();
  
    }, [])
    async function refreshBudget() {
        const resBudget = await axios
          .get(`${BASE_URL}/api/budgets/${group.id}`)
          .then((res) => res.data);
    
    
        setBudget(
          resBudget
        )
      }
    
    return (
        <div className='card'>
            <QuickInfoDebt />
            
        </div>
    )
}

//<Debts budget={budget.debt}/>