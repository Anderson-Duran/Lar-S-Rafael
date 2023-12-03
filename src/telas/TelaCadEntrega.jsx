import FormEntrega from "../formularios/FormEntrega";
import { Container } from "react-bootstrap";
import TabelaEntregas from "../tabelas/tabelaEntrega";
import { useState, useEffect } from "react";
import Pagina from "../templates/Pagina";
import { urlBase2 } from "../utilitarios/definiçoes";

export default function TelaCadastroEntregas(props){
    const [entregas, setEntregas] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [entregaEmEdicao, setEntregaEmEdicao] = useState({
        registro: "",
        listaMotoboy: [],
        data: "",
        horaEntrada: "",
        horaSaida: ""
    });
    
    useEffect(()=>{
        fetch(urlBase2, {method:"GET"})
        .then((resposta)=>{return resposta.json()})
        .then((dados)=>{
            if (Array.isArray(dados)){
                setEntregas(dados);
            }
            else{
                window.alert("Erro ao fazer requisição dos dados! Tente novamente")
            }
        });
    },[]);

    function prepararEntregaEdicao(entrega){
        setModoEdicao(true);
        setEntregaEmEdicao(entrega);
        setExibirTabela(false);
    }

    function excluirEntrega(entrega) {
        if (window.confirm("Confirmar exclusão?")) {
          fetch(urlBase2, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entrega),
          })
            .then((resposta) => resposta.json())
            .then((resposta) => {
              window.alert("Excluido com sucesso!");
      
              setEntregas((antigos) =>
                antigos.filter((a) => a.registro !== entrega.registro)
              );
            })
            .catch((erro) => {
              window.alert("Erro ao excluir : " + erro.message);
            });
        }
      }
      
    return (
        <>
            {
                exibirTabela? 
                <Pagina>
                    <Container id="brasao">
                    <TabelaEntregas listaEntregas={entregas}
                                        setEntregas={setEntregas}
                                        exibirTabela={setExibirTabela}
                                        editarEntrega={prepararEntregaEdicao}
                                        excluir={excluirEntrega}/> 
                    </Container>
                </Pagina>
                    :
                <Pagina>
                    <Container id="brasao">
                        <FormEntrega listaEntregas={entregas} 
                                        setEntregas={setEntregas} 
                                        exibirTabela={setExibirTabela} 
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao} 
                                        entrega={entregaEmEdicao}
                                        />
                    </Container>
                 </Pagina>
            }
        </>      
    );
}