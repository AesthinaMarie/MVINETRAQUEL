import React, { useState,useEffect, useContext} from 'react'
import HomePage from './pages/homepage'
import LoginPage from './pages/loginpage'
import TBI_ADMIN from './pages/tbiAdmin'
import {Routes,Route, Navigate} from 'react-router-dom'
import { AuthContext } from './component/authContext'

const App = () => {


  const {currentUser} = useContext(AuthContext) 

  const RequireAuth = ({children}) =>{
    return currentUser ? (children) : <Navigate to="/Login"></Navigate>
  }

  console.log(currentUser)
  return (
    <>
      <Routes>
        <Route path='/tbi-admin' element={<RequireAuth><TBI_ADMIN/> </RequireAuth>}></Route>
        <Route index path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        
      </Routes>
    </>
  )
}

export default App
