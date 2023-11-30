import FormTurma from "../formularios/FormTurma";
import { Container } from "react-bootstrap";
import TabelaTurma from "../tabelas/tabelaTurma";
import { useState, useEffect } from "react";
import Pagina from "../templates/Pagina";
import { urlBase2 } from "../utilitarios/definiçoes";

export default function TelaCadastroTurmas(props){
    const [turmas, setTurmas] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [turmaEmEdicao, setTurmaEmEdicao] = useState({
        registro: "",
        data: "",
        horaEntrada: "",
        horaSaida: "",
        listaProfessores: []
    });
    

    useEffect(()=>{
        fetch(urlBase2, {method:"GET"})
        .then((resposta)=>{return resposta.json()})
        .then((dados)=>{
            if (Array.isArray(dados)){
                setTurmas(dados);
            }
            else{
                window.alert("Erro ao fazer requisição dos dados! Tente novamente")
            }
        });
    },[]);


    function prepararTurmaEdicao(turma){
        setModoEdicao(true);
        setTurmaEmEdicao(turma);
        setExibirTabela(false);
    }

    function excluirTurma(turma) {
        if (window.confirm("Confirmar exclusão?")) {
          fetch(urlBase2, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(turma),
          })
            .then((resposta) => resposta.json())
            .then((resposta) => {
              window.alert("Turma excluída!");
      
              setTurmas((antigos) =>
                antigos.filter((a) => a.registro !== turma.registro)
              );
            })
            .catch((erro) => {
              window.alert("Erro ao excluir turma: " + erro.message);
            });
        }
      }
      

    return (
        <>
            {
                exibirTabela? 
                <Pagina>
                    <Container id="brasao">
                    <TabelaTurma listaTurmas={turmas}
                                        setTurmas={setTurmas}
                                        exibirTabela={setExibirTabela}
                                        editarTurma={prepararTurmaEdicao}
                                        excluir={excluirTurma}/> 
                    </Container>
                </Pagina>
                    :
                <Pagina>
                    <Container id="brasao">
                        <FormTurma listaTurmas={turmas} 
                                        setTurmas={setTurmas} 
                                        exibirTabela={setExibirTabela} 
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao} 
                                        turma={turmaEmEdicao}
                                        />
                    </Container>
                 </Pagina>
            }
        </>      
    );
}