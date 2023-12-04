import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { urlBase, urlBase2 } from '../utilitarios/definiçoes';
import CaixaSelecao from '../utilitarios/Combobox';
import TabelaMotoboysSelecionados from './tabelaMotoboysSelecionados';

const boxcad_style = {
  padding: '2px',
  borderRadius: '10px',
  border: '2px solid black',
  width: '330px',
}

const boxcadall_style = {
  padding: '5px',
  borderRadius: '10px',
  border: '3px solid black',
  height: '500px'
}

export default function FormEntrega(props) {
  const [validated, setValidated] = useState(false);
  const [entrega, setEntrega] = useState(props.entrega);
  const [motoboySelecionado, setMotoboySelecionado] = useState({});
  const [listaMotoboysSelecionados, setListaMotoboysSelecionados]= useState([]);  

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setEntrega({...entrega,[id]: valor,});
  };

  function validarData(){
    const dataInserida = new Date(entrega.data);
    const dataAtual = new Date();
    if(dataInserida < dataAtual){
      alert('Informe uma data válida!');
      setEntrega({...entrega,data: ''});
    }
  };

  function validarHoraSaida(){
      const horaEntrada = entrega.horaEntrada;
      const horaSaida = entrega.horaSaida;
          if (horaEntrada && horaSaida && horaSaida <= horaEntrada) {
            alert('A hora de saída deve ser maior do que a hora de entrada.');
            setEntrega({...entrega,horaSaida: '',});
          }
  };

  useEffect(() => {
    if (props.entrega.motoboy) {
      setMotoboySelecionado(props.entrega.motoboy.nome);
    }
  }, [props.entrega]);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        if(!props.modoEdicao){
          let listaMotoboy = [];
          for(const motoboy of listaMotoboysSelecionados){
            listaMotoboy.push({
              motoboy:{codigo: motoboy.codigo}
            })
          }
          fetch(urlBase2, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "registro"    : entrega.registro,
              "data"        : entrega.data,
              "horaEntrada" : entrega.horaEntrada,
              "horaSaida"   : entrega.horaSaida,
              "motoboys"  : listaMotoboy
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
                .then((listaEntregas) => {
                  if (Array.isArray(listaEntregas)) {
                    props.setEntregas(listaEntregas);
                  }
                })
                .catch((erro) => {
                    window.alert("Erro ao obter a lista de {entregas: " + erro.message);
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
            body: JSON.stringify(entrega)
          }).then((resposta) => {
            return resposta.json();
          });
          window.alert("Atualizado com sucesso!");
          props.setModoEdicao(false);
          props.listaEntrega(true);
        }
      props.exibirTabela(true);
    }
    setValidated(true);
  }

  return (
    <Form className='mt-5' id='cadastroMotoboys' noValidate validated={validated} onSubmit={handleSubmit} style={boxcadall_style}>
      <hr />
      <div className='d-flex justify-content-center'><Form.Label className="fs-3 justify-content-center d-flex" style={boxcad_style}><strong>Cadastro de voluntarios</strong></Form.Label></div>
      <hr />
      <Row className="mb-3">
        <Form.Group as={Col} md="3">
          <Form.Label><strong>Número do ID</strong></Form.Label>
          <Form.Control
            placeholder="ID do voluntario"
              disabled
              value={entrega.registro}
              id="registro" />
        </Form.Group>

        <Form.Group as={Col} md="3">
          <Form.Label><strong>Data da ação</strong></Form.Label>
          <Form.Control type="date"
            placeholder="dd/mm/aaaa"
            required
            value={entrega.data}
            id="data"
            onChange={manipularMudanca}
            onBlur={validarData} />
          <Form.Control.Feedback type="invalid">
            Informe uma data válida!
          </Form.Control.Feedback>
        </Form.Group>
      
        <Form.Group as={Col} md="3">
          <Form.Label><strong>Hora de chegada</strong></Form.Label>
          <Form.Control
            required
            type="time"
            value={entrega.horaEntrada}
            id="horaEntrada"
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Insira a hora 
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3">
          <Form.Label><strong>Hora de saida</strong></Form.Label>
          <Form.Control
            required
            type="time"
            value={entrega.horaSaida}
            id="horaSaida"
            onChange={manipularMudanca}
            onBlur={validarHoraSaida}
          />
          <Form.Control.Feedback type="invalid">
            Insira a hora 
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      

      <Row>
        <Form.Group as={Col} md="6">
            <Form.Label><strong>Nome do voluntario</strong></Form.Label>
            <CaixaSelecao endFonteDados={urlBase}
                          campoChave={"codigo"}
                          campoExibicao={"nome"}
                          funcaoSelecao={setMotoboySelecionado} />
        </Form.Group>
      </Row>
      <br/>

      <Row>
        <Col md={1}>
          <Form.Label>ID</Form.Label>
          <Form.Control type="text"
                        value={motoboySelecionado.codigo}
                        name="codigo"
                        disabled />
        </Col>

        <Col md={2}>
          <Form.Label><strong>Nome completo</strong></Form.Label>
          <Form.Control type="text"
                        value={motoboySelecionado.nome}
                        name="nome"
                        disabled />
        </Col>
      
        <Col md={2}>
          <Form.Label><strong>CPF</strong></Form.Label>
          <Form.Control type="text"
                        value={motoboySelecionado.cpf}
                        name="cpf"
                        disabled />
        </Col>
        <Col md={1}>
          <br />
          <Button onClick={()=>{
            setListaMotoboysSelecionados([...listaMotoboysSelecionados, motoboySelecionado])
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
          </Button>
        </Col>
      </Row>
     
      <Row>
        <TabelaMotoboysSelecionados listaMotoboys={listaMotoboysSelecionados}
                                      dadosEntrega={entrega}
                                      setEntrega={setEntrega}
                                      setListaMotoboys={setListaMotoboysSelecionados} />
      </Row>
      
   <Row>
    <center>
          <Button variant="secondary" type="button" onClick={() => { props.exibirTabela(true)}}>Voltar</Button>
        
          <Button type="submit" md={{ offset: 5 }}>Cadastrar</Button>
        </center>
      </Row>
    </Form>
  );
}