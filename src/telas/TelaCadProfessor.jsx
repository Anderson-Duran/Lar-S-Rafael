import FormProfessor from "../formularios/FormProfessor";
import { Container } from "react-bootstrap";
import TabelaProfessor from "../tabelas/tabelaProfessor";
import { useState, useEffect } from "react";
import Pagina from "../templates/Pagina";
import { urlBase } from "../utilitarios/definicoes";

export default function TelaCadastroProfessor(props){
    const [professor, setProfessor] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [professorEmEdicao, setProfessorEmEdicao] = useState({
        nome: "",
        cpf: "",
        codigo: "",
        telefone: "",
        codCurso: ""
    });
    

    useEffect(()=>{
        fetch(urlBase, {method:"GET"})
        .then((resposta)=>{return resposta.json()})
        .then((dados)=>{
            if (Array.isArray(dados)){
                setProfessor(dados);
            }
            else{
                window.alert("Erro ao fazer requisição do dados! Tente novamente")
            }
        });
    },[]);


    function prepararProfessorEdicao(professor){
        setModoEdicao(true);
        setProfessorEmEdicao(professor);
        setExibirTabela(false);
    }
    
    function excluirProfessor(professor) {
        if (window.confirm("Confirmar exclusão?")) {
          fetch(urlBase, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(professor)
          })
            .then((resposta) => resposta.json())
            .then((resposta) => {
              window.alert("Professor excluído!");
      
              setProfessor((antigos) =>
                antigos.filter((v) => v.codigo !== professor.codigo)
              );
            })
            .catch((erro) => {
              window.alert("Erro ao excluir professor: " + erro.message);
            });
        }
      }
      

    return (
        <>
            {
                exibirTabela? 
                <Pagina>
                    <Container id="brasao">
                    <TabelaProfessor listaProfessores={professor}
                                        setProfessor={setProfessor}
                                        exibirTabela={setExibirTabela}
                                        editarProfessor={prepararProfessorEdicao}
                                        excluir={excluirProfessor}/> 
                    </Container>
                </Pagina>
                    :
                <Pagina>
                    <Container id="brasao">
                        <FormProfessor listaProfessores={professor} 
                                        setProfessor={setProfessor} 
                                        exibirTabela={setExibirTabela} 
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao} 
                                        professor={professorEmEdicao}
                                        />
                    </Container>
                 </Pagina>
            }
        </>      
    );
}