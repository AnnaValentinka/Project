import React from 'react';
import { Link } from 'react-router-dom';

export default function TestAvtoriz() {
  return (
    <div
      className="d-flex justify-content-evenly flex-wrap"
      style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '50px' }}
    >
      <Link type="button" class="btn btn-success" to="/auth/signup">
        Регистрация
      </Link>

      <Link type="button" class="btn btn-danger" to="/auth/login">
        Авторизация
      </Link>

      {/* <Link type="button" class="btn btn-warning" to="">
        Выйти из профиля
      </Link> */}
    </div>
  );
}
