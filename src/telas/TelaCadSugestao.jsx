import FormSugestao from "../formularios/FormularioSugest";
import TabelaSugest from "../tabelas/TabelaSugest";
import { urlBaseSugest } from "../utilitarios/definiçoes";
import { useState, useEffect} from "react";

export default function TelaCadSugest(props){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [sugestaos, setSugestao] = useState([]);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizando, setAtualizando] = useState(false);
    const [sugestaoEmEdicao, setSugestaoEdicao] = useState({
        ID: "",
        nome: "",
        sobrenome:"",
        telefone: "",
        data: "",
        sugestao: ""
    })


    function edicaoSugestao(sugestao){
        setAtualizando(true);
        setSugestaoEdicao(sugestao);
        setExibirTabela(false);
        setModoEdicao(true);
    }

    function apagarSugestao(sugestao){
        if (window.confirm("Deseja deletar a sugestão?")){
            fetch(urlBaseSugest+"/sugestoes", {
                method:"DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(sugestao)
            }).then((resposta)=>{
                return resposta.json();
            }).then((retorno)=>{
                if (retorno.mensagem){
                    alert("Sugestão excluída");
                    setExibirTabela(false);
                }
                else{
                    alert("Não foi possível excluir")
                }
            })

        }  
    }

    useEffect(()=>{
        fetch(urlBaseSugest+"/sugestoes", {
            method:"GET"
        }).then((resposta)=>{
            return resposta.json();
        }).then((dados)=>{
            if (Array.isArray(dados)){
                setSugestao(dados);
            }
            else{

            }        
        });
    },[exibirTabela]);

    return(
        <>          
                {
                   exibirTabela ?
                   <TabelaSugest   listaSugest={sugestaos} 
                                   setSugestao={setSugestao}
                                   exibirTabela={setExibirTabela}
                                   editarSugestao={edicaoSugestao}
                                   excluirSugestao={apagarSugestao}
                                   setModoEdicao={setModoEdicao}
                                   edicaoSugest={setSugestaoEdicao}/> 
                   :
                    <FormSugestao listaSugest={sugestaos}
                                  setSugestao={setSugestao} 
                                  exibirTabela={setExibirTabela}
                                  modoEdicao={modoEdicao}
                                  setModoEdicao={setModoEdicao}
                                  atualizando={atualizando}
                                  sugestao={sugestaoEmEdicao}
                                  edicaoSugest={setSugestaoEdicao} />        
                }
                
        </>
    )
}