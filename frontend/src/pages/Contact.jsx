import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-4 md:px-16">
      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px] rounded-lg shadow-lg transition-transform transform hover:scale-105' src={assets.contact_image} alt="Contact Us" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className='text-gray-500'>1-121,  Norway Station <br /> Hyderabad 409, Telangana, India</p>
          <p className='text-gray-500'>Tel: +91 86399 4678<br /> Email: <a href="mailto:apollo@gmail.com" className="text-primary hover:underline">apollo@gmail.com</a></p>
          <p className='font-semibold text-lg text-gray-600'>CAREERS AT APOLLO</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <a href="/careers" className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300 rounded-full text-center'>
            Explore Jobs
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
