import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { urlBase, urlBase2 } from '../utilitarios/definiçoes';
import CaixaSelecao from '../utilitarios/Combobox';
import TabelaVisitantesSelecionados from './tabelaVisitantesSelecionados';

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

export default function FormAgendamento(props) {
  const [validated, setValidated] = useState(false);
  const [agendamento, setAgendamento] = useState(props.agendamento);
  const [visitanteSelecionado, setVisitanteSelecionado] = useState({});
  const [listaVisitantesSelecionados, setListaVisitantesSelecionados]= useState([]);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setAgendamento({...agendamento,[id]: valor,});
  };

  function validarData(){
    const dataInserida = new Date(agendamento.data);
    const dataAtual = new Date();
    if(dataInserida < dataAtual){
      alert('Informe uma data válida!');
      setAgendamento({...agendamento,data: ''});
    }
  };

  function validarHoraSaida(){
      const horaEntrada = agendamento.horaEntrada;
      const horaSaida = agendamento.horaSaida;
          if (horaEntrada && horaSaida && horaSaida <= horaEntrada) {
            alert('A hora de saída deve ser maior do que a hora de entrada.');
            setAgendamento({...agendamento,horaSaida: '',});
          }
  };

  useEffect(() => {
    if (props.agendamento.visitante) {
      setVisitanteSelecionado(props.agendamento.visitante.nome);
    }
  }, [props.agendamento]);


  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        if(!props.modoEdicao){
          let listaVisitante = [];
          for(const visitante of listaVisitantesSelecionados){
            listaVisitante.push({
              visitante:{codigo: visitante.codigo}
            })
          }
          fetch(urlBase2, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "registro"    : agendamento.registro,
              "data"        : agendamento.data,
              "horaEntrada" : agendamento.horaEntrada,
              "horaSaida"   : agendamento.horaSaida,
              "visitantes"  : listaVisitante
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
                .then((listaAgendamentos) => {
                  if (Array.isArray(listaAgendamentos)) {
                    props.setAgendamentos(listaAgendamentos);
                  }
                })
                .catch((erro) => {
                    window.alert("Erro ao obter a lista de agendamentos: " + erro.message);
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
            body: JSON.stringify(agendamento)
          }).then((resposta) => {
            return resposta.json();
          });
          window.alert("Atualizado com sucesso!");
          props.setModoEdicao(false);
          props.listaAgendamento(true);
        }
        
      props.exibirTabela(true);
    }
    setValidated(true);
  }


  return (
    <Form className='mt-5' id='cadastroVisitas' noValidate validated={validated} onSubmit={handleSubmit} style={boxcadall_style}>
      <hr />

      <div className='d-flex justify-content-center'><Form.Label className="fs-3 justify-content-center d-flex" style={boxcad_style}>Agendamento de Visitas</Form.Label></div>
      <hr />
      <Row className="mb-3">
        <Form.Group as={Col} md="3">
          <Form.Label>Número de Registro</Form.Label>
          <Form.Control
            placeholder="Será gerado após agendar"
              disabled
              value={agendamento.registro}
              id="registro" />
        </Form.Group>

        <Form.Group as={Col} md="3">
          <Form.Label>Data</Form.Label>
          <Form.Control type="date"
            placeholder="00/00/0000"
            required
            value={agendamento.data}
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
            value={agendamento.horaEntrada}
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
            value={agendamento.horaSaida}
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
            <Form.Label>Visitante</Form.Label>
            <CaixaSelecao endFonteDados={urlBase}
                          campoChave={"codigo"}
                          campoExibicao={"nome"}
                          funcaoSelecao={setVisitanteSelecionado} />
        </Form.Group>
      </Row>
      <br/>
      <Row>
        <Col md={1}>
          <Form.Label>Código</Form.Label>
          <Form.Control type="text"
                        value={visitanteSelecionado.codigo}
                        name="codigo"
                        disabled />
        </Col>
        <Col md={2}>
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text"
                        value={visitanteSelecionado.nome}
                        name="nome"
                        disabled />
        </Col>
        <Col md={2}>
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control type="text"
                        value={visitanteSelecionado.sobrenome}
                        name="sobrenome"
                        disabled />
        </Col>
        <Col md={2}>
          <Form.Label>CPF</Form.Label>
          <Form.Control type="text"
                        value={visitanteSelecionado.cpf}
                        name="cpf"
                        disabled />
        </Col>
        <Col md={1}>
          <br />
          <Button onClick={()=>{
            setListaVisitantesSelecionados([...listaVisitantesSelecionados, visitanteSelecionado])
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
          </Button>
        </Col>
      </Row>
      <br/>
      <Row>
        <TabelaVisitantesSelecionados listaVisitantes={listaVisitantesSelecionados}
                                      dadosAgendamento={agendamento}
                                      setAgendamento={setAgendamento}
                                      setListaVisitantes={setListaVisitantesSelecionados} />
      </Row>



      <br/>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Aceito os termos e condições"
          feedback="É necessário aceitar os termos para prosseguir"
          feedbackType="invalid"
        />
      </Form.Group>
      <Row className="m-3">
        <Col md="10">
          <Button variant="secondary" type="button" onClick={() => { props.exibirTabela(true)}}>Voltar</Button>
        </Col>
        <Col md="1">
          <Button type="submit" md={{ offset: 5 }}>Agendar</Button>
        </Col>
      </Row>
    </Form>
  );
}