import TabelaProjetos from "../tabelas/TabelaProjetos";
import Formulario from "../formularios/FormularioProjeto";
import { useState, useEffect} from "react";
import { urlBaseSugest } from "../utilitarios/definiçoes";

export default function TelaCadProjeto(props) {
    const [projeto, setProjeto] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [projetoEmEdicao, setProjetoEmEdicao] = useState({
        'ID': '',
        'responsavel': '',
        'descricao': '',
        'autor': '',
        'sugestao': ''
    })

    function edicaoProjeto(projeto){
        setAtualizando(true);
        setProjetoEmEdicao(projeto);
        setExibirTabela(false);
        setModoEdicao(true);
    }

    function apagarProjetos(projeto){
        if (window.confirm("Deseja excluir o projeto?")) {
            fetch(urlBaseSugest+"/projetos", {
                method:"DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(projeto)
            }).then((resposta)=>{
                return resposta.json();
            }).then((retorno)=>{
                if (retorno.mensagem){
                    alert("Projeto excluído");
                    setExibirTabela(false);
                }
                else{
                    alert("Não foi possível excluir")
                }
            })
        }
    }

    useEffect(()=>{
        fetch(urlBaseSugest+"/projetos", {
            method:"GET"
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados)=>{
            if (Array.isArray(dados)){
                setProjeto(dados);
            }
            else{

            }        
        });
    },[exibirTabela]);

    return(
        <>
            { 
                exibirTabela ?
                <TabelaProjetos
                listaProjeto  = {projeto}
                exibirTabela  = {setExibirTabela}
                setProjeto    = {setProjeto}
                apagarProjeto = {apagarProjetos}
                setProjetoEmEdicao = {setProjetoEmEdicao}
                setModoEdicao = {setModoEdicao}
                edicaoProjeto = {edicaoProjeto} />
                :
                <Formulario
                listaProjetos = {projeto}
                exibirTabela  = {setExibirTabela}
                setProjeto    = {setProjeto}
                projetoEmEdicao = {projetoEmEdicao}
                setProjetoEmEdicao = {setProjetoEmEdicao}
                atualizando   = {atualizando}
                modoEdicao    = {modoEdicao}
                setModoEdicao = {setModoEdicao} />
            }


        </>
    )
}