import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Loginpage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://artogram-backend.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, password })
      });

      if (response.ok) {  
        const data = await response.json();
        console.log(response);
        window.localStorage.setItem('authenticated', true);
        console.log(isAuthenticated)
        isAuthenticated? window.location.href = '/' :navigate('/login');
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again.');
    }
  };
  return (
    <div id="loginpage" className="px-96 py-16 bg-gray-300 h-screen">
      <div className="border-2 bg-blue-200 py-5 mx-36 rounded-3xl border-black shadow-lg shadow-black">
        <h1 className="flex justify-center font-bold text-4xl pt-10">LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div id="1username" className="flex justify-center pt-16">
            <input
              className="border-2 border-black rounded-xl pl-4 h-10 w-96"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div id="1password" className="flex justify-center pt-16">
            <input
              className="border-2 border-black rounded-xl pl-4 h-10 w-96"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center pt-12 pb-2">
            <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded-2xl">Login</button>
          </div>
          {error && <p className="flex justify-center text-red-800">{error}</p>}
          <div className="flex justify-center capitalize text-lg pt-4 pb-20 font-semibold">
            Don't have an account? <a href="/signup" className="hover:text-blue-500">Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Loginpage;
