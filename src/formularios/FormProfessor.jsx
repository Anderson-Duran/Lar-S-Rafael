import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ReactInputMask from "react-input-mask";
import { urlBase, urlBase3 } from '../utilitarios/definicoes';
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
  height: '435px'
}

export default function FormProfessor(props) {
  const [validated, setValidated] = useState(false);
  const [professor, setProfessor] = useState(props.professor);
  const [cursoSelecionada, setCursoSelecionada] = useState({});

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setProfessor({ ...professor, [id]: valor });

  }


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (!props.modoEdicao) {
        fetch(urlBase, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(professor),
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
              .then((listaProfessores) => {
                if (Array.isArray(listaProfessores)) {
                  props.setProfessor(listaProfessores);
                }
              })
              .catch((erro) => {
                window.alert("Erro ao obter a lista de Professores: " + erro.message);
              });
            window.alert(dados.mensagem);
          })
          .catch((erro) => {
            window.alert("Erro ao executar a requisição: " + erro.message);
          });
      }
      else {
        fetch(urlBase, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(professor)
        }).then((resposta) => {
          return resposta.json();
        });
        window.alert("Atualizado com sucesso!");
        props.setModoEdicao(false);
        props.setProfessor(true);
      }

      props.exibirTabela(true);
    }
    setValidated(true);
  }



  return (
    <Form className='mt-5' id='cadastroProfessores' noValidate validated={validated} onSubmit={handleSubmit} style={boxcadall_style}>
      <hr />
      <div className='d-flex justify-content-center'><Form.Label className="fs-3 justify-content-center d-flex" style={boxcad_style}>Cadastro de Professores</Form.Label></div>
      <hr />

      <Row className="mb-3">

        <Form.Group as={Col} md="4">
          <Form.Label>Código</Form.Label>
          <Form.Control
            placeholder="Será gerado após cadastrar"
            disabled
            value={professor.codigo}
            id="codigo" />
          <Form.Control.Feedback type="invalid">
            Informe o código do Professor!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            required
            type="text"
            value={professor.nome}
            id="nome"
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Insira um nome
          </Form.Control.Feedback>
        </Form.Group>

      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>CPF</Form.Label>
          <ReactInputMask mask="999.999.999-99" maskChar="" value={professor.cpf} onChange={manipularMudanca}>
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
          <Form.Label>Telefone</Form.Label>
          <ReactInputMask mask='(99) 99999-9999' maskChar="" value={professor.telefone} onChange={manipularMudanca}>
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
          <Form.Label>Cursos</Form.Label>
          <CaixaSelecao endFonteDados={urlBase3}
            campoChave={"codigoCur"}
            campoExibicao={"cursos"}
            funcaoSelecao={(itemSelecionado) => {
              setCursoSelecionada(itemSelecionado);
              setProfessor({ ...professor, codCurso: itemSelecionado.codigoCur });
            }}
            id="codCurso"
            value={professor.codCurso}
          />
        </Form.Group>

      </Row>

      

      <Row className="m-3">
        <Col md="10">
          <Button variant="secondary" type="button" onClick={() => { props.exibirTabela(true) }}>Voltar</Button>
        </Col>
        <Col md="1">
          <Button type="submit" md={{ offset: 5 }}>Cadastrar</Button>
        </Col>
      </Row>
    </Form>
  );
}