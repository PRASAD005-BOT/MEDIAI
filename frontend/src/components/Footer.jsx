import React from 'react';
import { assets } from '../assets/assets';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'; // Importing icons from react-icons
import './Footer.css'; // Ensure to import the new CSS file

const Footer = () => {
  return (
    <div className='footer-container my-10 p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm'>

        <div className='footer-logo-section'>
          {/* <img className='mb-5 w-40' src={assets.logo} alt="Company Logo" /> */}
          <p className='text-xl font-medium mb-5 text-white'>MADI AI</p>
          <p className='footer-description text-gray-100 leading-6'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className='footer-links-section'>
          <p className='text-xl font-medium mb-5 text-white'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-200'>
            <li className='footer-link'>Home</li>
            <li className='footer-link'>About us</li>
            <li className='footer-link'>Delivery</li>
            <li className='footer-link'>Privacy policy</li>
          </ul>
        </div>

        <div className='footer-contact-section'>
          <p className='text-xl font-medium mb-5 text-white'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-200'>
            <li className='footer-contact'>+91 8639886478</li>
            <li className='footer-contact'>prasadamadiai@gmail.com</li>
          </ul>

          {/* Social Media Icons Section */}
          <div className='social-media-icons flex gap-4 mt-4'>
            <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
              <FaFacebookF className='text-gray-200 hover:text-white transition' size={20} />
            </a>
            <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
              <FaInstagram className='text-gray-200 hover:text-white transition' size={20} />
            </a>
            <a href='https://www.youtube.com' target='_blank' rel='noopener noreferrer'>
              <FaYoutube className='text-gray-200 hover:text-white transition' size={20} />
            </a>
            <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
              <FaTwitter className='text-gray-200 hover:text-white transition' size={20} />
            </a>
          </div>
        </div>

      </div>

      <div className='footer-bottom-section mt-10'>
        <hr className='border-gray-300' />
        <p className='py-5 text-sm text-center text-gray-100 animate-fade-in'>
          Copyright 2024 @ MEDIAI.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
