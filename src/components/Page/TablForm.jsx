/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaPencilAlt, FaTrash, FaPlus, FaSave } from 'react-icons/fa';

export default function TablForm({ posts, photos, user, onePost }) {
  const [allEntries, setAllEntries] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);
  const [input, setInput] = useState('');
  const [inputPhoto, setInputPhoto] = useState('');
  const [inputEdit, setInputEdit] = useState('');
  const [isAdding, setIsAdding] = useState(null);
  const [isAdding2, setIsAdding2] = useState(null);
  const [edit, setEdit] = useState(false);
  const [inputEditPost, setInputEditPost] = useState({
    id: '',
    city: '',
    name: '',
    address: '',
    advertising: '',
  });
  const [inputEditShow, setInputEditShow] = useState(false);
  const [addingPost, setAddingPost] = useState(false);
  const [newPost, setNewPost] = useState({
    city: '',
    name: '',
    address: '',
    advertising: '',
  });
  const [newPhoto, setNewPhoto] = useState('');

  useEffect(() => {
    setAllEntries(posts); // Обновляем данные при получении новых постов
  }, [posts]);

  useEffect(() => {
    setAllPhotos(photos); // Обновляем данные при получении новых фото
  }, [photos]);

  const handleEdit = () => {
    setEdit(!edit);
  };
  const handleEditPost = async (id) => {
    const res = await axios.get(`/api/edit/${id}`);
    if (res.status === 200) {
      const onePosts = res.data;

      setInputEditShow(!inputEditShow);
      setInputEditPost({
        id: onePosts.id,
        city: onePosts.city,
        name: onePosts.name,
        address: onePosts.address,
        advertising: onePosts.advertising,
      });
    }
  };
  const handleSave = async (id) => {
    const res = await axios.put(`/api/edit/${id}`, inputEditPost);
    if (res.status === 200) {
      setInputEditShow(false); // Скрыть поля ввода после сохранения
      setAllEntries((prev) => {
        const updatedEntries = prev.map((entry) => {
          if (entry.id === id) {
            return inputEditPost; // Заменить измененную запись на обновленные данные
          }
          return entry;
        });
        return updatedEntries;
      });
    }
  };

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`/api/delete/${id}`);
      if (res.status === 200) {
        setAllEntries(allEntries.filter((el) => el.id !== id));
      }
    } catch (error) {
      console.log('Удаление не удалась:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
      window.location = '/'; // Перенаправление на главную страницу после выхода
    } catch (error) {
      console.log('Ошибка при выходе:', error);
    }
  };

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
  const handleSavePost = useCallback(async () => {
    try {
      const res = await axios.post('/api/add', newPost);
      if (res.status === 200) {
        const { education, photo } = res.data;
        setAllEntries((prev) => [...prev, education]);
        console.log(res.data);
        setAddingPost(false);
        setNewPost({
          city: '',
          name: '',
          address: '',
          advertising: '',
        });
        if (photo) {
          setAllPhotos((prev) => [...prev, photo]);
        }
      }
    } catch (error) {
      console.log('Ошибка при добавлении поста:', error);
    }
  }, [newPost, setAllEntries, setAddingPost, setNewPost, setAllPhotos]);

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
        {edit && (
          <button type="button" className="btn btn-success" onClick={() => setAddingPost(true)}>
            <FaPlus /> Добавить
          </button>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
        {user.admin === true && (
          <button
            className="btn btn-success"
            type="button"
            style={{ marginRight: '10px' }}
            onClick={handleEdit}
          >
            Редактировать
          </button>
        )}
        <button
          className="btn btn-outline-warning"
          type="button"
          style={{ marginRight: '10px' }}
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
            <th style={{ width: 15 }} />
            <th scope="col" style={{ width: 15 }}>
              №
            </th>
            <th scope="col" style={{ width: 150 }}>
              Город
            </th>
            <th scope="col" style={{ width: 200 }}>
              УЗ
            </th>

            <th scope="col" style={{ width: 200 }}>
              Адрес
            </th>

            <th scope="col" style={{ width: 200 }}>
              Описание места размещения РИМ
            </th>
            <th scope="col" style={{ width: 120 }}>
              Фото
            </th>
            <th scope="col" style={{ width: 150 }}>
              Подробнее
            </th>
          </tr>
          {addingPost && (
            <tr>
              <td>
                <button type="button" className="btn  btn-outline-success" onClick={handleSavePost}>
                  <FaSave />
                </button>
              </td>
              <td />
              <td>
                <input
                  type="text"
                  value={newPost.city}
                  onChange={(e) => setNewPost({ ...newPost, city: e.target.value })}
                  placeholder="Город"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newPost.name}
                  onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
                  placeholder="УЗ"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newPost.address}
                  onChange={(e) => setNewPost({ ...newPost, address: e.target.value })}
                  placeholder="Адрес"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newPost.advertising}
                  onChange={(e) => setNewPost({ ...newPost, advertising: e.target.value })}
                  placeholder="Описание места размещения РИМ"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={newPost.photo}
                  onChange={(e) => setNewPost({ ...newPost, urlPhoto: e.target.value })}
                  placeholder="Ссылка на фото"
                />
              </td>
            </tr>
          )}
        </thead>
        <tbody>
          {allEntries.map((post, index) => {
            const arr = allPhotos.filter((photo) => photo.education_id === post.id);
            return (
              <tr key={post.id}>
                {edit ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-warning"
                      onClick={() =>
                        handleEditPost(
                          post.id,
                          post.city,
                          post.name,
                          post.address,
                          post.advertising,
                        )
                      }
                    >
                      <FaPencilAlt /> {/* Иконка карандаша */}
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => deleteHandler(post.id)}
                    >
                      <FaTrash /> {/* Иконка мусора */}
                    </button>

                    {inputEditShow && inputEditPost.id === post.id && (
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => handleSave(post.id)}
                      >
                        <FaSave />
                      </button>
                    )}
                  </>
                ) : (
                  <div />
                )}

                <th scope="row">{index + 1}</th>
                <td style={{ width: 150 }}>
                  {inputEditShow && inputEditPost.id === post.id ? (
                    <input
                      type="text"
                      value={inputEditPost.city}
                      onChange={(e) => setInputEditPost({ ...inputEditPost, city: e.target.value })}
                    />
                  ) : (
                    post.city
                  )}
                </td>
                <td style={{ width: 150 }}>
                  {inputEditShow && inputEditPost.id === post.id ? (
                    <input
                      type="text"
                      value={inputEditPost.name}
                      onChange={(e) => setInputEditPost({ ...inputEditPost, name: e.target.value })}
                    />
                  ) : (
                    post.name
                  )}
                </td>
                <td style={{ width: 150 }}>
                  {inputEditShow && inputEditPost.id === post.id ? (
                    <input
                      type="text"
                      value={inputEditPost.address}
                      onChange={(e) =>
                        setInputEditPost({ ...inputEditPost, address: e.target.value })
                      }
                    />
                  ) : (
                    post.address
                  )}
                </td>
                <td style={{ width: 150 }}>
                  {inputEditShow && inputEditPost.id === post.id ? (
                    <input
                      type="text"
                      value={inputEditPost.advertising}
                      onChange={(e) =>
                        setInputEditPost({ ...inputEditPost, advertising: e.target.value })
                      }
                    />
                  ) : (
                    post.advertising
                  )}
                </td>

                <td>
                  {arr.map((photo, photoIndex) => (
                    <div key={photo.id}>
                      {user.admin === true ? (
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
