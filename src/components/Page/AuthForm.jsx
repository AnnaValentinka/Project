import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthForm() {
  return (
    <div>
      {' '}
      <div>
        <Link to="/auth/login">Login</Link>
      </div>
      <div>
        <Link to="/auth/signup">Sign Up</Link>
      </div>
    </div>
  );
}
