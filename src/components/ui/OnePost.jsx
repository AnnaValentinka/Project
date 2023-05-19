import React from 'react'

export default function OnePost() {
  return (
    <div className="card text" style={{ maxWidth: "70rem", marginTop: 50, backgroundColor: "#008BDB", color: "black" }}>
      <div className="card-header">Московский университет им. С. Ю. Витте</div><br />
      <p className="card-header">  Москва</p>
      <div className="card-body">
        <p className="card-text">2-й Кожуховский пр-д. 12 стр 1</p>
        <p className="card-text">Главный корп.,  рядом со столовой </p>
        <div><img src="" alt="logo" /> <img src="" alt="logo" /></div><br />
        <button type="button" className="btn btn-dark">свернуть </button>
      </div>
    </div>
  )
}
