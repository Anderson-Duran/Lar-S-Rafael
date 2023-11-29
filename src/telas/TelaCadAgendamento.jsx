import FormAgendamento from "../formularios/FormAgendamento";
import { Container } from "react-bootstrap";
import TabelaAgendamentos from "../tabelas/tabelaAgendamento";
import { useState, useEffect } from "react";
import Pagina from "../templates/Pagina";
import { urlBase2 } from "../utilitarios/definiçoes";

export default function TelaCadastroAgendamentos(props){
    const [agendamentos, setAgendamentos] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [agendamentoEmEdicao, setAgendamentoEmEdicao] = useState({
        registro: "",
        data: "",
        horaEntrada: "",
        horaSaida: "",
        visitantes: []
    });
    

    useEffect(()=>{
        fetch(urlBase2, {method:"GET"})
        .then((resposta)=>{return resposta.json()})
        .then((dados)=>{
            if (Array.isArray(dados)){
                setAgendamentos(dados);
            }
            else{
                window.alert("Erro ao fazer requisição dos dados! Tente novamente")
            }
        });
    },[]);


    function prepararAgendamentoEdicao(agendamento){
        setModoEdicao(true);
        setAgendamentoEmEdicao(agendamento);
        setExibirTabela(false);
    }

    function excluirAgendamento(agendamento) {
        if (window.confirm("Confirmar exclusão?")) {
          fetch(urlBase2, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(agendamento),
          })
            .then((resposta) => resposta.json())
            .then((resposta) => {
              window.alert("Agendamento excluído!");
      
              setAgendamentos((antigos) =>
                antigos.filter((a) => a.registro !== agendamento.registro)
              );
            })
            .catch((erro) => {
              window.alert("Erro ao excluir agendamento: " + erro.message);
            });
        }
      }
      

    return (
        <>
            {
                exibirTabela? 
                <Pagina>
                    <Container id="brasao">
                    <TabelaAgendamentos listaAgendamentos={agendamentos}
                                        setAgendamentos={setAgendamentos}
                                        exibirTabela={setExibirTabela}
                                        editarAgendamento={prepararAgendamentoEdicao}
                                        excluir={excluirAgendamento}/> 
                    </Container>
                </Pagina>
                    :
                <Pagina>
                    <Container id="brasao">
                        <FormAgendamento listaAgendamentos={agendamentos} 
                                        setAgendamentos={setAgendamentos} 
                                        exibirTabela={setExibirTabela} 
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao} 
                                        agendamento={agendamentoEmEdicao}
                                        />
                    </Container>
                 </Pagina>
            }
        </>      
    );
}