import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import SignUpPage from '../auth/SignUpPage';
import Main from './Main';
import NavBar from './ui/NavBar';
import AuthForm from './Page/AuthForm';


export default function App() {
  return (
    <div className="container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/authform" element={<AuthForm />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}
