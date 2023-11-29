import React, { useContext, useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import { Container, Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";
import SearchBar from "../templates/searchBar/SearchBar";
import { PacientsContext } from "../contextos/pacientsContext";
import SelectionBox from "../templates/selectionBox/SelectionBox.jsx";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";



export default function Medicines(props) {

    const url = "https://back-fsii.vercel.app/cadastroRemedio/medicines";
    const navigate = useNavigate();

    const { pacients } = useContext(PacientsContext)
    const [objectSelected, setObjectSelected] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [medName, setMedName] = useState('');
    const [medicine, setMedicine] = useState({
        ...props.medicineEditing,
    })



    useEffect(() => {

        if (props.location.state) {

            console.log('location', props.location.state)

            setMedicine({
                ...medicine,
                pacientName: { ...props.location.state[1] },
                id: props.location.state[0].id,
                medicineName: props.location.state[0].medicineName,
                medicineDosage: props.location.state[0].medicineDosage,
                medicineHours: props.location.state[0].medicineHours,
                medicineHours2: props.location.state[0].medicineHours2,
                medicineHours3: props.location.state[0].medicineHours3,
                medicineDateStart: props.location.state[0].medicineDateStart,
                medicineDateEnd: props.location.state[0].medicineDateEnd,
                medicineObservation: props.location.state[0].medicineObservation
            });
            setIsEditing(!isEditing);
        }

    }, [props.location.state])


    const handleSubmit = (e) => {


        handleBar(medicine)
        console.log({ ...medicine })

        isEditing ?
            (
                fetch(url, {
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ ...medicine })
                }).then(async (response) => {
                    if (response.ok) {
                        setMedicine({ ...props.medicineEditing });
                        navigate('/cadastroPacientes');
                    }
                    return await response.json()
                }).then(data => console.log(data))
            )
            :
            (
                fetch(url, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ ...medicine })
                }).then(async (response) => {
                    if (response.ok) {

                        setMedicine({ ...props.medicineEditing });

                        if (!window.confirm('Deseja adicionar mais alguma medicação? Clique OK pra SIM, CANCEL pra NÃO')) {

                            navigate('/cadastroPacientes');
                        }
                    }
                    return await response.json()
                }).then(data => console.log(data))
            )





        e.preventDefault()
        e.stopPropagation()
    }


    const handleChange = (event) => {
        let element = document.getElementById(`${event.currentTarget.id}`);
        setMedicine({
            ...medicine, [element.id]: element.value
        })

    }

    const handleBar = (medicine) => {
        if (!isEditing) {
            setMedicine(
                medicine.pacientName = { ...objectSelected }
            )
            setMedicine(
                medicine.medicineName = medName
            )
        }
        else {
            setMedicine(
                medicine.pacientName = props.location.state[1]
            )
            setMedicine(
                medicine.medicineName = medName
            )
        }

    }


    return (

        <Container className="" >
            {medicine.medicineName === '' && isEditing ? <Spinner /> :
                <Form onSubmit={handleSubmit} >
                    <hr />
                    <Form.Group as={Col} md={12} className="m-auto mb-3" >
                        <Form.Label>Paciente</Form.Label>
                        {isEditing ? <div>{props.location.state[1].name}</div> :
                            <SearchBar
                                id='searchBar'
                                selectFunction={setObjectSelected}
                                data={pacients}
                                placeholder={'Informe o nome do paciente'}
                                keyField={'cpf'}
                                searchField={'name'}
                                style={isEditing ? { display: 'none' } : {}}
                                value={isEditing ? props.location.state[1] : objectSelected}
                            />
                        }
                    </Form.Group>
                    <Row className="mb-3">

                        <Form.Group as={Col} md={6} controlId="medicineName">
                            <Form.Label>
                                Nome da Medicação
                            </Form.Label>
                            {!isEditing ?
                                <SelectionBox
                                    source={"https://back-fsii.vercel.app/listaRemedios/"}
                                    dataKey={"id"}
                                    exhibitionField={"name"}
                                    selectFunction={setMedName}
                                /> :
                                <p>
                                    {props.location.state[0].medicineName}
                                </p>

                            }

                        </Form.Group>
                        <Form.Group as={Col} md={6} controlId="medicineDosage">
                            <Form.Label>
                                Dosagem
                            </Form.Label>
                            <Form.Control
                                placeholder="Ex:1/2 Comprimido"
                                value={medicine.medicineDosage}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                    </Row>
                    <Row>

                        <Form.Group as={Col} md={2} controlId="medicineHours">
                            <Form.Label>
                                1º Horário
                            </Form.Label>
                            <ReactInputMask
                                mask={"99:99"}
                                value={medicine.medicineHours}
                                onChange={handleChange}
                                required
                            >
                                {(inputProps) => <Form.Control
                                    placeholder="Ex: 07:00"
                                    {...inputProps}
                                />
                                }
                            </ReactInputMask>
                        </Form.Group>

                        <Form.Group as={Col} md={2} controlId="medicineHours2">
                            <Form.Label>
                                2º Horario
                            </Form.Label>
                            <ReactInputMask
                                value={medicine.medicineHours2}
                                onChange={handleChange}
                                mask={"99:99"}
                            >
                                {
                                    (inputProps) => <Form.Control
                                        placeholder="Ex: 15:00"
                                        {...inputProps}
                                    />
                                }

                            </ReactInputMask>
                        </Form.Group>

                        <Form.Group as={Col} md={2} controlId="medicineHours3">
                            <Form.Label>
                                3º Horário
                            </Form.Label>
                            <ReactInputMask
                                mask={'99:99'}
                                value={medicine.medicineHours3}
                                onChange={handleChange}
                            >
                                {
                                    (inputProps) => <Form.Control
                                        placeholder="Ex: 23:00"
                                        {...inputProps}
                                    />
                                }
                            </ReactInputMask>
                        </Form.Group>

                        <Form.Group as={Col} md={3} controlId="medicineDateStart">
                            <Form.Label>
                                Data Inicio
                            </Form.Label>
                            <Form.Control
                                type="date"
                                value={medicine.medicineDateStart}
                                required
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md={3} controlId="medicineDateEnd">
                            <Form.Label>
                                Data Fim
                            </Form.Label>
                            <Form.Control
                                type="date"
                                value={medicine.medicineDateEnd}
                                required
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md={12} className="mt-5 mb-5">

                            <FloatingLabel label="Digite aqui suas observações">
                                <Form.Control
                                    id="medicineObservation"
                                    as="textarea"
                                    value={medicine.medicineObservation}
                                    onChange={handleChange}
                                    placeholder="Digite aqui suas observações"
                                    style={{ height: '100px' }}
                                />
                            </FloatingLabel>

                        </Form.Group>
                    </Row>

                    <Row className="mb-5 flex bg-red justify-content-end me-2">
                        <Button
                            className="btn"
                            style={{ width: "100px", marginRight: '15px' }}
                            type="submit"
                            variant="primary">{isEditing ? "Atualizar" : "Cadastrar"}
                        </Button>
                        <Button
                            className="btn"
                            style={{ width: "100px" }}
                            onClick={() => {
                                navigate('/')
                            }}
                            variant="primary">Voltar
                        </Button>
                    </Row>
                </Form>}
        </Container>
    )
}