import React from 'react';
import OneTabl from './OneTabl';

export default function TablForm({ user, educations }) {
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
            <th scope="col">Фото 1</th>
            <th scope="col">Фото 2</th>
            <th scope="col">Ссылка на страницу</th>
          </tr>
        </thead>
        <tbody>
          {educations?.map((education) => (
            <OneTabl key={education.id} education={education} user={user} />
          ))}
        </tbody>
      </table>
    </>
  );
}
