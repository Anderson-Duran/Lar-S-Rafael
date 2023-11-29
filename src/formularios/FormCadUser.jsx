import React, { useContext, useState } from 'react';
import { urlUser } from '../assets/definicoes';
import { AuthContext } from '../contextos/authContext';

const FormCadUser = (props) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  function getToken() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();

      if (cookie.startsWith(user.email + '=')) {
        return cookie.substring(user.email.length + 1);
      }
    }

    return null;
  }

  const handleSubmit = (e) => {
    let token = getToken();
    let user = {
      name: name,
      email: email,
      password: password,
      isAdmin: isAdmin,
    };
    e.preventDefault();
    // Perform form submission logic here
    fetch(urlUser + '/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({ ...user }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        window.alert(result.message);
        props.setListUsers([...props.listUser, result.newUser]);
        setTimeout(() => {
          props.changeScreen();
        }, 500);
      });
  };

  const inputStyle = {
    marginBottom: '10px',
    marginRight: '10px',
    width: '80%',
    padding: '5px',
  };

  const selectStyle = {
    marginBottom: '10px',
    marginRight: '10px',
    padding: '5px',
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Centraliza na horizontal
    padding: '3rem',
  };

  const labelStyle = {
    marginBottom: '10px',
    textAlign: 'left',
    width: '80%',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label style={labelStyle}>
        Nome:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        E-mail:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Administrador:
        <select
          value={isAdmin}
          onChange={(e) => {
            if (e.target.value === 'true') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          }}
          style={selectStyle}
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </label>
      <button type="submit" style={buttonStyle}>
        Cadastrar
      </button>
      <button style={buttonStyle} onClick={props.changeScreen}>
        Voltar
      </button>
    </form>
  );
};

export default FormCadUser;
