import TabelaPrestador from "../tabelas/TabelaPrestadores";
import FormularioPrestador from "../formularios/FormularioPrestador";
import { useState, useEffect } from "react";
import { urlBaseSugest } from "../utilitarios/definiçoes";

export default function TelaCadPrestador(props){

    const [prestadores, setPrestadores] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [prestadorEmEdicao, setPrestadorEmEdicao] = useState({
        'ID': "",
        'nome': "",
        'telefone': "",
        'sugestoes': []
    });

    function edicaoPrestador(prestador){
        setAtualizando(true);
        setPrestadorEmEdicao(prestador);
        setExibirTabela(false);
        setModoEdicao(true);

    }

    function apagarPrestador(prestador){
        if (window.confirm("Deseja excluir o prestador?")) {
            fetch(urlBaseSugest+"/prestadores", {
                method:"DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(prestador)
            }).then((resposta)=>{
                return resposta.json();
            }).then((retorno)=>{
                if (retorno.mensagem){
                    alert("Prestador excluído");
                    setExibirTabela(false);
                }
                else{
                    alert("Não foi possível excluir")
                }
            })
        }
    }

    useEffect(()=>{
        fetch(urlBaseSugest+"/prestadores", {
            method:"GET"
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados)=>{
            if (Array.isArray(dados)){
                setPrestadores(dados);
            }
            else{

            }        
        });
    },[exibirTabela]);


    return(
        <>
                {   
                exibirTabela ?
                <TabelaPrestador
                listaPrestadores = {prestadores}
                exibirTabela     = {setExibirTabela}
                setPrestador     = {setPrestadores}
                apagarPrestador  = {apagarPrestador}
                setModoEdicao    = {setModoEdicao}
                setPrestadorEmEdicao = {setPrestadorEmEdicao}
                editarPrestador  = {edicaoPrestador} />
                :
                <FormularioPrestador
                listaPrestadores = {prestadores}
                exibirTabela     = {setExibirTabela}
                setPrestador     = {setPrestadores}
                setModoEdicao    = {setModoEdicao}
                modoEdicao       = {modoEdicao}
                atualizando      = {atualizando}
                prestadorEmEdicao = {prestadorEmEdicao}
                setPrestadorEmEdicao = {setPrestadorEmEdicao} />

                }
        </>
    )
}