import FormVisitante from "../formularios/FormVisitantes";
import { Container } from "react-bootstrap";
import TabelaVisitantes from "../tabelas/tabelaVisitantes";
import { useState, useEffect } from "react";
import Pagina from "../templates/Pagina";
import { urlVisitantes } from "../utilitarios/definicoes";

export default function TelaCadastroVisitantes(props){
    const [visitantes, setVisitantes] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [visitanteEmEdicao, setVisitanteEmEdicao] = useState({
        nome: "",
        sobrenome: "",
        cpf: "",
        rg: "",
        codigo: "",
        telefone: "",
        dataCadastro: "",
        codCategoria: "",
        observacao: ""
    });
    

    useEffect(()=>{
        fetch(urlVisitantes, {method:"GET"})
        .then((resposta)=>{return resposta.json()})
        .then((dados)=>{
            if (Array.isArray(dados)){
                setVisitantes(dados);
            }
            else{
                window.alert("Erro ao fazer requisição do dados! Tente novamente")
            }
        });
    },[]);


    function prepararVisitanteEdicao(visitante){
        setModoEdicao(true);
        setVisitanteEmEdicao(visitante);
        setExibirTabela(false);
    }
    
    function excluirVisitante(visitante) {
        if (window.confirm("Confirmar exclusão?")) {
          fetch(urlVisitantes, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(visitante)
          })
            .then((resposta) => resposta.json())
            .then((resposta) => {
              window.alert("Visitante excluído!");
      
              setVisitantes((antigos) =>
                antigos.filter((v) => v.codigo !== visitante.codigo)
              );
            })
            .catch((erro) => {
              window.alert("Erro ao excluir visitante: " + erro.message);
            });
        }
      }
      

    return (
        <>
            {
                exibirTabela? 
                <Pagina>
                    <Container id="brasao">
                    <TabelaVisitantes listaVisitantes={visitantes}
                                        setVisitantes={setVisitantes}
                                        exibirTabela={setExibirTabela}
                                        editarVisitante={prepararVisitanteEdicao}
                                        excluir={excluirVisitante}/> 
                    </Container>
                </Pagina>
                    :
                <Pagina>
                    <Container id="brasao">
                        <FormVisitante listaVisitantes={visitantes} 
                                        setVisitantes={setVisitantes} 
                                        exibirTabela={setExibirTabela} 
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao} 
                                        visitante={visitanteEmEdicao}
                                        />
                    </Container>
                 </Pagina>
            }
        </>      
    );
}