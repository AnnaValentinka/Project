import axios from 'axios';
import React from 'react';

export default function LoginPage({ user }) {
  console.log(user);
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post('/auth/login', Object.fromEntries(new FormData(e.target)));
    if (res.status === 200) {
      // Предполагается, что сервер возвращает информацию о том, является ли пользователь администратором
      if (user.admin === true) {
        window.location = '/api/pars'; // Перенаправление для администратора
      } else {
        window.location = '/table'; // Перенаправление для обычного пользователя
      }
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="email"
          />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Password
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="password"
          />
        </label>
      </div>
      <button type="submit">Sing Up</button>
    </form>
  );
}
