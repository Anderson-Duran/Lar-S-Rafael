import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { urlBase, urlBase2 } from '../utilitarios/definiçoes';
import CaixaSelecao from '../utilitarios/Combobox';
import TabelaProfessoresSelecionados from './tabelaProfessoresSelecionados';

const boxcad_style = {
  padding: '2px',
  borderRadius: '10px',
  border: '2px solid black',
  width: '350px',
}

const boxcadall_style = {
  padding: '5px',
  borderRadius: '10px',
  border: '3px solid black',
  height: '710px'
}

export default function FormTurma(props) {
  const [validated, setValidated] = useState(false);
  const [turma, setTurma] = useState(props.turma);
  const [professorSelecionado, setProfessorSelecionado] = useState({});
  const [listaProfessoresSelecionados, setListaProfessoresSelecionados]= useState([]);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setTurma({...turma,[id]: valor,});
  };

  function validarData(){
    const dataInserida = new Date(turma.data);
    const dataAtual = new Date();
    if(dataInserida < dataAtual){
      alert('Informe uma data válida!');
      setTurma({...turma,data: ''});
    }
  };

  function validarHoraSaida(){
      const horaEntrada = turma.horaEntrada;
      const horaSaida = turma.horaSaida;
          if (horaEntrada && horaSaida && horaSaida <= horaEntrada) {
            alert('A hora de saída deve ser maior do que a hora de entrada.');
            setTurma({...turma,horaSaida: '',});
          }
  };

  useEffect(() => {
    if (props.turma.professor) {
      setProfessorSelecionado(props.turma.professor.nome);
    }
  }, [props.turma]);


  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        if(!props.modoEdicao){
          let listaProfessores = [];
          for(const professor of listaProfessoresSelecionados){
            listaProfessores.push({
              professor:{codigo: professor.codigo}
            })
          }
          fetch(urlBase2, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "registro"    : turma.registro,
              "data"        : turma.data,
              "horaEntrada" : turma.horaEntrada,
              "horaSaida"   : turma.horaSaida,
              "professor"  : listaProfessores
            }),
          })
            .then((resposta) => {
              return resposta.json();
            })
            .then((dados) => {
                props.setModoEdicao(false);
                fetch(urlBase2, { method: "GET" })
                .then((resposta) => {
                  return resposta.json();
                })
                .then((listaTurmas) => {
                  if (Array.isArray(listaTurmas)) {
                    props.setTurmas(listaTurmas);
                  }
                })
                .catch((erro) => {
                    window.alert("Erro ao obter a lista de turmas: " + erro.message);
                });
              window.alert(dados.mensagem);
            })
            .catch((erro) => {
              window.alert("Erro ao executar a requisição: " + erro.message);
            });
        }
        else{
          fetch(urlBase2, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(turma)
          }).then((resposta) => {
            return resposta.json();
          });
          window.alert("Atualizado com sucesso!");
          props.setModoEdicao(false);
          props.listaTurmas(true);
        }
        
      props.exibirTabela(true);
    }
    setValidated(true);
  }


  return (
    <Form className='mt-5' id='cadastroTurmas' noValidate validated={validated} onSubmit={handleSubmit} style={boxcadall_style}>
      <hr />

      <div className='d-flex justify-content-center'><Form.Label className="fs-3 justify-content-center d-flex" style={boxcad_style}>Cadastro de Turmas</Form.Label></div>
      <hr />
      <Row className="mb-3">
        <Form.Group as={Col} md="3">
          <Form.Label>Registro</Form.Label>
          <Form.Control
            placeholder="Será gerado após cadastrar"
              disabled
              value={turma.registro}
              id="registro" />
        </Form.Group>

        <Form.Group as={Col} md="3">
          <Form.Label>Data</Form.Label>
          <Form.Control type="date"
            placeholder="00/00/0000"
            required
            value={turma.data}
            id="data"
            onChange={manipularMudanca}
            onBlur={validarData} />
          <Form.Control.Feedback type="invalid">
            Informe uma data válida!
          </Form.Control.Feedback>
        </Form.Group>
      
        <Form.Group as={Col} md="3">
          <Form.Label>Hora de Entrada</Form.Label>
          <Form.Control
            required
            type="time"
            value={turma.horaEntrada}
            id="horaEntrada"
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Insira a hora de entrada
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3">
          <Form.Label>Hora de Saída</Form.Label>
          <Form.Control
            required
            type="time"
            value={turma.horaSaida}
            id="horaSaida"
            onChange={manipularMudanca}
            onBlur={validarHoraSaida}
          />
          <Form.Control.Feedback type="invalid">
            Insira a hora de saída
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <br/>

      <Row>
        <Form.Group as={Col} md="6">
            <Form.Label>Professores</Form.Label>
            <CaixaSelecao endFonteDados={urlBase}
                          campoChave={"codigo"}
                          campoExibicao={"nome"}
                          funcaoSelecao= {setProfessorSelecionado} />
        </Form.Group>
      </Row>
      <br/>
      <Row>
        <Col md={1}>
          <Form.Label>Código</Form.Label>
          <Form.Control type="text"
                        value={professorSelecionado.codigo}
                        name="codigo"
                        disabled />
        </Col>

        <Col md={2}>
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text"
                        value={professorSelecionado.nome}
                        name="nome"
                        disabled />
        </Col>
        
        <Col md={2}>
          <Form.Label>CPF</Form.Label>
          <Form.Control type="text"
                        value={professorSelecionado.cpf}
                        name="cpf"
                        disabled />
        </Col>
        <Col md={1}>
          <br />
          <Button onClick={()=>{
            setListaProfessoresSelecionados([...listaProfessoresSelecionados, professorSelecionado])
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
          </Button>
        </Col>
      </Row>
      <br/>
      <Row>
        <TabelaProfessoresSelecionados listaProfessores={listaProfessoresSelecionados}
                                      dadosTurma={turma}
                                      setTurma={setTurma}
                                      setListaProfessores={setListaProfessoresSelecionados} />
      </Row>



      <br/>
      
      <Row className="m-3">
        <Col md="10">
          <Button variant="secondary" type="button" onClick={() => { props.exibirTabela(true)}}>Voltar</Button>
        </Col>
        <Col md="1">
          <Button type="submit" md={{ offset: 5 }}>Cadastrar</Button>
        </Col>
      </Row>
    </Form>
  );
}