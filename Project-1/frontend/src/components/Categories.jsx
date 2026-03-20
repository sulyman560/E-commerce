import React from 'react'
import { assets, categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
  const {navigate} = useAppContext()
  return (
    <div className='mt-16 text-2xl md:text-3xl font-medium'>
      <p>Categories</p>
      <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6'>
        {categories.map((category, index) => (
          <div key={index} 
          style={{backgroundColor: category.bgColor}}
          onClick={()=>{
          navigate(`/products/${category.path.toLowerCase()}`)}}
          className='group flex flex-col items-center justify-center py-5 px-3 gap-2 rounded-xl cursor-pointer'>
              <img src={category.image} className='group-hover:scale-108 transition max-w-28' alt="" />
              <p className='text-sm font-medium'>{category.text}</p>
          </div>
        ))

        }
      </div>
    </div>
  )
}

export default Categories
