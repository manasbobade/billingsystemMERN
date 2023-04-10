import './App.css';
import Mainpagebody from './components/mainpagebody';
import Login from './components/Login.component'
import SignUp from './components/Signup.component'
import Invoicedetails from './components/Invoicedetails';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'



function App() {
    const isLoggedIn=window.localStorage.getItem("loggedIn");
  return (
   <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={isLoggedIn==="true"?<Invoicedetails />:<Mainpagebody />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/Invoicedetails" element={<Invoicedetails />} />
        </Routes>
      </Router>

    </div>

  );
}

export default App;
