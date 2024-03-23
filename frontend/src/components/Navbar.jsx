import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const navigate = useNavigate();
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

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className='bg-transparent top-0 z-50 fixed w-full backdrop-filter backdrop-blur-lg shadow-2xl bg-opacity-20'>
      <div id='nav' className='flex'>
        <div>
          <h1 className='pt-6 md:pl-20 px-5 font-bold text-2xl text-black'>Artogram</h1>
        </div>
        <div className='pl-96'>
          <div className='pl-96'>
            <div className='pl-60'>
              <div className='flex gap-4'>
                <h3 id='un' className='font-light text-xl pt-6 text-black'>{userEmail || 'Guest'}</h3>
                <button id='p' className='h-20' onClick={handleProfileClick}>
                  <img
                    id='n'
                    alt='profile'
                    className='h-10 w-10 rounded-full'
                    src='https://e7.pngegg.com/pngimages/782/114/png-clipart-profile-icon-circled-user-icon-icons-logos-emojis-users-thumbnail.png'
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
