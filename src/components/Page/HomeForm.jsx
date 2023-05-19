import React from 'react';

export default function HomeForm({ user }) {
  const handleButtonClick = () => {
    if (user.admin === true) {
      // Перенаправление на форму ParsForm для администратора
      window.location = '/api/pars';
    } else {
      // Перенаправление на компонент TablForm для обычного пользователя
      window.location = '/table';
    }
  };

  return (
    <div>
      <h2> Добро пожаловать, {user.name}!</h2>
      <button type='button' className='btn btn-primary' onClick={handleButtonClick}>Перейти</button>
    </div>
  );
}
