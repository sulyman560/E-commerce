import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Navber = () => {

  const { setShowUserLogin } = useAppContext()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md bg-green/10 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 relative transition-all transition `}>

      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className='h-9' src={assets.logo} alt="" />
      </NavLink>

      {/* Desktop Menu */}
      <div className='hidden md:block md:flex items-center gap-8'>
        <NavLink to='/' >Home</NavLink>
        <NavLink to='/products' >All Product</NavLink>
        <NavLink to='/about' >About</NavLink>
        <NavLink to='/contact' >Contact</NavLink>
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
          <img src={assets.search_icon} alt="search" className='w-4 h-4' />
        </div>
        <NavLink to='/cart' className='relative cursor-pointer' >
          <img onClick={() => navigate("/cart")} src={assets.cart_icon} alt="cart" className='w-6 opacity-80' />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">0</button>
        </NavLink>
        <button onClick={()=> setShowUserLogin(true)} className='cursor-pointer bg-primary hover:bg-primary-dull text-white px-8 py-2 rounded-full'>
          Login</button>
      </div>



      {/* Hamburger Menu */}
      <div className='flex items-center gap-6 md:hidden'>
        <div className="relative cursor-pointer">

          <img onClick={() => navigate("/cart")} src={assets.cart_icon} alt="cart" className='w-6 opacity-80' />

          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">0</button>

        </div>
        <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="cursor-pointer focus:outline-none">

          {/* Menu Icon SVG */}

          <img src={assets.menu_icon} alt="menu" />

        </button>
      </div>
      {/* Mobile Menu */}

      <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>

        <NavLink to='/' onClick={() => setOpen(false)} className='hover:bg-gray-100 w-full rounded px-4 py-2'>Home</NavLink>
        <NavLink to='/products' onClick={() => setOpen(false)} className='hover:bg-gray-100 w-full rounded px-4 py-2'>All Product</NavLink>
        <NavLink to='/my-orders' onClick={() => setOpen(false)} className='hover:bg-gray-100 w-full rounded px-4 py-2'>My Orders</NavLink>
        <NavLink to='/about' onClick={() => setOpen(false)} className='hover:bg-gray-100 w-full rounded px-4 py-2'>About Us</NavLink>
        <NavLink to='/contact' onClick={() => setOpen(false)} className='hover:bg-gray-100 w-full rounded px-4 py-2'>Contact</NavLink>

        <button onClick={() => {
          setOpen(false);
          setShowUserLogin(true);
        }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">

          Login

        </button>



      </div>

    </nav>
  )
}

export default Navber
