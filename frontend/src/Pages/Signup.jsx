import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [useremail, setUserEmail] = useState('');
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const firebaseConfig = {
    apiKey: "AIzaSyAJj9GuKhTUsaUrsQPma2w-297iVzcYsxM",
    authDomain: "artogram-7af74.firebaseapp.com",
    projectId: "artogram-7af74",
    storageBucket: "artogram-7af74.appspot.com",
    messagingSenderId: "408075607858",
    appId: "1:408075607858:web:691180574cf2b506e6c12b",
    measurementId: "G-GB8DNH9J5Y"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in: ", user);
        setUser(user);
        setUserEmail(user.email);
      } else {
        console.log("No user signed in");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const connectWallet = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Sign-in result: ", result);
      setUser(result.user);
      setUserEmail(result.user.email);
      window.location.href = '/';
      toast.success("Logged in Successfully");
    } catch (error) {
      console.error("Error occurred during sign-in:", error.message);
      toast.error("Sign-in failed: " + error.message);
    }
  };

  const disconnectWallet = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserEmail(null);
      toast.error("Logged Out!");
    } catch (error) {
      console.error('Logout error:', error.message);
      toast.error("Logout failed: " + error.message);
    }
  };

  const validation = () => {
    let isValid = true;

    if (name === "") {
      setNameError("Name cannot be Empty");
      toast.warning('Name cannot be Empty');
      isValid = false;
    } else {
      setNameError("");
    }

    const emailPattern = /^[^\s@]+\@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid Email Address");
      toast.warning('Invalid Email Address');
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      toast.warning('Password must be at least 8 characters');
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords Do Not Match");
      toast.warning('Passwords Do Not Match');
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSignup = async () => {
    if (validation()) {
      try {
        const response = await fetch(' https://artogram-backend.vercel.app/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });
        console.log(response);
        const data = await response.json();
        if (response.ok) {
          toast.success('Signup successful! Please log in.');
          window.localStorage.setItem('authenticated', true);
          window.location.href = '/login';
        } else {
          toast.error('Signup failed: ' + data.message);
        }
    
      } catch (error) {
        console.error('Error signing up:', error);
        toast.error('Error signing up. Please try again.');
      }
    }
  }
  
  return (
    <div>
    <div id="signup" className='md:px-96 py-10 pt-24 bg-gray-300'>
      <div className='border-2 bg-blue-200 py-5 mx-5 rounded-3xl border-black shadow-lg shadow-black'>
        <h1 className="flex justify-center font-bold text-xl md:text-4xl pt-16">SIGNUP</h1>
        <form className="p-5">
          <div className="flex justify-center pt-10">
            <input
              id="name"
              className="border-2 border-black rounded-xl pl-4 h-10 md:w-96 w-80"
              type="text"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
              />
          </div>
          <p className="text-red-800 flex justify-center">{nameError}</p>
          <div className="flex justify-center pt-10">
            <input
              id="email"
              className="border-2 border-black rounded-xl pl-4 h-10 md:w-96 w-80"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <p className="text-red-800 flex justify-center">{emailError}</p>
          <div className="flex justify-center pt-10 ">
            <input
              id="password"
              className="border-2 border-black rounded-xl pl-4 h-10 md:w-96 w-80"
              type="password"
              placeholder="Create Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <p className="text-red-800 flex justify-center">{passwordError}</p>
          <div className="flex justify-center pt-10">
            <input
              id="confirmpassword"
              className="border-2 border-black rounded-xl pl-4 h-10 md:w-96 w-80"
              type="password"
              placeholder="Confirm Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
          </div>
          <p className="text-red-800 flex justify-center">{confirmPasswordError}</p>
          <div className="flex justify-center pt-10 pb-2 ">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 p-2 rounded-2xl"
              onClick={handleSignup}
              >
              Signup
            </button>
          </div>
          <hr className="border-1 mx-16 border-black" />
          <div className='flex justify-center pt-4 pb-2'>
            {user ? (
              <button
              type="button"
              className='bg-red-500 hover:bg-red-600 items-center text-black p-2 font-semibold rounded-xl'
              onClick={disconnectWallet}
              >
                Logout
              </button>
            ) : (
              <button
              type="button"
              className='bg-red-500 hover:bg-red-600 items-center text-black p-2 font-semibold rounded-xl'
              onClick={connectWallet}
              >
                Sign Up with Google
              </button>
            )}
          </div>
          <div className="flex justify-center capitalize pt-2 pb-2 font-semibold">
            Already have an account? <a href="/login" className="hover:text-blue-500">Login</a>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            />
        </form>
      </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
);
};

export default Signup;
