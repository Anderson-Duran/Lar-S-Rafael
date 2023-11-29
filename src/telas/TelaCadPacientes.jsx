import React from 'react';
import { Container, Alert, Spinner } from 'react-bootstrap';
import TablePacients from '../tabelas/TabelaPacientes';
import FormPaciente from '../formularios/FormPaciente';
import { useContext, useState, useEffect } from 'react';
import Pagina from '../templates/Pagina';
import { PacientsContext } from '../contextos/pacientsContext';
import { urlBase } from '../assets/definicoes';

export default function TelaCadPacientes(props) {
    const [showTable, setShowTable] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);
    const { pacients, updatingBD, setUpdatingBD } = useContext(PacientsContext);
    const [listPacients, setListPacients] = useState(pacients);
    const [editionMode, setEditionMode] = useState(false);
    const [excluded, setExcluded] = useState(false);
    const [pacientEditing, setPacientEditing] = useState({
        cpf: '',
        name: '',
        responsable: '',
        sex: '',
        birthDate: '',
        zipCode: '',
        address: '',
        neighborhood: '',
        city: '',
        state: '',
        phone: '',
    });

    useEffect(() => {

        setShowSpinner(true);

        setTimeout(() => {
            setShowSpinner(false);
        }, 700);

        try {
            getData()
            setListPacients(pacients);
        } catch (error) {
            console.log(error)
        }


    }, []);

    function changeValueOnClick() {
        setShowSpinner(true);


        setTimeout(() => {
            setShowTable(!showTable);
            setShowSpinner(false);
        }, 800);
    }

    function preparePacientToEdition(pacient) {
        setEditionMode(true);
        setPacientEditing(pacient);
        setShowTable(false);
    }


    function getData() {
        fetch(urlBase, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' },
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                if (Array.isArray(result)) {
                    setListPacients(result);
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
                        <strong>Cadastro de Pacientes</strong>
                    </font>
                </Alert>

                {showSpinner ? (
                    <div style={{ fontFamily: 'monospace', fontSize: '25px', fontWeight: 'bolder', fontStretch: 'extra-expanded', backgroundColor: 'rgba(255,255,255,.8)', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', color: '#c6c6c6' }}>
                        <div style={{ height: '100%' }} className="d-flex justify-content-center align-items-center" >
                            <span className="sr-only p-3">Carregando...</span>
                            <Spinner animation="border" style={{ fontSize: '2rem', color: '#c6c6c6' }} role="status" >
                            </Spinner>
                        </div>
                    </div>
                ) : showTable ? (
                    <TablePacients
                        changeScreen={changeValueOnClick}
                        listPacients={listPacients}
                        setListPacients={setListPacients}
                        setEditionMode={setEditionMode}
                        preparePacientToEdition={preparePacientToEdition}
                        setExcluded={setExcluded}
                        excluded={excluded}
                        setUpdatingBD={setUpdatingBD}
                        updatingBD={updatingBD}
                        getData={getData}
                    />
                ) : (
                    <FormPaciente
                        changeScreen={changeValueOnClick}
                        listPacients={listPacients}
                        setListPacients={setListPacients}
                        editionMode={editionMode}
                        setEditionMode={setEditionMode}
                        pacientEditing={pacientEditing}
                        setPacientEditing={setPacientEditing}
                    />
                )}
            </Container>
        </Pagina>
    );
}
