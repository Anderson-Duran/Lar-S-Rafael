import { useContext, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import ReactInputMask from "react-input-mask";
import React from "react";
import { PacientsContext } from "../contextos/pacientsContext";
import { urlBase } from "../assets/definicoes";



const boxcadall_style = {
    padding: '5px',
    borderRadius: '10px',
    border: '3px solid black',
    height: '535px'
}

export default function FormPaciente(props) {


    const [pacient, setPacient] = useState(props.pacientEditing);
    const [validated, setValidate] = useState(false);
    const { updatingBD, setUpdatingBD } = useContext(PacientsContext);
    const myHeaders = new Headers();
    myHeaders.append("Content-type", "application/json");




    const handleSubmit = (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === true) {

            if (props.editionMode === false) {
                fetch(urlBase, {
                    method: "POST",
                    headers: myHeaders,
                    body: JSON.stringify(pacient)
                }).then(res => res.json())
                    .then(result => {
                        window.alert(result.message);
                        setUpdatingBD(!updatingBD)
                        props.listPacients.push(pacient)
                        setTimeout(() => { props.changeScreen(true); }, 500)
                        setValidate(false);
                    })

            }
            else {

                fetch(urlBase, {
                    method: "PUT",
                    headers: myHeaders,
                    body: JSON.stringify(pacient)
                }).then(res => res.json())
                    .then(result => {
                        if (result.status === true) {
                            setUpdatingBD(!updatingBD);
                            window.alert(result.message);
                            const updatedList = props.listPacients.filter(element => element.cpf !== pacient.cpf);
                            updatedList.push(pacient);
                            props.setListPacients(updatedList);
                            props.changeScreen(true)
                            setValidate(false);
                            props.setEditionMode(false);
                            props.setPacientEditing({})
                        }
                        else {
                            window.alert(result.message);
                            props.changeScreen(true)
                            props.setEditionMode(false)
                            props.setPacientEditing({})
                        }
                    })

            }
        }
        else {
            setValidate(true);
        }
        event.preventDefault();
        event.stopPropagation();

    };


    function handleChange(event) {
        const element = document.getElementById(`${event.target.id}`);
        setPacient({ ...pacient, [element.id]: element.value });
    }


    function tryGetAddress() {
        let execute = true
        while (execute) {
            console.log(pacient.zipCode)
            if (pacient.zipCode.length === 9) {
                getAddress(pacient.zipCode);
            }
            execute = false
        }


    }

    async function getAddress(value) {
        if (value.length === 9) {
            const res = await fetch(`https://viacep.com.br/ws/${value}/json/`);
            const dados = await res.json();

            setPacient({
                ...pacient,
                address: dados.logradouro,
                neighborhood: dados.bairro,
                city: dados.localidade,
                state: dados.uf
            });

            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                if (input.id === 'address') {
                    input.value = pacient.address
                }
                if (input.id === 'neighborhood') {
                    input.value = pacient.neighborhood

                }
                if (input.id === 'city') {
                    input.value = pacient.city

                }
                if (input.id === 'state') {
                    input.value = pacient.state

                }
            });

        }
    }



    return (
        <Container className="mt-5" style={boxcadall_style}>
            <Form id="formElderly" className="me-auto" noValidate validated={validated} onSubmit={handleSubmit}>
                <hr />
                <div className="d-flex justify-content-center"><Form.Label className="fs-3 p-1 rounded-2 text-center border border-2 border-dark" >Dados do Paciente</Form.Label></div>
                <hr />
                <Container className="ms-2">
                    <Row className="mb-4 col-12 justify-content-center">
                        <Form.Group as={Col} md="2" controlId="cpf">
                            <Form.Label>CPF</Form.Label>
                            <ReactInputMask
                                mask={'999.999.999-99'}
                                disabled={props.editionMode ? true : false}
                                value={pacient.cpf}
                                onChange={handleChange}
                            >
                                {(inputProps) => <Form.Control
                                    type="text"
                                    placeholder="000.000.000-00"
                                    minLength={14}
                                    disabled={props.editionMode ? true : false}
                                    required
                                    {...inputProps}
                                />
                                }

                            </ReactInputMask>
                            <Form.Control.Feedback type="invalid">
                                Insira um CPF válido!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="name">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                onChange={handleChange}
                                placeholder="Nome"
                                value={pacient.name}
                            />
                            <Form.Control.Feedback type='invalid'>Insira um nome!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={2} controlId="sex">
                            <Form.Label>Gênero</Form.Label>
                            <Form.Select
                                required
                                onChange={handleChange}
                                value={pacient.sex}
                            >
                                <option defaultValue={''}>Escolha o gênero</option>
                                <option value='Masculino'>Masculino</option>
                                <option value='Feminino'>Feminino</option>

                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Insira o sexo do paciente!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="responsable">
                            <Form.Label>Tutor</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                onChange={handleChange}
                                placeholder="Nome"
                                value={pacient.responsable}
                            />
                            <Form.Control.Feedback type='invalid'>Insira o nome do responsável!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-4 col-12 justify-content-center">
                        <Form.Group as={Col} md={3} controlId="birthDate">
                            <Form.Label>Nascimento</Form.Label>
                            <Form.Control
                                type="date"
                                onChange={handleChange}
                                value={pacient.birthDate}
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="zipCode">
                            <Form.Label>CEP</Form.Label>
                            <ReactInputMask
                                mask='99999-999'
                                maskChar={''}
                                value={pacient.zipCode}
                                onChange={handleChange}
                                onBlur={tryGetAddress}
                            >
                                {(inputProps) => <Form.Control
                                    type="text"
                                    placeholder="CEP"
                                    required
                                    {...inputProps}
                                    value={pacient.zipCode}
                                />
                                }
                            </ReactInputMask>
                            <Form.Control.Feedback type="invalid">
                                Por favor insira um cep válido!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={4} controlId='address'>
                            <Form.Label>Endereco</Form.Label>
                            <Form.Control
                                type='text'
                                required
                                onChange={handleChange}
                                placeholder='Rua/ Avenida'
                                value={pacient.address}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Insira um endereço válido!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md={2} controlId='neighborhood'>
                            <Form.Label>Bairro</Form.Label>
                            <Form.Control
                                required
                                onChange={handleChange}
                                type='text'
                                placeholder='Bairro'
                                value={pacient.neighborhood}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Insira um bairro válido!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>


                    <Row className="mb-4 col-12 justify-content-center">
                        <Form.Group as={Col} md="6" controlId="city">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Cidade"
                                onChange={handleChange}
                                value={pacient.city}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor insira uma cidade válida.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="state">
                            <Form.Label>Estado</Form.Label>
                            <Form.Select
                                required
                                onChange={handleChange}
                                value={pacient.state}
                            >
                                <option value={null}>Selecione</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espírito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Por favor selecione um estado!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" className='mb-4' controlId='phone'>
                            <Form.Label>Telefone</Form.Label>
                            <ReactInputMask
                                mask={'(99) 99999-9999'}
                                onChange={handleChange}
                                value={pacient.phone}
                            >
                                {() => <Form.Control
                                    type='text'
                                    placeholder='Telefone'
                                    required

                                />}
                            </ReactInputMask>
                            <Form.Control.Feedback type='invalid'>
                                Insira um telefone válido!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Container>
                <hr />

                <Row as={Col} className="m-4 justify-content-end" md={6}>
                    <Button style={{ width: '6rem', marginRight: '4px' }} onClick={() => {
                        props.changeScreen();
                        props.setEditionMode(false);
                        props.setPacientEditing({});
                    }}>Voltar</Button>
                    <Button style={{ width: '6rem' }} type="submit">{props.editionMode ? 'Atualizar' : 'Gravar'}</Button>
                </Row>

            </Form >
            <div id="table">{props.children}</div>
        </Container >
    );
}