/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TablForm({ posts, photos, user }) {
  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
      window.location = '/'; // Перенаправление на главную страницу после выхода
    } catch (error) {
      console.log('Ошибка при выходе:', error);
    }
  };

  const [allEntries, setAllEntries] = useState(posts);
  const [allPhotos, setAllPhotos] = useState(photos);
  const [input, setInput] = useState('');
  const [inputPhoto, setInputPhoto] = useState('');
  const [inputEdit, setInputEdit] = useState('');
  const [isAdding, setIsAdding] = useState(null);
  const [isAdding2, setIsAdding2] = useState(null);

  useEffect(() => {
    try {
      axios.post('/api/entries/search', { input }).then(({ data }) => setAllEntries(data));
    } catch (error) {
      console.log('Ошибка при выполнении useEffect:', error);
    }
  }, [input]);

  const changeHandler = async (id, pId, data) => {
    try {
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
    } catch (error) {
      console.log('Ошибка при изменении данных:', error);
    }
  };

  const addHandler = async (id, data) => {
    try {
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
    } catch (error) {
      console.log('Ошибка при добавлении данных:', error);
    }
  };

  const isAdditingHandler = (id) => {
    setIsAdding(id);
    console.log(id);
  };
  const isAdditingHandler2 = (id) => {
    setIsAdding2(id);
    console.log(id);
  };
  const handlerExcel = async () => {
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ allEntries }),
      });

      if (response.status === 200) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'filtered_data.xlsx';
        link.click();
      } else {
        throw new Error('Ошибка при скачивании файла');
      }
    } catch (error) {
      console.log('Ошибка при обработке события:', error);
    }
  };
  const handleRedirect = () => {
    try {
      if (user.admin === true) {
        window.location = '/api/pars';
      } else {
        window.location = '/home';
      }
    } catch (error) {
      console.log('Ошибка при обработке перенаправления:', error);
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
        <button className="btn btn-outline-success" type="button" onClick={handlerExcel}>
          Скачать
        </button>
        <button
          className="btn btn-outline-warning"
          type="button"
          style={{ marginLeft: 860 }}
          onClick={handleRedirect}
        >
          Назад
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
                      {user.admin === true ? (
                        // eslint-disable-next-line react/jsx-no-useless-fragment
                        <>
                          {isAdding2 === photo.id ? (
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
                                  setIsAdding2(null);
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
                              <button type="button" onClick={() => isAdditingHandler2(photo.id)}>
                                Изменить
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <a href={photo.urlPhoto} target="_blank" rel="noopener noreferrer">
                          Фото {photoIndex + 1}
                        </a>
                      )}
                      {arr.length === 1 && user.admin === true && (
                        <>
                          {isAdding === post.id ? (
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
                          )}
                        </>
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
