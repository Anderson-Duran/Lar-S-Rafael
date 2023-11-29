
import React, { useContext, useState } from 'react';
import { Table, Button, Row, Container, Col, Form } from 'react-bootstrap';
import { urlBase } from '../assets/definicoes';
import '../templates/modal/style.css';
import { AuthContext } from '../contextos/authContext.js';
import HelpUserModal from '../templates/help/HelpUserModal.jsx';


const titleString = "Para que serve este formulário";

function TabelaUsuarios(props) {
  const [localUsuarios, setLocalUsuarios] = useState(props.listUsers);
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  function getCookie() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {

      let cookie = cookies[i].trim();

      if (cookie.startsWith(user.email + '=')) {
        return cookie.substring(user.email.length + 1)
      }
    }

    return null;
  }

  function deleteUsuario(usuario) {

    let token = getCookie();

    fetch(urlBase, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(usuario),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === true) {
          window.alert(result.message);
          const cleaningList = localUsuarios.filter((el) => el.id !== usuario.id);
          setLocalUsuarios(cleaningList);
          props.setListUsuarios(cleaningList);
        } else {
          window.alert(result.message);
        }
      });
  }

  function filterUsuarios(event) {
    const term = event.currentTarget.value;
    const searchResult = props.listUsers.filter((usuario) =>
      usuario.name.toLowerCase().includes(term.toLowerCase())
    );
    setLocalUsuarios(searchResult);
  }

  function setModalState() {
    setModalOpen(!modalOpen);
  }
  function print() {
    window.print();
  }

  return (
    <Container id="" className="m-0">
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            id="termoBusca"
            onChange={filterUsuarios}
            placeholder="Buscar"
          />
        </Col>
      </Row>
      <Table striped bordered hover className="text-center ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Administrador</th>
            <th className='shit'>Actions</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: 13 }}>
          {localUsuarios?.map((usuario, i) => {
            return (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.isAdmin ? 'Sim' : 'Não'}</td>
                <td id='btn'>
                  <Button
                    onClick={() => {
                      props.prepareUserToEdition(usuario);
                    }}
                    className="btn-success"
                  >
                    Editar
                  </Button>
                  {'  '}
                  <Button
                    onClick={() => {
                      if (
                        window.confirm('Are you sure you want to delete this user?')
                      ) {
                        deleteUsuario(usuario);
                      }
                    }}
                    className="btn-danger"
                  >
                    Deletar
                  </Button>


                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Container className="d-flex gap-3 justify-content-end mb-3 position-relative shit">
        <Button id='btn'className='me-n5' onClick={print}>Imprimir</Button>
        <HelpUserModal className='shit' isOpen={modalOpen} onClose={setModalState} title={titleString} />
        <Button className='btn btn-info text-light shit' onClick={setModalState}>Ajuda</Button>
        {'  '}
        <Button className='me-5 shit' onClick={props.changeScreen}>Cadastrar Usuário</Button>
        {''}


      </Container>
    </Container>
  );
}

export default TabelaUsuarios;
