import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import NewsLetter from '../components/NewsLetter'
import BestSeller from '../components/BestSeller'

const Home = () => {
  return (
    <div className='mt-10 items-center justify-center'>
      <MainBanner />
      <Categories />
      <BestSeller />
      <NewsLetter />
    </div>
  )
}

export default Home
