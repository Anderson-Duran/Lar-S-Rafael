import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ReactInputMask from "react-input-mask";
import { urlBase, urlBase3 } from '../utilitarios/definiçoes';
import CaixaSelecao from '../utilitarios/Combobox';

const boxcad_style = {
  padding: '2px',
  borderRadius: '10px',
  border: '2px solid black',
  width: '380px',
}

const boxcadall_style = {
  padding: '5px',
  borderRadius: '10px',
  border: '3px solid black',
  height: '610px'
}

export default function FormVisitante(props) {
  const [validated, setValidated] = useState(false);
  const [visitante, setVisitante] = useState(props.visitante);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState({});

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setVisitante({ ...visitante, [id]: valor });

  }


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        if(!props.modoEdicao){
          fetch(urlBase, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(visitante),
          })
            .then((resposta) => {
              return resposta.json();
            })
            .then((dados) => {
                props.setModoEdicao(false);
                fetch(urlBase, { method: "GET" })
                .then((resposta) => {
                  return resposta.json();
                })
                .then((listaVisitantes) => {
                  if (Array.isArray(listaVisitantes)) {
                    props.setVisitantes(listaVisitantes);
                  }
                })
                .catch((erro) => {
                    window.alert("Erro ao obter a lista de visitantes: " + erro.message);
                });
              window.alert(dados.mensagem);
            })
            .catch((erro) => {
              window.alert("Erro ao executar a requisição: " + erro.message);
            });
        }
        else{
          fetch(urlBase, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(visitante)
          }).then((resposta) => {
            return resposta.json();
          });
          window.alert("Atualizado com sucesso!");
          props.setModoEdicao(false);
          props.setVisitante(true);
        }
        
      props.exibirTabela(true);
    }
    setValidated(true);
  }
  


  return (
    <Form className='mt-5' id='cadastroVisitas' noValidate validated={validated} onSubmit={handleSubmit} style={boxcadall_style}>
      <hr />
      <div className='d-flex justify-content-center'><Form.Label className="fs-3 justify-content-center d-flex" style={boxcad_style}>Cadastro de Visitantes</Form.Label></div>
      <hr />
      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            required
            type="text"
            value={visitante.nome}
            id="nome"
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Insira um nome
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6">
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control
            required
            type="text"
            value={visitante.sobrenome}
            id="sobrenome"
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Insira um sobrenome
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>CPF</Form.Label>
          <ReactInputMask mask="999.999.999-99" maskChar="" value={visitante.cpf} onChange={manipularMudanca}>
            {() => <Form.Control type="text"
              placeholder="000.000.000-00"
              required
              id="cpf" />}
          </ReactInputMask>
          <Form.Control.Feedback type="invalid">
            Informe um CPF válido!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>RG</Form.Label>
          <Form.Control type="text"
            value={visitante.rg}
            required
            id="rg"
            onChange={manipularMudanca} />
          <Form.Control.Feedback type="invalid">
            Informe o RG!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Código</Form.Label>
          <Form.Control
            placeholder="Será gerado após cadastrar"
              disabled
              value={visitante.codigo}
              id="codigo" />
          <Form.Control.Feedback type="invalid">
            Informe o código do visitante!
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Telefone</Form.Label>
          <ReactInputMask mask='(99) 99999-9999' maskChar="" value={visitante.telefone} onChange={manipularMudanca}>
            {() => <Form.Control type="text"
              placeholder="(00) 00000-0000"
              required
              min="0"
              id="telefone" />}
          </ReactInputMask>
          <Form.Control.Feedback type="invalid">
            Informe o telefone!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Data de Cadastro</Form.Label>
          <Form.Control type="date"
            placeholder="00/00/0000"
            required
            value={visitante.dataCadastro}
            id="dataCadastro"
            onChange={manipularMudanca} />
          <Form.Control.Feedback type="invalid">
            Informe uma data válida!
          </Form.Control.Feedback>
        </Form.Group>





        <Form.Group as={Col} md="4">
          <Form.Label>Categoria</Form.Label>
          <CaixaSelecao endFonteDados={urlBase3}
                        campoChave={"codigoCat"}
                        campoExibicao={"descricao"}
                        funcaoSelecao={(itemSelecionado) => {
                          setCategoriaSelecionada(itemSelecionado);
                          setVisitante({ ...visitante, codCategoria: itemSelecionado.codigoCat });
                        }}
                        id="codCategoria"
          />
        </Form.Group>
      </Row>





      <Row className="mb-3">
        <Form.Group as={Col} md="12">
          <Form.Label>Observações  -  Se não houver deixar <strong>OK</strong></Form.Label>
          <Form.Control as="textarea"
            rows={3}
            required
            minLength={2}
            value={visitante.observacao}
            id="observacao"
            onChange={manipularMudanca} />
            <Form.Control.Feedback type="invalid">
              Preencha a observação, caso não tenha deixar OK
            </Form.Control.Feedback>
        </Form.Group>
      </Row>
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
          <Button type="submit" md={{ offset: 5 }}>Cadastrar</Button>
        </Col>
      </Row>
    </Form>
  );
}