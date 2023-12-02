import React, { useState } from 'react';
import { Table, Button, Form, Container, Modal } from "react-bootstrap";
import { urlBase3 } from "../utilitarios/definicoes";


export default function TabelaCursos(props) {
    const [showHelpModal, setShowHelpModal] = useState(false)

    function imprimir() {
        window.print();
    }

    function filtrarCursos(e) {
        const termoBusca = e.currentTarget.value;

        fetch(urlBase3, { method: "GET" })
            .then((resposta) => { return resposta.json() })
            .then((listaCursos) => {
                if (Array.isArray(listaCursos)) {
                    const resultado = listaCursos.filter((curso) => curso.cursos.toLowerCase().includes(termoBusca.toLowerCase()));
                    props.setCursos(resultado);
                }
            });
    }

    function exibirAjudaModal() {
        setShowHelpModal(true);
    }

    function fecharAjudaModal() {
        setShowHelpModal(false);
    }

    return (
        <Container className="mt-5 mb-5">
            <h3 className="d-flex justify-content-center align-items-center">Cursos Cadastrados</h3>

            <Container className="d-flex justify-content-end align-items-center mt-1">
                <Button id="btnHelp" onClick={exibirAjudaModal} className="btn btn-primary">
                    <strong>AJUDA
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-raised-hand" viewBox="0 0 16 16">
                            <path d="M6 6.207v9.043a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H6.236a.998.998 0 0 1-.447-.106l-.33-.165A.83.83 0 0 1 5 2.488V.75a.75.75 0 0 0-1.5 0v2.083c0 .715.404 1.37 1.044 1.689L5.5 5c.32.32.5.754.5 1.207" />
                            <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                        </svg>
                    </strong>
                </Button>
            </Container>

            <Container className="d-flex mt-4 mb-3">
                <Form.Control type="text"
                    id="termoBusca"
                    onChange={filtrarCursos}>
                </Form.Control>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Cursos</th>
                        <th id='btnAcao'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaCursos?.map((curso) => {
                            return <tr key={curso.codigoCur}>
                                <td>{curso.codigoCur}</td>
                                <td>{curso.cursos}</td>
                                <td id='btnCaixa'>
                                    <div className="d-flex">
                                        <Button id='btnEdita' variant="info" onClick={() => { props.editarCurso(curso) }}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg> </Button>
                                        <Button id='btnExclui' variant="danger" onClick={() => { props.excluir(curso) }} className="ms-2"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg> </Button>
                                    </div>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </Table>

            <Modal show={showHelpModal} onHide={fecharAjudaModal}>
                <Modal.Header closeButton>
                    <Modal.Title><strong><center>Para que serve este Formulário?</center></strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Este formulário permite gerenciar e cadastrar Cursos. Estes são os recursos:
                    <br></br>
                    <br></br>
                    <strong>Cadastrar Curso</strong>
                    <br></br>
                    Utilizando o botão Cadastrar, você acessa o formulário, onde você irá inserir todos os dados necessários para cadastrar um novo Curso.
                    <br></br>
                    <br></br>
                    <strong>Editar</strong>
                    <br></br>
                    Você utiliza o botão com uma imagem de lapis, cujo irá redirecionar você ao formulário do Curso selecinado e então fará as alterações do Curso já cadastrado.
                    <br></br>
                    <br></br>
                    <strong>Excluir</strong>
                    <br></br>
                    Você utiliza o botão com a imagem de uma lixeira para pode fazer a excluzão do Curso selecionado.
                    <br></br>
                    <br></br>
                    <strong>Pesquisa</strong>
                    <br></br>
                    Você utiliza a barra de pesquisa para poder vizualizar apenas o Curso que você estiver buscando.
                    <br></br>
                    <br></br>
                    <strong>PDF</strong>
                    <br></br>
                    Você utiliza o botão com a imagem de PDF, localizado abaixo do botão de Cadastrar. Selecionando o botão PDF você pode baixar os dados de todos os Cursos cadastrados.

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={fecharAjudaModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>


            <Container className="d-flex justify-content-end align-items-center mt-5">
                <Button id='btnCad' onClick={() => {
                    props.exibirTabela(false);
                }} variant="primary">Cadastrar</Button>
            </Container>

            <Container className="d-flex justify-content-end align-items-center mt-1">
                <Button id="btnImprimir" onClick={imprimir} className="btn btn-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-filetype-pdf" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                    </svg>
                </Button>
            </Container>


        </Container>
    );
}