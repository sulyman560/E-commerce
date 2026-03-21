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
          user ? (
            <div className='absolute top-4 right-4 flex items-center gap-4 text-sm text-gray-600'>
              <p className='text-md font-semibold text-gray-200 border px-2 py-1.5 rounded-full'>Welcome, <span className='text-blue-500'>{user.username}!</span></p>
              <button onClick={() => {
                logout();
                Navigate(`/login`);

              }} className="cursor-pointer text-md text-white rounded-md bg-red-600 hover:bg-red-700 transition px-4 py-2"
              >
                Logout
              </button>
            </div>
          )

            :
            ''
        }
        <div className='px-6 md:px-16 lg:px-24 xl:px-32'>

          <Routes>
            <Route path="/" element={!user ? <Login /> : <Navigate to="/chat" />} />
            <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
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
