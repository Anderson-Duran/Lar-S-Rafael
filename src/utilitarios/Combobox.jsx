import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Form } from "react-bootstrap";


export default function CaixaSelecao({endFonteDados, campoChave, 
                                        campoExibicao, funcaoSelecao}){

    const [valorSelecionado, setValorSelecionado] = useState({
        [campoChave]: 0,
        [campoExibicao]: "Não foi possível obter os dados do servidor"});
    const [carregando, setCarregando] = useState(false);
    const [dados, setDados] = useState([]);

    useEffect(()=>{
        try{
            setCarregando(true);
            fetch(endFonteDados, {method:"GET"}).then((resposta)=>{
                if(resposta.ok){
                    return resposta.json();
                }
                else{
                    return ([{
                        [campoChave]: 0,
                        [campoExibicao]: "Não foi possível obter os dados do servidor"
                    }]);
                }
            }).then((listaDados) => {
                setCarregando(false);
                setDados(listaDados);
                if(listaDados.length > 0){
                    setValorSelecionado(listaDados[0]);
                    funcaoSelecao(listaDados[0]);
                }
            });
        } catch(erro){
            setCarregando(false);
            setDados([{
                [campoChave]: 0,
                [campoExibicao]: "Não foi possível obter os dados do servidor" + erro.message
            }]);
        }
    },[]);


    return(
        <Container>
            <Row>
                <Col md={11}>
                    <Form.Select value={valorSelecionado[campoChave]}
                                 onChange={(evento) =>{ 
                                    const itemSelecionado = evento.currentTarget.value;
                                    const pos = dados.map((item) => item[campoChave].toString()).indexOf(itemSelecionado);
                                    setValorSelecionado(dados[pos]);
                                    funcaoSelecao(dados[pos]);
                                 }}>
                        {
                            dados.map((item) => {
                                return <option key={item[campoChave]} value={item[campoChave]}> {item[campoExibicao]} </option>
                            })
                        }
                    </Form.Select>
                </Col>
                <Col md={1}>
                    <Spinner className={carregando?"visible":"invisible"}></Spinner>
                </Col>
            </Row>
        </Container>
    )
}