import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";

export default function CaixaSelecao({enderecoDado,
                                     campoChave, 
                                     campoExibicao, 
                                     funcaoSelecao}) {
    const [valorSelecionado, setValorSelecionado] = useState({
        [campoChave]:0,
        [campoExibicao]: "Não foi possível retornar dados"
    });

    const [carregandoDados, setCarregandoDados] = useState(false)
    const [dados, setDados] = useState([]);

    useEffect(()=>{
        try {
            setCarregandoDados(true);
            fetch(enderecoDado, {method:"GET"}).then((resposta)=>{
                if (resposta.ok){
                    return resposta.json();
                }
                else {
                    return ([{
                            [campoChave]: 0,
                            [campoExibicao]: "Não foi possível retornar dados"
                            }]);
                    }
            }).then((listadados) =>{
                setCarregandoDados(false)
                setDados(listadados)
                if (listadados.length > 0){
                    setValorSelecionado(listadados[0]);
                    funcaoSelecao(listadados[0])
                }
                });
        } catch(erro){
            setCarregandoDados(false)
            setDados([{
                        [campoChave]: 0,
                        [campoExibicao]: "Não foi possível retornar dados: "+erro.message
                     }]);
        }
    }, [])

    return(
        <Container border="true">
            <Row>
                <Col md={11}>
                    <Form.Select
                                 onChange={(evento) => {
                                    const itemSelecionado = evento.currentTarget.value;
                                    const pos = dados.map((item)=> item[campoChave].toString()).indexOf(itemSelecionado);
                                    setValorSelecionado(dados[pos]);
                                    funcaoSelecao(dados[pos]);
                                }}>
                        {
                            dados.map((item)=>{
                                return <option key={item[campoChave]}
                                                value={item[campoChave]}>
                                                {item[campoExibicao]}
                                        </option>
                            })
                        }

                    </Form.Select>
                </Col>

                <Col d={1}>
                    <Spinner className={carregandoDados?"visible":"invisible"}></Spinner>
                </Col>
            </Row>
        </Container>

    );

}