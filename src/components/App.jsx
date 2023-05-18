import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import SignUpPage from '../auth/SignUpPage';
import Main from './Main';
import NavBar from './ui/NavBar';
import AuthForm from './Page/AuthForm';
import TablForm from './Page/TablForm';
import ParsForm from './Page/ParsForm';
import WindowForm from './Page/WindowForm';

export default function App({ user, posts, photos, post }) {
  console.log(user);

  return (
    <div className="container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/authform" element={<AuthForm />} />
        <Route path="/table" element={<TablForm posts={posts} photos={photos} user={user} />} />
        <Route path="/api/pars" element={<ParsForm user={user} />} />
        <Route path="/window/:id" element={<WindowForm post={post} photos={photos} />} />

        <Route path="/auth/login" element={<LoginPage user={user} />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}
