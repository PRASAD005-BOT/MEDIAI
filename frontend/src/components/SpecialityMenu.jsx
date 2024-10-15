import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
            <h1 className='text-3xl font-medium'>Find by Speciality</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto scrollbar-hide'>
                {specialityData.map((item, index) => (
                    <Link
                        to={`/doctors/${item.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105'
                        key={index}
                    >
                        <img className='w-16 sm:w-24 mb-2 transition-transform duration-300 transform hover:scale-110' src={item.image} alt="" />
                        <p className='text-center hover:text-primary transition-colors duration-300'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SpecialityMenu;
