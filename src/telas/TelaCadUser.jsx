import React, { useState, useEffect, useContext } from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import TabelaUsuarios from '../tabelas/TabelaUsuarios';
import FormCadUser from '../formularios/FormCadUser';
import { urlUser } from '../assets/definicoes';
import Pagina from '../templates/Pagina';
import { AuthContext } from '../contextos/authContext';

export default function TelaCadUser(props) {
  const { user } = useContext(AuthContext);
  const [showTable, setShowTable] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [users, setUsers] = useState();
  const [listUser, setListUsers] = useState(null);
  const [editionMode, setEditionMode] = useState(false);
  const [excluded, setExcluded] = useState(false);
  const [userEditing, setUserEditing] = useState({
    id: '',
    name: '',
    email: '',
    isAdmin: '',
  });

  useEffect(() => {
    setShowSpinner(true);

    setTimeout(() => {
      setShowSpinner(false);
    }, 700);

    try {
      getData();
      setListUsers(users);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function changeValueOnClick() {
    setShowSpinner(true);

    setTimeout(() => {
      setShowTable(!showTable);
      setShowSpinner(false);
    }, 800);
  }

  function prepareUserToEdition(userToEdit) {
    setEditionMode(true);
    setUserEditing(userToEdit);
    setShowTable(false);
  }
  function getCookie() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {

      let cookie = cookies[i].trim();

      if(cookie.startsWith(user.email + '=')){
        return cookie.substring(user.email.length + 1)
      }
    }

    return null;
  }

  function getData() {
    let cookie = getCookie()
    console.log('dados var usuario ' + cookie)
    fetch(urlUser, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${cookie}`
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (Array.isArray(result)) {
          console.log(result)
          setListUsers(result);
        } else {
          window.alert(result.message);
        }
      });
  }

  return (
    <Pagina>
      <Container className="border m-6">
        <Alert variant={'secondary'} className="text-center m-3">
          <font size="6">
            <strong>Cadastro de Usuários</strong>
          </font>
        </Alert>

        {showSpinner ? (
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '25px',
              fontWeight: 'bolder',
              fontStretch: 'extra-expanded',
              backgroundColor: 'rgba(255,255,255,.8)',
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              color: '#c6c6c6',
            }}
          >
            <div
              style={{ height: '100%' }}
              className="d-flex justify-content-center align-items-center"
            >
              <span className="sr-only p-3">Carregando...</span>
              <Spinner
                animation="border"
                style={{ fontSize: '2rem', color: '#c6c6c6' }}
                role="status"
              ></Spinner>
            </div>
          </div>
        ) : showTable ? (
          <TabelaUsuarios
            changeScreen={changeValueOnClick}
            listUsers={listUser}
            setListUsers={setListUsers}
            setEditionMode={setEditionMode}
            prepareUserToEdition={prepareUserToEdition}
            setExcluded={setExcluded}
            excluded={excluded}
            getData={getData}
          />
        ) : (
          <FormCadUser
            changeScreen={changeValueOnClick}
            listUser={listUser}
            setListUsers={setListUsers}
            editionMode={editionMode}
            setEditionMode={setEditionMode}
            userEditing={userEditing}
            setUserEditing={setUserEditing}
          />
        )}
      </Container>
    </Pagina>
  );
}
