import React from 'react';
import { assets } from '../assets/assets';
import './Header.css'; // Ensure you have the CSS file imported

const Header = () => {
    return (
        <div className='header-container flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg px-6 md:px-10 lg:px-20 py-10'>

            {/* --------- Header Left --------- */}
            <div className='header-left md:w-1/2 flex flex-col items-start justify-center gap-4 m-auto'>
                <p className='header-title text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight'>
                    Book Appointment <br /> With Trusted Doctors
                </p>
                <div className='header-description flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    <img className='profile-img w-28' src={assets.group_profiles} alt="Profiles" />
                    <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
                </div>
                <a href='#speciality' className='book-button flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#333] text-sm m-auto md:m-0 animate-button'>
                    Book appointment <img className='arrow-icon w-3' src={assets.arrow_icon} alt="Arrow Icon" />
                </a>
            </div>

            {/* --------- Header Right --------- */}
            <div className='header-right md:w-1/2 relative'>
                <div className="image-container mt-10"> {/* Spacer div */}
                    <img className='header-img w-full md:absolute bottom-0 h-auto rounded-lg shadow-lg' src={assets.header_img} alt="Header" />
                </div>
            </div>
        </div>
    );
}

export default Header;
