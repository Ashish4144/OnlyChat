
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast';

import { Routes,Route, Navigate } from 'react-router-dom';
import { storeAuth } from './store/storeAuth';
import { storeTheme } from './store/storeTheme';

const App = () => {
  const {authUser,checkAuth, isCheckingAuth,onlineUsers} = storeAuth();       //backend ka /check hai authentication zustand use kiya 
  const {theme} = storeTheme(); 

  console.log("onlineUsers: ",onlineUsers)
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({authUser})

    if(isCheckingAuth && !authUser) 
      return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    );
  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path = '/' element= {authUser ? <HomePage/> : <Navigate to ="/login" />  } />
        <Route path = '/signup' element= {!authUser ?<SignUpPage/> : <Navigate to = "/" />} />
        <Route path = '/login' element= {!authUser ?<LoginPage/> : <Navigate to = "/"  />} />
        <Route path = '/settings' element= {<SettingsPage/>} />
        <Route path = '/profile' element= {authUser ? <ProfilePage/> : <Navigate to ="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
