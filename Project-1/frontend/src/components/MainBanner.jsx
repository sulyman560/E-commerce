import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative w-full h-[400px] rounded-lg overflow-hidden'>
      <img src={assets.main_banner_bg} className='w-full hidden md:block' alt="" />
      <img src={assets.main_banner_bg_sm} className='w-full md:hidden' alt="" />
      <div className='absolute flex inset-0 flex-col items-center md:items-start justify-end md:justify-center
       pb-24 px-4 md:pl-18 lg:pl-24 xl:pl-32'>
        <h1 className='text-3xl text-black md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105
         leading-tight lg:leading-15'>
          Freshness You Can Trust, Savings You will Love!
        </h1>
        <div className='flex items-center gap-2 font-medium'>
          <Link to={'/products'} className='group cursor-pointer flex items-center gap-2 mt-6 bg-primary hover:bg-primary-dull text-white text-base px-8 py-3 rounded-md'>Shop Now</Link>
          <Link to={'/products'} className='group cursor-pointer flex items-center gap-2 mt-6 text-black/80 text-base px-8 py-3 rounded-md'>Explorer Deals <img src={assets.black_arrow_icon} className='transition group-hover:translate-x-1' alt="" /></Link>
        </div>
        
      </div>
    </div>
  )
}

export default MainBanner
