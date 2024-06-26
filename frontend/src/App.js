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
import Spinner from './components/Spinner';
import Dashboard from './Dashboard';
import Edit from './Pages/Edit';

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const timer = setTimeout(() => setLoading(false), 3000);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
      clearTimeout(timer);
      setLoading(false);
    });

    return () => {
      clearTimeout(timer); // Clear the timer when the component unmounts
      unsubscribe();
    };
  }, []);

  if (loading) {
    // Show spinner while loading
    return <Spinner />;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={userEmail ? <Home/> : <Signup/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/sell' element={<Sell />} />
        <Route path='/buy' element={<Buy />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/payments' element={<Payment />} />
        <Route path='/editpost' element={<Edit />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
