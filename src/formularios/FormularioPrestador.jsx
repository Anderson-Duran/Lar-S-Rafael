import { Container, Form, Row, Col, FormLabel, Button} from "react-bootstrap";
import { useState, useEffect } from "react";
import '../Estilizacao/Estilo.css';
import CaixaSelecao from "../utilitarios/CaixaSelecao";
import TabelaItensSugestoes from "../tabelas/TabelaItens";
import Pagina from "../templates/Pagina";
import ReactInputMask from "react-input-mask";
import { urlBaseSugest } from "../utilitarios/definicoes";

export default function FormularioPrestador(props){

    const [validated, setValidate] = useState(false);
    const [sugestaoSelecionada, setSugestaoSelecionada] = useState({});
    //const [lista, setLista] = useState([]);
    const [listaDeSugestoes, setListaDeSugestoes] = useState([]);           //alteração setPrestador
    const [prestador, setPrestador] = useState(props.prestadorEmEdicao);

    function manipulaMudanca(e){
        const elemForm = e.currentTarget;
        const id = elemForm.id;
        const valor = elemForm.value;
        setPrestador({ ...prestador, [id]: valor});
        }

    function gravarPrestador(event){
        const form = event.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao){
            let listaDeItens = [];
            for (const item of listaDeSugestoes){
                listaDeItens.push({
                    ID: item.ID,
                    nome: item.nome,
                    sobrenome: item.sobrenome,
                    telefone: item.telefone,
                    data: item.data,
                    sugestao: item.sugestao
                    })
                }
            
            const update = {
                'nome'      : prestador.nome,
                'telefone'  : prestador.telefone,
                'sugestoes' : listaDeItens,
                };

            const options = {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(update),
                };

            fetch(urlBaseSugest+'/prestadores', options).then((resposta) =>{
                return resposta.json();
            }).then((dados)=>{
                if (dados.status) {
                    setPrestador({ ...prestador, ID: dados.ID});
                    props.setModoEdicao(false);
                    let prestadores = props.listaPrestadores;
                    prestadores.push({
                        'ID':       prestador.ID,
                        'nome':     prestador.nome,
                        'telefone': prestador.telefone
                    })
                    props.setPrestador(prestadores);
                    props.exibirTabela(true);
                }
                window.alert(dados.mensagem);
            }).catch((erro)=>{
                window.alert("Não foi possível cadastrar: " +erro.message);
                console.log(erro);
            })}

            else {
                fetch(urlBaseSugest+"/prestadores",{
                    method:"PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(prestador)
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

    //useEffect

    return (
        <Pagina>
            <Container>
                <div className="cabecalho">
                <h2 className="text-center ms-5">Cadastro de Prestador</h2>
                </div>
                <Form id="cadastroPrestador" onSubmit={gravarPrestador} noValidate validated={validated}>
                    <Row>
                        <Col>
                            <Form.Group as={Col}>
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    disabled
                                    id="ID"
                                    value={prestador.ID}
                                    onChange={manipulaMudanca}/>
                                </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col}>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="text"
                                    required
                                    id="nome"
                                    value={prestador.nome}
                                    onChange={manipulaMudanca}/>
                                    <Form.Control.Feedback type="invalid">Insira um nome</Form.Control.Feedback>
                                </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col}>
                                <Form.Label>Telefone</Form.Label>
                                <ReactInputMask
                                    mask={'(99) 99999-9999'}
                                    value={prestador.telefone}
                                    onChange={manipulaMudanca}>
                                    {()=><Form.Control
                                        className="mb-3"
                                        type="text"
                                        required
                                        id="telefone"
                                    />}
                                </ReactInputMask>
                                <Form.Control.Feedback type="invalid">Insira um número de Celular</Form.Control.Feedback>
                            </Form.Group>
                            
                        </Col>
                    </Row>  
            
                    <Row>
                        <Form.Label>Selecione no mínimo uma ação</Form.Label>
                        <CaixaSelecao 
                            enderecoDado={urlBaseSugest+'/sugestoes'}
                            campoChave={"ID"}
                            campoExibicao={"sugestao"}
                            funcaoSelecao={setSugestaoSelecionada}/>
                    </Row>

                <Container className="mt-4">
                    <Row>
                        <Col md={1}>
                            <FormLabel >Código:</FormLabel>
                            <Form.Control
                                    className="mb-3"
                                    value={sugestaoSelecionada.ID}
                                    type="text"
                                    id="codigo"
                                    disabled/>
                        </Col>
                        
                        <Col md={4}>
                            <FormLabel>Nome</FormLabel>
                            <Form.Control
                                    className="mb-3"
                                    value={sugestaoSelecionada.nome}
                                    type="text"
                                    id="nomeSelecionado"
                                    disabled/>
                        </Col>
                        <Col md={4}>
                            <FormLabel>Sugestão:</FormLabel>
                            <Form.Control
                                    className="mb-3"
                                    value={sugestaoSelecionada.sugestao}
                                    type="text"
                                    id="sugestaoSelecionada"
                                    disabled/>
                        </Col>
                        <Col md={2}>
                            <Button className="mt-4" onClick={()=>{
                                const item = {
                                    ID: sugestaoSelecionada.ID,
                                    nome: sugestaoSelecionada.nome,
                                    sobrenome: sugestaoSelecionada.sobrenome,
                                    telefone: sugestaoSelecionada.telefone,
                                    data: sugestaoSelecionada.data,
                                    sugestao: sugestaoSelecionada.sugestao
                                }
                                setListaDeSugestoes([...listaDeSugestoes, item]);
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-plus-fill" viewBox="0 0 16 16">
                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <TabelaItensSugestoes 
                            listaItens={listaDeSugestoes}
                            setPrestador={setPrestador}
                            dados={prestador}
                            setListaItens={setListaDeSugestoes}/>
                    </Row>
                </Container>
               
                        <Button className="mt-3" variant="primary" type="submit">Cadastrar</Button>
                        {" "}
                        <Button className="mt-3" variant="dark" type="button" onClick={()=>{
                            props.exibirTabela(true);
                        }}>Voltar</Button>
                </Form>
            </Container>
        </Pagina>
    )}