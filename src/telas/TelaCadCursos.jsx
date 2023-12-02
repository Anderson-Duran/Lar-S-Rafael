import FormCursos from "../formularios/FormCursos";
import { Container } from "react-bootstrap";
import TabelaCursos from "../tabelas/tabelaCursos";
import { useState, useEffect } from "react";
import Pagina from "../templates/Pagina";
import { urlBase3 } from "../utilitarios/definicoes";

export default function TelaCadastroCursos(props){
    const [cursos, setCursos] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [cursoEmEdicao, setCursoEmEdicao] = useState({
        codigoCur: "",
        cursos: ""
    });
    

    useEffect(()=>{
        fetch(urlBase3, {method:"GET"})
        .then((resposta)=>{return resposta.json()})
        .then((dados)=>{
            if (Array.isArray(dados)){
                setCursos(dados);
            }
            else{
                window.alert("Erro ao fazer requisição do dados! Tente novamente")
            }
        });
    },[]);


    function prepararCursoEdicao(curso){
        setModoEdicao(true);
        setCursoEmEdicao(curso);
        setExibirTabela(false);
    }
    
    function excluirCurso(curso) {
        if (window.confirm("Confirmar exclusão?")) {
          fetch(urlBase3, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(curso)
          })
            .then((resposta) => resposta.json())
            .then((resposta) => {
              window.alert("Curso excluído!");
      
              setCursos((antigos) =>
                antigos.filter((c) => c.codigoCur !== curso.codigoCur)
              );
            })
            .catch((erro) => {
              window.alert("Erro ao excluir categoria: " + erro.message);
            });
        }
      }
      

    return (
        <>
            {
                exibirTabela? 
                <Pagina>
                    <Container id="brasao">
                    <TabelaCursos listaCursos={cursos}
                                        setCursos={setCursos}
                                        exibirTabela={setExibirTabela}
                                        editarCurso={prepararCursoEdicao}
                                        excluir={excluirCurso}/> 
                    </Container>
                </Pagina>
                    :
                <Pagina>
                    <Container id="brasao">
                        <FormCursos listaCursos={cursos} 
                                        setCursos={setCursos} 
                                        exibirTabela={setExibirTabela} 
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao} 
                                        curso={cursoEmEdicao}
                                        />
                    </Container>
                 </Pagina>
            }
        </>      
    );
}