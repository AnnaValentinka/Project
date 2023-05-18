import React from 'react';

export default function TablForm() {
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
          <tr>
            <th scope="row">1</th>
            <td>Санкт-Петербург</td>
            <td>
              Санкт-Петербургский государственный университет телекоммуникаций им. проф.
              М.А.Бонч-Бруевича
            </td>
            <td>Дальневосточный пр., д. 71</td>
            <td>Общежитие Дальневосточное, входная зона</td>
            <td>ссылка на фото-1</td>
            <td>
              <button type="button" className="btn btn-info">
                Добавить
              </button>
            </td>
            <a href="/window">
              {' '}
              <td>ссылка на страницу</td>
            </a>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
