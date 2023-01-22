import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './components/context/AuthContext';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <AuthContextProvider>
      <Navbar/>
      <Outlet/>
    </AuthContextProvider>
  );
}

