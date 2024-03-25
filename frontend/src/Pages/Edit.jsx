import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '../components/Navbar';
import SellPic from '../assets/sell.png';

const Edit = () => {
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [upiid, setUPIId] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [id, setId] = useState('');
    const { objectId } = useParams();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail('');
            }
        });

        // Fetch product details for editing
        fetchProductDetails(objectId);

        return () => unsubscribe();
    }, [objectId]);

    const fetchProductDetails = async (objectId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${objectId}`);
            if (response.ok) {
                const data = await response.json();
                const product = data.product;
                setId(product._id);
                setProductName(product.productName);
                setProductType(product.productType);
                setImageUrl(product.imageUrl);
                setPrice(product.price);
                setDescription(product.description);
                setPhoneNumber(product.phonenumber);
                setUPIId(product.upiid);
            } else {
                console.error('Failed to fetch product details');
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName,
                    productType,
                    imageUrl,
                    price,
                    description,
                    phonenumber,
                    upiid,
                }),
            });

            if (response.ok) {
                console.log('Product updated successfully');
                // Optionally, you can navigate the user to a different page or show a success message.
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleProductTypeChange = (e) => {
        setProductType(e.target.value);
    };

    return (
        <div className="bg-blue-300 font-serif">
            <Navbar />
            <div className=' pt-28'>
                <h1 className='text-center font-semibold md:text-4xl text-xl md:py-4 py-3'>Sell Your Worthable Products</h1>
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 md:pt-10 pt-5 px-5'>
                <div className=' flex justify-center  py-5'>
                    <img className='md:h-96 w-96 md:w-auto pl-4 pt-4 pb-0' src={SellPic} alt="Product" />
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
                                {/* Other input fields for editing */}
                                <div className='flex justify-center'>
                                    <button type="submit" className='border-gray-500 border-2 rounded-lg bg-white px-10 py-2 hover:scale-105 hover:bg-blue-300 font-semibold hover:shadow-2xl mt-3'>
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
