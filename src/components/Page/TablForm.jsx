import React from 'react';

export default function TablForm({ posts, photos }) {
  // console.log(posts);

  const handleDetailsClick = (uuid) => {
    // Обработчик для кнопки "Посмотреть подробнее"
    // Можно выполнить нужные действия, используя uuid
    console.log(`Посмотреть подробнее для поста с uuid: ${uuid}`);
  };

  return (
    <>
      <form className="d-flex" role="search" style={{ marginTop: 20 }}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Город</th>
            <th scope="col">УЗ</th>
            <th scope="col">Адрес</th>
            <th scope="col">Описание места размещения РИМ</th>
            <th scope="col" style={{ width: 150 }}>
              Фото
            </th>
            <th scope="col">Подробнее</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              <th scope="row">{index + 1}</th>
              <td>{post.city}</td>
              <td>{post.name}</td>
              <td>{post.address}</td>
              <td>{post.advertising}</td>
              <td>
                {photos
                  .filter((photo) => photo.education_id === post.id)
                  .map((photo, photoIndex) => (
                    <div key={photo.id}>
                      <a href={photo.urlPhoto} target="_blank" rel="noopener noreferrer">
                        Фото {photoIndex + 1}
                      </a>
                    </div>
                  ))}
              </td>
              <td>
                <a href={`/window/${post.uuID}`} className="btn btn-info">
                  Посмотреть подробнее
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
