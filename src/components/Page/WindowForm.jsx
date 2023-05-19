import React from 'react';

export default function WindowForm({ post, photos }) {
  return (
    <div
      className="card text"
      style={{ maxWidth: '70rem', marginTop: 50, backgroundColor: '#87CEFA', color: 'black' }}
    >
      <div className="card-header">{post.name}</div>
      <br />
      <p className="card-header">{post.city}</p>
      <div className="card-body">
        <p className="card-text">{post.address}</p>
        <p className="card-text">{post.advertising}</p>
        <div>
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo.urlPhoto} // Здесь передайте ссылку на изображение
              alt={`Фото ${index + 1}`}
              style={{ width: '450px', height: '350px' }}
            />
          ))}
        </div>
        <br />
        <button type="button" className="btn btn-dark" onClick={() => (window.location = '/table')}>
          свернуть
        </button>
      </div>
    </div>
  );
}
