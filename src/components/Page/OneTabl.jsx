import React from 'react';

export default function OneTabl({ education, user }) {
  return (
    <tr>
      <th scope="row">{education.id}</th>
      <td>{education.city}</td>
      <td>{education.name}</td>
      <td>{education.address}</td>
      <td>{education.advertising}</td>
      <td>{}</td>
      <td>
        {user.admin && (
          <button type="button" className="btn btn-info">
            Добавить
          </button>
        )}
      </td>
      <a href="/window">
        {' '}
        <td>ссылка на страницу</td>
      </a>
    </tr>
  );
}
