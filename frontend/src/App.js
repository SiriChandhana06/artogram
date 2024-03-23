import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Sell from './Pages/Sell';
import Buy from './Pages/Buy';
import Payment from './Pages/payment';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';

function App() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const auth = getAuth(); 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {userEmail && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/sell' element={<Sell />} />
        <Route path='/buy' element={<Buy />} />
        <Route path='/payments' element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
