import React from 'react'
import { dummyProducts } from '../assets/assets'
import Card from '../components/Card'

const AllProducts = () => {
  return (
    <div className='mt-16 text-2xl md:text-3xl font-medium'>
      <p>Best Sellers</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
        {dummyProducts.filter((product) => product.inStock).map((product, index) => (
          <Card key={index} product={product} />
        ))}

      </div>
    </div>
  )
}

export default AllProducts
