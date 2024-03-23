import React from 'react';
import Nav from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import About from './About';
import Contact from './Contact';
import HomePic from '../assets/bro1.png'

const Home = () => {
  const navigation = useNavigate()
  return (
    <div className=" font-mono bg-blue-300 h-screen ">
      <div className='overflow-x-hidden font-serif pt-24'>
        <Nav />
        <h1 className='uppercase text-4xl font-bold text-center pt-6 '>Artogram</h1>
        <div className='grid-cols-1 md:flex justify-between items-center space-y-10 px-20 space-x-20'>
          <div className='md:h-2/6 md:w-4/6'>
            <img className='md:h-2/4 ' src= {HomePic}/>
          </div>
          <div className='md:w-full pr-32'>
            <h1 className='font-bold text-3xl py-5'>Artisanal Essence, Handcrafted Connections.</h1>
            <h1 className='md:text-xl font-semilight'>Welcome to Artogram, your ultimate destination for buying and selling exquisite handmade crafts! Discover a world of creativity and artisanal talent as you browse through our curated collection of unique, handcrafted treasures. Whether you're looking to purchase a one-of-a-kind gift or showcase your own artistic creations to a global audience, Artogram is your go-to platform. Join our vibrant community of artisans and enthusiasts today, and let your creativity flourish</h1>
            <div className='flex gap-10 justify-center py-10 pb-10'>
              <button className='border-gray-500 border-2 rounded-lg bg-white px-10 py-2 hover:scale-105 hover:bg-red-500 font-semibold hover:shadow-2xl' onClick={() => { navigation('/buy') }}>Buy →</button>
              <button className='border-gray-500 border-2 rounded-lg bg-white px-10 py-2 hover:scale-105 hover:bg-green-700 font-semibold hover:shadow-2xl' onClick={() => { navigation('/sell') }} >Sell →</button>
            </div>
          </div>
        </div>
        <div className=" shadow-2xl">
        <About />
        </div>
        <div className="">
        <Contact />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home;