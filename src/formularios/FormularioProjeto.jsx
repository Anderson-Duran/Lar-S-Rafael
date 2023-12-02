import {Container, Form, FormGroup, Button, FormLabel} from "react-bootstrap";
import BarraBusca from "../utilitarios/BarrabuscaSugest";
import { useEffect, useState } from "react";
import '../Estilizacao/Estilo.css';
import Pagina from "../templates/Pagina";
import { urlBaseSugest } from "../utilitarios/definiçoes";

export default function Formulario(props){

  function manipulaMudanca(e){
    const alvo = e.target.name;
    setSugestao({ ...sugestao, [alvo]: e.target.value});
  }

  const [sugestao, setSugestao] = useState(props.projetoEmEdicao)
  const [lista, setLista] = useState([]);
  const [sugestaoSelecionada, setSugestaoSelecionada] = useState({});
  const [validated, setValidate] = useState(false);

  useEffect(()=>{
    fetch(urlBaseSugest+"/sugestoes", 
          {method: "GET"})
          .then((resposta)=> {
            return resposta.json();
          })
          .then((dados)=>{
            setLista(dados);
    })
    .catch((erro)=>{
      alert("Não foi possível recuperar os dados do backend: "+erro)
    });
  },[])
  
  function gravarProjeto(event){
    const form = event.currentTarget;

    if (form.checkValidity()){
      if (!props.modoEdicao) {
        fetch(urlBaseSugest+"/projetos",
        {method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "responsavel": sugestao.responsavel,
          "descricao":sugestao.descricao,
          "autor": sugestaoSelecionada.nome,
          "sugestao": sugestaoSelecionada
        })}
        ).then((resposta)=> {
            return resposta.json();
        }).then((dados)=>{
          if (dados.status) {
              setSugestao({...sugestao, ID: dados.ID});
              let projetos = props.listaProjetos
              projetos.push(sugestao);
              props.setProjeto(projetos);
              props.exibirTabela(true); 
          }
          window.alert(dados.mensagem)
        }).catch((erro)=>{
          alert("Não foi possível cadastrar: " +erro.message)
        })
    }
    else {
          fetch(urlBaseSugest+"/projetos",{
            method:"PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(sugestao)
            }).then(()=>{
            props.setModoEdicao(false);
            alert("Atualizado com sucesso!");
            props.exibirTabela(true);
            }).then(()=>{
            window.location.reload();
        });
    }
    setValidate(false);
  }
    else {
      setValidate(true);
    }
    event.preventDefault();
    event.stopPropagation();
  }

    return (
      <Pagina>
        <Container>
          <div className="cabecalho">
            <h2 className="text-center ms-5">Cadastro de Projetos</h2>
          </div>
          <Form id="cadastroProjeto" noValidate validated={validated} onSubmit={gravarProjeto}>
                <Form.Group className="mb-3">
                    <Form.Label>ID</Form.Label>
                    <Form.Control value={sugestao.ID} disabled/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Responsável</Form.Label>
                    <Form.Control type="text"
                                  name="responsavel" 
                                  value={sugestao.responsavel} 
                                  onChange={manipulaMudanca} 
                                  required/>
                        <Form.Control.Feedback type="invalid">Insira um responsável</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descrição da Ação</Form.Label>
                    <Form.Control type="text"
                                  name="descricao" 
                                  rows={3} 
                                  value={sugestao.descricao} 
                                  onChange={manipulaMudanca} 
                                  required />
                        <Form.Control.Feedback type="invalid">Insira uma ação</Form.Control.Feedback>                               
                    </Form.Group>
                  
                <FormGroup className="mb-3">
                    <FormLabel>Pesquise pela sugestão</FormLabel>
                    <BarraBusca 
                        placeHolder={"Pesquise por uma sugestão"}
                        dados={lista}
                        campoChave={"ID"}
                        campoBusca={"sugestao"}
                        funcaoSelecao={setSugestaoSelecionada}
                        valor={""}>
                    </BarraBusca>
                </FormGroup>

                <Form.Group className="mb-3">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control type="text"
                                  name="autor"
                                  value={sugestaoSelecionada.nome} 
                                  onChange={manipulaMudanca} 
                                  required
                                  disabled/>
                        <Form.Control.Feedback type="invalid">Insira um autor</Form.Control.Feedback>
                </Form.Group>
                
                

                <Button onClick={gravarProjeto} className="mt-3" variant="primary" type="submit"> Cadastrar</Button>
                {' '}
                <Button className="mt-3" variant="dark" type="button" onClick={()=>{
                  props.exibirTabela(true)
                }}>Voltar</Button>
            </Form>
        </Container>
      </Pagina>
    );

}