import React, { useState, useEffect } from 'react';
import Nav from '../components/Navbar';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Buy = () => { 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://artogram-backend.vercel.app/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const productsData = await response.json();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);     
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    navigate('/payments', { state: product });
  };

  return (
    <div className='bg-blue-300'>
      <div className="pt-24 grid grid-cols-1 md:grid-cols-3 pb-10">
        {loading ? ( 
          <Spinner />
        ) : (
          products.map(product => (
            <div key={product._id} className='border-2 border-black transform transition-transform duration-300 hover:scale-105 hover:border-gray-600 rounded-3xl shadow-xl shadow-black m-5 md:m-10 h-5/7 w-96'>
              <div className='w-full p-4 flex justify-center'>
                <img className='h-60 w-80 rounded-xl' alt='card' src={product.imageUrl} />
              </div>
              <hr className='mx-5'/>
              <div className='flex justify-between gap-4'>
                <h1 className='text-xl font-semibold p-4'>Name:<span className='font-light px-3'>{product.productName}</span></h1>
                <h1 className='text-xl font-semibold p-4'>price:₹<span className='font-light'>{product.price}</span></h1>
              </div>
              <div>
                <h1 className='font-semibold px-4 py-2 text-black'>Type:<span className='font-light px-3'>{product.productType}</span></h1>
              </div>
              <div>
                <h1 className='font-semibold px-4 py-2 text-black'>Phone Number:<span className='font-light px-3'>{product.phonenumber}</span></h1>
              </div>
              <div className=' flex justify-between'>
                <div className='py-2 w-72'>
                  <h1 className='font-medium px-4 py-2'>Description:<span className='font-light px-3'>{product.description}</span></h1>
                </div>
                <div className='px-4 py-2 font-semibold'>
                  <button className='bg-green-400 hover:bg-green-500 px-3 py-1 text-xl rounded-xl' onClick={() => handleAddToCart(product)}>Buy</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Buy;
