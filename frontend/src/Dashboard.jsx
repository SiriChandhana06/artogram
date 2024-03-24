import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
    const [myPosts, setMyPosts] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail('');
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                if (userEmail) {
                    const response = await fetch('http://localhost:5000/api/posts/email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: userEmail })
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        setMyPosts(data.posts);
                    } else {
                        console.error('Failed to fetch posts for the current user');
                        // Handle error
                    }
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                // Handle error
            }
        };

        fetchPosts();
    }, [userEmail]);

    const handleDeletePost = async (postId, userEmail) => {
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                },
                body: JSON.stringify({ userEmail })
            });
            if (response.ok) {
                setMyPosts(myPosts.filter(post => post._id !== postId));
            } else {
                console.error('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    

    return (
        <div className='bg-blue-300'>
            <h2 className='pt-24 font-semibold text-4xl text-center'>My Posts</h2>
            <ul>
                {myPosts.map(post => (
                    <li key={post._id} className='border-2 p-3 border-black transform transition-transform duration-300 hover:scale-105 hover:border-gray-600 rounded-3xl shadow-xl shadow-black m-10 h-5/7 w-96'>
                        <div className='w-full p-4 flex justify-center'>
                            <img className='h-60 w-80 rounded-xl' alt='card' src={post.imageUrl} />
                        </div>
                        <h3 className='text-xl font-semibold p-4'>{post.productName}</h3>
                        <p className='px-4'><strong>Product Type:</strong> {post.productType}</p>
                        <p className='px-4'><strong>Description:</strong> {post.description}</p>
                        <p className='px-4'><strong>Price:</strong> ₹{post.price}</p>
                        <p className='px-4'><strong>Phone Number:</strong> {post.phonenumber}</p>
                        <p className='px-4'><strong>UPI Id:</strong> {post.upiid}</p>
                        <button className='bg-red-500 text-white px-3 py-1 rounded-md mt-2 ml-4' onClick={() => handleDeletePost(post._id)}>Delete Post</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
