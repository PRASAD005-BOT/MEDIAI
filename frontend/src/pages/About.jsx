import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion'; // Importing framer-motion for animations

const About = () => {
  return (
    <div className='max-w-7xl mx-auto px-4'>
      <div className='text-center text-3xl pt-10 text-[#707070] font-serif'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <motion.img
          className='w-full md:max-w-[360px] transition-transform duration-500 hover:scale-105'
          src={assets.about_image}
          alt="About Us"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 font-sans'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
         <p>Welcome to Apollo Hospital, your trusted partner in managing your healthcare needs conveniently and efficiently. At Apollo Hospital, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
         <p>Apollo Hospital is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Apollo Hospital is here to support you every step of the way.</p>
         <b className='text-gray-800'>Our Vision</b>
         <p>Our vision at Apollo Hospital is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
</motion.div>
      </div>

      <div className='text-2xl my-4 font-serif'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        {['EFFICIENCY', 'CONVENIENCE', 'PERSONALIZATION'].map((item, index) => (
          <motion.div
            key={index}
            className='border border-gray-300 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }} // Delay for staggered effect
          >
            <b>{item}:</b>
            <p>
              {item === 'EFFICIENCY' && 'Streamlined appointment scheduling that fits into your busy lifestyle.'}
              {item === 'CONVENIENCE' && 'Access to a network of trusted healthcare professionals in your area.'}
              {item === 'PERSONALIZATION' && 'Tailored recommendations and reminders to help you stay on top of your health.'}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default About;
