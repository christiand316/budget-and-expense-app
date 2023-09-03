import React, { useState } from 'react';
import { Login } from "/Login"

import { Home } from "/Home"
import { Debt } from "/Debt"
import { Goals } from "/Goals"

function App123() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)

  const [activeComponent, setActiveComponent] = useState(null);


  const budget = {
    budgetAmount: '6200',
    budgetRemaining: '362',

    oneTimePayments: [
      [
        {amount: '15', description: 'Arbor Day', date: '12/03'},
        {amount: '5', description: 'Coffee', date: '12/05'}
      ],
    ],
    recurringPayment: [
      [ //Monthly Expenses
        {amount: '3100', description: 'Debts'}, 
        {amount: '510', description: 'Groceries'},
        {amount: '365', description: 'Utilities'},
        {amount: '105', description: 'Phone Bill'},
        {amount: '150', description: 'Gas'},
        {amount: '20', description: 'Netflix'}
      ],
      [ // Debts ... Date format "year-mo-da"
        {description: 'Home Mortgage', totalAmount:'240000', termStart: '2019-6-1', termLength: '360', rate: '8'},
        {description: 'Car Loan', totalAmount:'24000', termStart: '2023-7-1', termLength: '72', rate: '8.3'},
        {description: 'Credit Card Debt', totalAmount:'9200', termStart: '2022-1-1', termLength: '36', rate: '13.4'}
      ]
    ]
  }



  const handleNavButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };


  const updateBudget = (req, target, obj) => {
    // make api calls\
    //
    // make api will return updated budget... potential optimization would be changing cached budget object.
    const budget = 'apibudgetres'
    setCurrentUser({
      ...currentUser,
      budget: { budget }
    })
  }

  let contentToShow;
  if (activeComponent === 'home') {
    contentToShow =  <Home currentUser={currentUser} updateBudget={updateBudget} />
  } else if (activeComponent === 'debt') {
    contentToShow = <Debt budget={budget.recurringPayment[1]}/>;
  } else if (activeComponent === 'goals') {
    contentToShow = <Goals />;
  }

  const handleLogin = (username, password) => {
    // make an API call to authenticate the user
    // ...
    // if (api approves)  setIsAuthenticated(true)  
    // else flash bad creds
    setIsAuthenticated(true);
    handleNavButtonClick('home')

    const key = 'hypotheticalreturnedkey'
    const budget = 'returnedbudgetvalue'
    setCurrentUser({
      username: { username },
      key: { key },
      budget: { budget }
    })
  };
  const handleSignup = (username, password) => {
    // make an API call to authenticate the user
    // ...
    // if (api approves aka user is unique)
    // else flash invalid creds
    setIsAuthenticated(true);
    handleNavButtonClick('home')
  };

  const handleLogout = () => {
    // make an API call to logout the user
    // ...

    setIsAuthenticated(false);
    setCurrentUser(null)
  };





  if (!isAuthenticated) {
    return (
      <container>
        <nav>
        <button onClick={() => handleNavButtonClick('home')}>Home</button>
        <button onClick={() => handleNavButtonClick('debt')}>Debt</button>
        <button onClick={() => handleNavButtonClick('goals')}>Goals</button>
          <button type='button' onClick={handleLogout}>Logout</button>
        </nav>
        {contentToShow}
      </container>
    )
  } else {
    return <Login handleLogin={handleLogin} handleSignup={handleSignup} />
  }

}

export default App123;




/**
 *
 *   return (

    <div>



        {loggedInUser ? (
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/Dashboard">Home</Link>
                </li>
                <li>
                  <Link to="/Debt">Debt</Link>
                </li>
                <li>
                  <Link to="/Goals">Goals</Link>
                </li>
              </ul>
            </nav>

            <p>Welcome</p>
          </div>
        ) : (
          <div>
            <h1>YOU ARENT LOGGED IN</h1>
            redirect("/login")
          </div>
        )}
       <Routes>
         <Route path="/login" element={<Login handleLogin={handleLogin} />} />

         <Route path='/Home' element={ <Home /> } />
         <Route path='/Debt' element={ <Debt /> } />
         <Route path='/Goals' element={ <Goals /> } />
      </Routes>

      {loggedInUser && <p>Welcome, {loggedInUser}!</p>}

    </div>
  );


 */
//  <Login handleLogin={handleLogin} />
/**
 *   <Routes>

        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>


          <Route path="/login" >
            <Login handleLogin={handleLogin} />
            </Route>


        {loggedInUser && <p>Welcome, {loggedInUser}!</p>}
      </Routes>
 *
 */



//<Route path="/" element={<Login />} />
/*
const [loggedInUser, setLoggedInUser] = useState(null);

const handleLogin = (user) => {
  setLoggedInUser(user);
};

const handleSignup = (user) => {
  // Perform signup logic and set the logged-in user
  setLoggedInUser(user);
};
console.log(loggedInUser)
return (
  <Routes>
     {loggedInUser ? (
      <p>Welcome, {loggedInUser}!</p>
    ) : (
    <Route path="/" element={<Login />} />
    )}
  </Routes>
);
*/