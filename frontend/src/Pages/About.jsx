import React from 'react';
import img from '../assets/crafting.jpg';
import AboutPic from '../assets/about.png'

const About = () => {
  return (
    <div className=' bg-blue-300 h-screen'>
        <h1 className='pt-10 mx-10 md:text-3xl text-xl uppercase font-bold'>About Us</h1>
        <hr className='border-black mx-10 mb-5'/>
        <div className='md:flex block'>
        <div className=' flex pt-20 mx-20 items-center'>
        <h3 className="md:mx-20 mx-5 text-2xl font-normal text-justify">At the heart of Artogram  lies a dedication to supporting artisans and their unique visions. We believe that behind every handmade craft is a story waiting to be told, a journey of creativity, skill, and passion. Our platform provides a space for these stories to unfold, connecting buyers with the artists behind the art. <br /> Driven by our love for craftsmanship and a desire to empower artisans, we strive to create a nurturing environment where creators can thrive and enthusiasts can discover the joy of owning something truly special. Whether you're an experienced maker or someone who simply appreciates the beauty of handmade goods, we welcome you to explore, connect, and be inspired by the diverse array of treasures available on our platform.</h3>
        <img className='md:h-96 h-80 pb-6' src={AboutPic}/>                                                               

        </div>
        </div>
    </div>
  )
}

export default About;