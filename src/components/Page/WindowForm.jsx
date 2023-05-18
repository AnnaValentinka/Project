import React from 'react';

export default function OnePost() {
  return (
    <div
      className="card text"
      style={{ maxWidth: '70rem', marginTop: 50, backgroundColor: '#87CEFA', color: 'black' }}
    >
      <div className="card-header">Московский университет им. С. Ю. Витте</div>
      <br />
      <p className="card-header"> Москва</p>
      <div className="card-body">
        <p className="card-text">2-й Кожуховский пр-д. 12 стр 1</p>
        <p className="card-text">Главный корп., рядом со столовой </p>
        <div>
          <img src="/img/1.jpeg" alt="logo" style={{ width: '450px', height: '350px' }} />{' '}
          <img src="/img/2.jpeg" alt="logo" style={{ width: '450px', height: '350px' }} />
        </div>
        <br />
        <button type="button" className="btn btn-dark" onClick={() => (window.location = '/table')}>
          свернуть{' '}
        </button>
      </div>
    </div>
  );
}
