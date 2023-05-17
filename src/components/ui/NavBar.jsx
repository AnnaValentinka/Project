import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const styles = {
    navBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '100px',
      maxWidth: 'auto',
      height: '100px',
      background: 'rgb(16, 26, 170)',
    },
    btn: {
      marginLeft: '20px',
      fontSize: '13px',
      border: 'none',
      textDecoration: 'none',
      color: 'aliceblue',
      background: 'rgb(16, 26, 170)',
    },
    btnHover: {
      cursor: 'pointer',
      color: '#888',
    },
  };

  return (
    <div style={styles.navBar}>
      <button type="button" style={styles.btn}>
        О нас
      </button>
      <button type="button" style={styles.btn}>
        Преимущества
      </button>
      <button type="button" style={styles.btn}>
        Формат
      </button>
      <button type="button" style={styles.btn}>
        Контакты
      </button>
      <Link to="/authform" style={styles.btn}>
        Наша ссылка
      </Link>
    </div>
  );
}

export default NavBar;
