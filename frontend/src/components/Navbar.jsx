import React, { useContext, useState } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets'; // Ensure this import is correct
import './Navbar.css'; // Make sure this import is correct

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD] bg-gradient-to-r from-blue-400 to-purple-500'>
      <div onClick={() => navigate('/')} className='w-44 cursor-pointer flex justify-center items-center'>
        <img 
          src='https://t4.ftcdn.net/jpg/02/30/08/65/240_F_230086513_IEzdXmKEseTwFIz4vxmGUbnfHU45jclr.jpg' 
          alt="Apollo Logo" 
          className='h-10 mr-2'
        />
        <p className='text-white font-bold text-3xl'>MEDI AI</p>
      </div>
      
      <ul className='md:flex items-start gap-5 font-medium hidden'>
        <NavLink to='/' className={({ isActive }) => isActive ? "active-link" : ""}>
          <li className='nav-item'>HOME</li>
        </NavLink>
        <NavLink to='/doctors' className={({ isActive }) => isActive ? "active-link" : ""}>
          <li className='nav-item'>ALL DOCTORS</li>
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => isActive ? "active-link" : ""}>
          <li className='nav-item'>ABOUT</li>
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => isActive ? "active-link" : ""}>
          <li className='nav-item'>CONTACT</li>
        </NavLink>
      </ul>

      <div className='flex items-center gap-4 '>
        {
          token && userData
            ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img className='w-8 rounded-full transition-transform duration-300 hover:scale-110' src={userData.image} alt="User Profile" />
                <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Icon" />
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                  <div className='min-w-48 bg-gray-50 rounded flex flex-col gap-2 p-4 shadow-lg transition-all duration-300'>
                    <p onClick={() => navigate('/my-profile')} className='hover:text-blue-500 transition-colors duration-300 cursor-pointer'>My Profile</p>
                    <p onClick={() => navigate('/my-appointments')} className='hover:text-blue-500 transition-colors duration-300 cursor-pointer'>My Appointments</p>
                    <p onClick={logout} className='hover:text-blue-500 transition-colors duration-300 cursor-pointer'>Logout</p>
                  </div>
                </div>
              </div>
            : <button onClick={() => navigate('/login')} className='create-account-button hidden md:block'>Create account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden cursor-pointer transition-transform duration-300 hover:scale-110' src={assets.menu_icon} alt="Menu Icon" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300 ease-in-out`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <div className='w-36'>
              <p className='text-black font-bold text-2xl'>MEDI AI</p>
            </div>
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7 cursor-pointer' alt="Close Menu" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'>
              <p className='nav-item'>HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors'>
              <p className='nav-item'>ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about'>
              <p className='nav-item'>ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact'>
              <p className='nav-item'>CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
