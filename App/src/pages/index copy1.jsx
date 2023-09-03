import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";

//import { AppProps } from 'next/app';
//import { Login } from "./Login"
import axios from "axios";
import { Home } from "./Home";
import { Debt } from "./Debt";
import { Goals } from "./Goals";

export default function Landing() {
  const [activeComponent, setActiveComponent] = useState("home");
  const [userData, setUserData] = useState({});
  const { data: session } = useSession();

  //replace with api call

  const BASE_URL = "http://localhost:3000";

  const handleNavButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };
  let contentToShow;

  if (activeComponent === "home") {
    if (!userData.budget) {
      <p>Loading...</p>;
    } else {
      contentToShow = (
        <Home
          budgetProp={userData.budget}
          group={userData.group.id}
          addPurchase={addPurchase}
          deletePurchase={deletePurchase}
        />
      );
    }
  } else if (activeComponent === "debt") {
    contentToShow = <Debt budget={budget2.recurringPayment[1]} />;
  } else if (activeComponent === "goals") {
    contentToShow = <Goals />;
  }

  function formatDateToYearMonthDay() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1);
    const day = String(today.getDate());

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  async function addPurchase(addObj) {
    const amountInt = parseInt(addObj.amount, 10);
    const data = {
      budgetId: userData.budget.id,
      description: addObj.description,
      amount: amountInt,
      date: formatDateToYearMonthDay(),
    };

    const entry = await axios.post(`${BASE_URL}/api/onetimetransactions`, data);

    const entireBudget = await axios
      .get(`${BASE_URL}/api/budgets/${userData.group.id}`)
      .then((res) => res.data);

    console.log(entireBudget);
    console.log(userData);
    setUserData((prev) => ({ ...prev, budget: { ...entireBudget, data } }));
  }

  async function deletePurchase(id) {
    await axios.delete(`${BASE_URL}/api/onetimetransactions/${id}`);
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
        const budget = await axios
          .get(`${BASE_URL}/api/budgets/${group.id}`)
          .then((res) => res.data);

        setUserData({
          ...userData,
          user,
          group,
          budget,
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserData();
  }, [session]);

  return (
    <>
      <h1>Next.js Budget App</h1>

      {session ? (
        <>
          <nav>
            <button onClick={() => handleNavButtonClick("home")}>Home</button>
            <button onClick={() => handleNavButtonClick("debt")}>Debt</button>
            <button onClick={() => handleNavButtonClick("goals")}>Goals</button>
            <button onClick={() => signOut()}>Sign out</button>
          </nav>
          {contentToShow}
        </>
      ) : (
        <div>
          <p>Please sign in to access the app.</p>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </>
  );
}

/*
  <button onClick={() => handleTestButton()}>Get user</button>

{userData && <div>${userData?.group?.id}</div>}
{/* @ts-ignore } 
{userData && userData.group && userData.group.map(item => (
  <div key={item.id}>
    Hi, I'm {item.id} owned by {item.ownerId}
  </div>)
)}
*/

/**
 
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
