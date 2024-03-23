import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import ContactPic from '../assets/contact.png'

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_2onmr4k', 'template_pxuf5q9', form.current, '2E3UzQ9GieXS_NXxN')
      .then((result) => {
          console.log(result.text);
          alert('Message Sent');
      }, (error) => {
          console.log(error.text);
      });
      
  };

  return (    
      <div>
        <section class="py-20 bg-blue-300 h-screen">
          <div class="">
            <div class=" w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-1 lg:px-6">
              <h2 class="mb-2 md:text-3xl text-xl font-bold text-black uppercase text-left ml-5 md:ml-5">Contact us</h2>
              <hr className='border-black mx-7' />
            </div>
            <div class=" w-full mx-20 flex space-x-20 pt-16">
              <div className="">
                <img className=' h-96 mx-20 w-auto' src={ContactPic} alt="" />
              </div>
              <div className=" pl-32">
              <form ref={form} onSubmit={sendEmail}>
                <div class=" mb-6" data-te-input-wrapper-init>
                <label
                    class="pointer-events-none text-xl py-2 text-left ml-5 md:ml-0 top-0  leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    for="exampleInput90">Name
                  </label>
                  <input type="text" name="user_name" required
                    class="peer block min-h-[auto] mt-2 md:w-96 w-80 text-left ml-5 md:ml-0 rounded-lg border-black bg-white text-black border-2 bg-transparent py-3 px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                     placeholder="Name" /> 
                </div>
                <div class=" mb-6" data-te-input-wrapper-init>
                  <label
                    class="pointer-events-none text-left my-3 text-xl ml-5 md:ml-0 top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                    for="exampleInput91">Email address
                  </label>
                  <input type="email" name="user_email" required
                    class="peer block  text-left ml-5 md:w-full w-80 py-3 my-2 md:ml-0 min-h-[auto] rounded-lg bg-white border-black border-2 bg-transparent px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                     placeholder="Email address" />
                </div>
                <div class="" data-te-input-wrapper-init>
                  <label for="exampleFormControlTextarea1"
                    class="pointer-events-none text-left text-xl ml-5 md:ml-0 top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Message</label>
                    <textarea name="message" required
                    class="peer block min-h-[auto] w-80 md:w-full my-3 rounded-lg border-black border-2 bg-white text-left ml-5 md:ml-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlTextarea1" rows="3" placeholder="Your message"></textarea>
                </div>
                <div className=" flex justify-end">
                <button type="submit" value="Send" data-te-ripple-init data-te-ripple-color="light"

                  class="border-gray-500 border-2 rounded-lg bg-white px-10 py-2 hover:scale-105 hover:bg-red-300 font-semibold hover:shadow-2xl">Send →</button>
                </div>
              </form>
              </div>
            </div>
          </div>
        </section>
      </div>

   
   
  )
}


export default Contact