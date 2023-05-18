import React from 'react';
import axios from 'axios';

export default function ParsForm({ user }) {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData);
      console.log('File uploaded successfully');
      if (res.status === 200) {
        window.location = '/table';
      }
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
    greeting: {
      fontSize: '24px',
      marginBottom: '20px',
    },
    inputContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    input: {
      width: '300px',
      padding: '10px',
    },
  };

  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
      window.location = '/'; // Перенаправление на страницу входа после выхода
    } catch (error) {
      console.log('Error logging out:', error);
    }
  };

  return (
    <>
      <h1 className="text-center text-black-50 fs-1" style={{ fontSize: 20 }}>
        Welcome
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          marginTop: 20,
          marginRight: 50,
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => (window.location = '/table')}
        >
          Список
        </button>{' '}
        <button type="button" className="btn btn-danger" onClick={handleLogout}>
          Выход
        </button>
      </div>
      <div style={styles.container}>
        <h2 style={styles.greeting}>Добро пожаловать, {user.name}!</h2>
        <div style={styles.inputContainer}>
          <input type="file" onChange={handleFileUpload} style={styles.input} />
          {/* <input type="button" onClick={() => (window.location = '/table')} value="Перезаписать" /> */}
        </div>
      </div>
    </>
  );
}

// import React from 'react';
// import axios from 'axios';

// export default function ParsForm({ user }) {
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await axios.post('/api/upload', formData);
//       console.log('File uploaded successfully');
//       if (res.status === 200) {
//         window.location = '/table';
//       }
//     } catch (error) {
//       console.log('Error uploading file:', error);
//     }
//   };
//   const styles = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: '100vh',
//     },
//     greeting: {
//       fontSize: '24px',
//       marginBottom: '20px',
//     },
//     inputContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//     },
//     input: {
//       width: '300px',
//       padding: '10px',
//     },
//   };

//   return (
//     <>
//       <h1 className="text-center text-black-50 fs-1" style={{ fontSize: 20 }}>
//         Welcome
//       </h1>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'end',
//           alignItems: 'center',
//           marginTop: 20,
//           marginRight: 50,
//         }}
//       >
//         <button
//           type="button"
//           className="btn btn-primary"
//           onClick={() => (window.location = '/table')}
//         >
//           Список
//         </button>{' '}
//       </div>
//       <div style={styles.container}>
//         <h2 style={styles.greeting}>Добро пожаловать, {user.name}!</h2>
//         <div style={styles.inputContainer}>
//           <input type="file" onChange={handleFileUpload} style={styles.input} />
//           {/* <input type="button" onClick={() => (window.location = '/table')} value="Перезаписать" /> */}
//         </div>
//       </div>
//     </>
//   );
// }
