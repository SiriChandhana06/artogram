import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from '../components/Navbar';
import SellPic from '../assets/sell.png';
import Footer from '../components/Footer';

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
const storage = getStorage(app);

const Sell = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [upiid, setUPIId] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image');
      return;
    }

    try {
      const storageRef = ref(storage, `productsImages/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      setImageUrl(imageUrl);

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          productName,
          productType,
          imageUrl,
          price,
          description,
          phonenumber,
          upiid
        }),
      });

      if (response.ok) {
        alert('Product created successfully');
        setProductName('');
        setProductType('');
        setImage(null);
        setPrice('');
        setDescription('');
        setPhoneNumber('');
        setUPIId('');
        console.log("Image uploaded and data sent to backend successfully.");
      } else {
        alert('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    }
  };

  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="bg-blue-300 font-serif">
      <Navbar />
      <div className=' pt-28'>
        <h1 className='text-center font-semibold md:text-4xl text-xl md:py-4 py-3'>Sell Your worthable Products</h1>
      </div>
      <div className='grid md:grid-cols-2 grid-cols-1 md:pt-10 pt-5 px-5'>
        <div className=' flex justify-center  py-5'>
          <img className='md:h-96 w-96 md:w-auto pl-4 pt-4 pb-0' src={SellPic} />
        </div>
        <div className='md:pl-40 flex justify-center pb-5'>
          <div className=' flex justify-center md:pr-10 md:w-4/5 w-80'>
            <div className='border-2 border-gray-700 bg-blue-200 shadow-lg shadow-black rounded-xl p-4'>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className='text-xl'>Image URL:</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className='px-2 block h-10 w-full mt-1 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  />
                </div>
                <div>
                  <label className='text-xl'>Product Name:</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    className='px-2 block h-10 w-full mt-1 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  />
                </div>
                <div>
                  <label className='text-xl'>Product Type:</label>
                  <select
                    id="productType"
                    name="productType"
                    value={productType}
                    onChange={handleProductTypeChange}
                    required
                    className="px-2 sblock h-10 w-full border-2 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="">Select a product type</option>
                    <option value="Handmade Jewelry">Handmade Jewelry</option>
                    <option value="Handcrafted Pottery">Handcrafted Pottery</option>
                    <option value="Artisanal Textiles">Artisanal Textiles</option>
                    <option value="Handmade Candles">Handmade Candles</option>
                    <option value="Artisanal Soap">Artisanal Soap</option>
                    <option value="Handwoven Baskets">Handwoven Baskets</option>
                    <option value="Handmade Leather Goods">Handmade Leather Goods</option>
                    <option value="Wooden Crafts">Wooden Crafts</option>
                    <option value="Hand-painted Ceramics">Hand-painted Ceramics</option>
                    <option value="Fabric Crafts">Fabric Crafts</option>
                  </select>
                </div>
                <div>
                  <label className='text-xl'>Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className='px-2 sblock h-10 w-full mt-1 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  />
                </div>
                <div>
                  <label className='text-xl'>Price:</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className='px-2 sblock h-10 w-full mt-1 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  />
                </div>
                <div>
                  <label className='text-xl'>Phone Number:</label>
                  <input
                    type="text"
                    value={phonenumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className='px-2 sblock h-10 w-full mt-1 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  />
                </div>
                <div>
                  <label className='text-xl'>UPI Id:</label>
                  <input
                    type="text"
                    value={upiid}
                    onChange={(e) => setUPIId(e.target.value)}
                    required
                    className='px-2 sblock h-10 w-full mt-1 border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  />
                </div>
                <div className='flex justify-center'>
                  <button type="submit" className='border-gray-500 border-2 rounded-lg bg-white px-10 py-2 hover:scale-105 hover:bg-blue-300 font-semibold hover:shadow-2xl mt-3'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sell;