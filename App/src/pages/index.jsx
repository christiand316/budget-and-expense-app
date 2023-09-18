import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState, useEffect, use } from "react";

//import { AppProps } from 'next/app';
//import { Login } from "./Login"
import axios from "axios";
import { Home } from "./Home";
import { Debt } from "./Debt";
import { Goals } from "./Goals";


export default function Landing() {
  const [activeComponent, setActiveComponent] = useState();
  const [userData, setUserData] = useState({});
  const [budget, setBudget] = useState(null)
  const { data: session } = useSession();

  //replace with api call

  const BASE_URL = "http://localhost:3000";

  const handleNavButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };
  let contentToShow = <p> activecomploading... </p>

  if (activeComponent === "home") {
    contentToShow = <Home group={userData.group} deletePurchase={deletePurchase}/>
  } else if (activeComponent === "debt") {
    contentToShow = <Debt group={userData.group}/>;
  } else if (activeComponent === "goals") {
    contentToShow = <Goals />;
  }

  
  function updateUserData(resBudget){
    resBudget
    return resBudget.data
  }

  async function deletePurchase(id) {
    await axios.delete(`${BASE_URL}/api/onetimetransactions/${id}`)
  }
  useEffect(() => {
    async function fetchUserData() {
   
      try {
        if (!session) {
          return;
        }
        const user = await axios
        .get(`${BASE_URL}/api/users/${session.user.email}`)
        .then((res) => res.data);
        const group = await axios
          .get(`${BASE_URL}/api/groups/${user.id}`)
          .then((res) => res.data);
          
        setUserData({
          ...userData,
          user,
          group,
        });
        setActiveComponent("home")
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();
  },[session])


  if (!session) {
    return(
      <div>
      <p>Please sign in to access the app.</p>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
    )
  }
  return (
    <div className="index">
        <>
          <nav className="nav">
            <button className="nav-item" onClick={() => handleNavButtonClick("home")}>Home</button>
            <button className="nav-item" onClick={() => handleNavButtonClick("debt")}>Debt</button>
            <button className="nav-item" onClick={() => handleNavButtonClick("goals")}>Goals</button>
            <button className="nav-item" onClick={() => signOut()}>Sign out</button>
          </nav>
          {contentToShow} 
        </>
      
    </div>
  )
}
//group={userData.group.id}
// <Home budgetProp={userData.budget} group={userData.group.id} addPurchase={addPurchase} deletePurchase={deletePurchase}/>
         


/**
  {contentToShow} 

          {userData.group ? (
            <Home group={userData.group} deletePurchase={deletePurchase}/>
          ) : (
            <p>Loading...</p>
          )}
  const budget2 = {
    budgetAmount: "6200",
    budgetRemaining: "362",

    oneTimeTransaction: [
      [
        { amount: "15", description: "Arbor Day", date: "12/03" },
        { amount: "5", description: "Coffee", date: "12/05" },
      ],
    ],
    recurringPayment: [
      [
        //Monthly Expenses
        { amount: "3100", description: "Debts" },
        { amount: "510", description: "Groceries" },
        { amount: "365", description: "Utilities" },
        { amount: "105", description: "Phone Bill" },
        { amount: "150", description: "Gas" },
        { amount: "20", description: "Netflix" },
      ],
      [
        // Debts ... Date format "year-mo-da"
        {
          description: "Home Mortgage",
          totalAmount: "240000",
          termStart: "2019-6-1",
          termLength: "360",
          rate: "8",
        },
        {
          description: "Car Loan",
          totalAmount: "24000",
          termStart: "2023-7-1",
          termLength: "72",
          rate: "8.3",
        },
        {
          description: "Credit Card Debt",
          totalAmount: "9200",
          termStart: "2022-1-1",
          termLength: "36",
          rate: "13.4",
        },
      ],
    ],
  };

*/