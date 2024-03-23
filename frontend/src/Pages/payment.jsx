import React from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Payment = () => {
  const location = useLocation();
  const product = location.state;

  const handleWeb2Payment = async () => {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const email = user.email;
          generatePaymentLink(email);
        } else {
          console.log('No user signed in');
        }
      });
    } catch (error) {
      console.error('Error generating payment link:', error);
    }
  };
  
  const generatePaymentLink = async (email) => {
    try {
      const response = await fetch('http://localhost:5000/generate-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: product.price * 100,
          currency: 'INR',
          description: product.productName,
          customer: {
            contact: product.phonenumber,
            email: email,
          },
          notes: {
            productNo: product.productNo 
          }
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate payment link');
      }
  
      const paymentLinkData = await response.json();
      const paymentLink = paymentLinkData.paymentLink.short_url;
      window.location.href = paymentLink;
    } catch (error) {
      console.error('Error generating payment link:', error);
    }
  };
  
  
  const handleWeb3Payment = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          console.log('Connected to MetaMask');
          console.log('MetaMask accounts:', accounts);
        })
        .catch(error => {
          console.error('MetaMask connection error:', error);
          alert('Please connect MetaMask to proceed with payment.');
        });
    } else {
      alert('MetaMask is not installed. Please install MetaMask to proceed with payment.');
    }
  };

  return (
    <div className="bg-blue-300 h-screen">
      <Navbar />
      <div className="container mx-auto py-8 pt-24">
        <h1 className="text-3xl font-semibold mb-4 text-center">Payment Details</h1>
        <div className='flex justify-center my-6'>
        <div className="bg-white shadow-md w-96 flex rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">{product.productName}</h2>
            <p className="text-gray-600 mb-4"><span className="font-semibold">Price:</span> ₹{product.price}</p>
            <p className="text-gray-600 mb-4"><span className="font-semibold">Type:</span> {product.productType}</p>
            <p className="text-gray-600 mb-4"><span className="font-semibold">Description:</span> {product.description}</p>
          </div>
        </div>
        </div>
        <div className="flex justify-center mt-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleWeb2Payment}>Pay with Razorpay</button>
          <p className='px-2'>or</p>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleWeb3Payment}>Pay with Crypto (MetaMask)</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
