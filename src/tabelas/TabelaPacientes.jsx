import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { Row, Container, Col, Form } from 'react-bootstrap';
import { useState } from 'react';
import { urlBase } from '../assets/definicoes';
import ModalCustom from '../templates/modal/ModalCustom.jsx';
import HelpModal from '../templates/help/HelpModal.jsx';
import '../templates/modal/style.css'




function TablePacients(props) {


    const titleString = "Para que serve este formulário"



    const [localPacients, setLocalPacients] = useState(props.listPacients);
    const [modalOpen, setModalOpen] = useState(false);

    function setModalState() {
        setModalOpen(!modalOpen);
    }


    function print() {
        window.print();
    }


    function formatDate(date) {
        var newDate = new Date(date);
        var day = newDate.getUTCDate();
        var month = newDate.getUTCMonth() + 1;
        var year = newDate.getFullYear();

        var formatedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year.toString()}`;
        return formatedDate
    }

    function deletePacient(pacient) {
        fetch(urlBase, {
            method: "DELETE",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(pacient)
        }).then(res => res.json())
            .then(result => {
                if (result.status === true) {
                    props.setUpdatingBD(!props.updatingBD);
                    window.alert(result.message);
                    const cleaningList = localPacients.filter(el => el.cpf !== pacient.cpf)
                    setLocalPacients(cleaningList);
                    props.setListPacients(cleaningList);

                }
                else {
                    window.alert(result.message);
                }
            })

    }

    function filterPacients(event) {
        const term = event.currentTarget.value;
        const searchResult = props.listPacients.filter(pacient => pacient.name.toLowerCase().includes(term.toLowerCase()));
        setLocalPacients(searchResult);
    }


    return (

        <Container id='table' className="m-0">
            <Row className='mb-3'>
                <Col>
                    <Form.Control type="text" id="termoBusca" onChange={filterPacients} placeholder='Buscar' />
                </Col>

            </Row>
            <Table id='tablePrint' striped bordered hover className='text-center '>
                <thead>
                    <tr>
                        <th>CPF</th>
                        <th>Nome</th>
                        <th className='shit'>Genero</th>
                        <th>Data Nasc</th>
                        <th>Tutor</th>
                        <th>Logradouro</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>Telefone</th>
                        <th id='actions'>Ações</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: 13 }}>
                    {
                        localPacients?.map((pacient, i) => {

                            return (
                                <tr key={pacient.cpf}>
                                    <td>{pacient.cpf}</td>
                                    <td>{pacient.name}</td>
                                    <td className='shit'>{pacient.sex}</td>
                                    <td>{formatDate(pacient.birthDate)}</td>
                                    <td>{pacient.responsable}</td>
                                    <td>{pacient.address}</td>
                                    <td>{pacient.neighborhood}</td>
                                    <td>{pacient.city}</td>
                                    <td>{pacient.state}</td>
                                    <td>{pacient.phone}</td>
                                    <td id='btn'>
                                        <Button onClick={() => { props.preparePacientToEdition(pacient) }} className='btn-success'>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-pencil"
                                                viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                            </svg>
                                        </Button>

                                        {' '}

                                        <Button onClick={() => {
                                            if (window.confirm('Deseja realmente excluir este paciente?')) {
                                                deletePacient(pacient);
                                            }
                                        }
                                        } className='btn-danger'>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-trash3"
                                                viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                            </svg>
                                        </Button>
                                        {'  '}
                                        <ModalCustom pacient={pacient} />
                                    </td>

                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
            <Container className='d-flex justify-content-end gap-2 mb-3'>
                <Button id='btn' onClick={print}>Imprimir</Button>
                {' '}
                <Button className='btn btn-info text-light' onClick={setModalState}>Ajuda</Button>
                {' '}
                <HelpModal isOpen={modalOpen} onClose={setModalState} title={titleString} />
                {' '}
                <Button id='btn' onClick={props.changeScreen}>Cadastrar</Button>

            </Container>

        </Container>
    );
}


export default TablePacients;
