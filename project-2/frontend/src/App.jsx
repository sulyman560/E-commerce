import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Navigate, Route, Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [count, setCount] = useState(0)

  const { user, logout } = React.useContext(AuthContext);


  return (
    <>
      <div className='text-default min-h-screen flex items-center justify-center'>

        {
          user ?
            <button onClick={() => {
              logout();
              Navigate(`/login`);
              
            }} className = "cursor-pointer text-md text-white rounded-md bg-red-600 hover:bg-red-700 transition px-4 py-2 absolute top-5 right-10">
              Logout
            </button>
            :
            ''
        }
        <div className='px-6 md:px-16 lg:px-24 xl:px-32'>

          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/chat" />} />
            <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>

        </div>
        {/* Soft Backdrop*/}
        <div className='fixed bg-black inset-0 -z-1 pointer-events-none'>
          <div className='absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-indigo-800/35 to-transparent rounded-full blur-3xl' />
          <div className='absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-indigo-700/35 to-transparent rounded-full blur-2xl' />
        </div>
      </div>

    </>
  )
}

export default App
