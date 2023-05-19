import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TablForm({ posts, photos }) {
  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      window.location = '/'; // Перенаправление на главную страницу после выхода
    } catch (error) {
      console.log('Ошибка при выходе:', error);
    }
  };
  // const handleDetailsClick = (uuid) => {
  //   // Обработчик для кнопки "Посмотреть подробнее"
  //   // Можно выполнить нужные действия, используя uuid
  //   console.log(`Посмотреть подробнее для поста с uuid: ${uuid}`);
  // };

  const changeHandler = async (e) => {
    axios.post('/api/photoAdd', {});
  };

  const addHandler = (e) => {};

  const [allEntries, setAllEntries] = useState(posts);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.post('/api/entries/search', { input }).then(({ data }) => setAllEntries(data));
  }, [input]);

  return (
    <>
      {/* <form name='' className="d-flex" role="search" style={{ marginTop: 20 }}> */}
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
      {/* </form> */}
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
          {allEntries.map((post, index) => {
            const arr = photos.filter((photo) => photo.education_id === post.id);

            return (
              <tr key={post.id}>
                <th scope="row">{index + 1}</th>
                <td>{post.city}</td>
                <td>{post.name}</td>
                <td>{post.address}</td>
                <td>{post.advertising}</td>
                <td>
                  {arr.map((photo, photoIndex) => (
                    <div key={photo.id}>
                      <a href={photo.urlPhoto} target="_blank" rel="noopener noreferrer">
                        Фото {photoIndex + 1}
                      </a>
                      <button type="button" onClick={changeHandler}>
                        Изменить
                      </button>
                      {arr.length === 1 && (
                        <button type="button" onClick={addHandler}>
                          добавить
                        </button>
                      )}
                    </div>
                  ))}
                </td>
                <td>
                  <a href={`/window/${post.uuID}`} className="btn btn-info">
                    Посмотреть подробнее
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
