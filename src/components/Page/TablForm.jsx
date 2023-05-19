import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TablForm({ posts, photos }) {
  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
      window.location = '/'; // Перенаправление на главную страницу после выхода
    } catch (error) {
      console.log('Ошибка при выходе:', error);
    }
  };

  // const handleDetailsClick = (uuid) => {

  //   // Обработчик для кнопки "Посмотреть подробgit merge mainнее"
  //   // Можно выполнить нужные действия, используя uuid
  //   console.log(`Посмотреть подробнее для поста с uuid: ${uuid}`);
  // };

  //   // Обработчик для кнопки "Посмотреть подробнее"
  //   // Можно выполнить нужные действия, используя uuid
  //   console.log(`Посмотреть подробнее для поста с uuid: ${uuid}`);
  // };

  const [allEntries, setAllEntries] = useState(posts);
  const [allPhotos, setAllPhotos] = useState(photos);
  const [input, setInput] = useState('');
  const [inputPhoto, setInputPhoto] = useState('');
  const [inputEdit, setInputEdit] = useState('');
  const [isAdding, setIsAdding] = useState(null);

  useEffect(() => {
    axios.post('/api/entries/search', { input }).then(({ data }) => setAllEntries(data));
  }, [input]);

  const changeHandler = async (id, pId, data) => {
    const res = await axios.patch(`/api/photoChange/`, { id, pId, input: data });
    if (res.status === 200) {
      setAllPhotos((prev) =>
        prev.map((el) => {
          if (el.education_id === id) {
            return res.data;
          }
          return el;
        }),
      );
    }
  };

  const addHandler = async (id, data) => {
    const res = await axios.post('/api/photoAdd/', { id, input: data });
    console.log(res.data);
    if (res.status === 200) {
      setAllPhotos((prev) =>
        prev.map((el) => {
          if (el.education_id === id) {
            return res.data;
          }
          return el;
        }),
      );
    }
  };

  const isAdditingHandler = (id) => {
    setIsAdding(id);
    console.log(id);
  };

  const handlerExcel = async () => {
    try {
      await axios.post('/api/download', { allEntries });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <button className="btn btn-outline-success" type="submit" onClick={handlerExcel}>
          Скачать
        </button>
        <button type="button" className="btn btn-danger" onClick={handleLogout}>
          Выход
        </button>
      </div>
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
            console.log(post);
            const arr = allPhotos.filter((photo) => photo.education_id === post.id);

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
                      {isAdding === photo.id ? (
                        <>
                          <input
                            type="text"
                            name="newPhoto"
                            value={inputEdit}
                            onChange={(e) => setInputEdit(e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              changeHandler(post.id, photo.id, inputEdit);
                              setIsAdding(null);
                            }}
                          >
                            изменить
                          </button>
                        </>
                      ) : (
                        <>
                          <a href={photo.urlPhoto} target="_blank" rel="noopener noreferrer">
                            Фото {photoIndex + 1}
                          </a>
                          <button type="button" onClick={() => isAdditingHandler(post.id)}>
                            Изменить
                          </button>
                        </>
                      )}
                      {arr.length === 1 &&
                        (isAdding === post.id ? (
                          <>
                            <input
                              type="text"
                              name="newPhoto"
                              value={inputPhoto}
                              onChange={(e) => setInputPhoto(e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                addHandler(post.id, inputPhoto);
                                setIsAdding(null);
                              }}
                            >
                              Добавить
                            </button>
                          </>
                        ) : (
                          <button type="button" onClick={() => isAdditingHandler(post.id)}>
                            добавить
                          </button>
                        ))}
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
