import FormMotoboy from "../formularios/FormMotoboy";
import { Container } from "react-bootstrap";
import TabelaMotoboys from "../tabelas/tabelaMotoboys";
import { useState, useEffect } from "react";
import Pagina from "../templates/Pagina";
import { urlBase } from "../utilitarios/definicoes";

export default function TelaCadastroMotoboys(props){
    const [motoboys, setMotoboys] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [motoboyEmEdicao, setMotoboyEmEdicao] = useState({
        nome: "",
        endereco: "",
        cpf: "",
        codigo: "",
        telefone: "",
        dataCadastro: "",
        codPedido: ""
    });
    
    useEffect(()=>{
        fetch(urlBase, {method:"GET"})
        .then((resposta)=>{return resposta.json()})
        .then((dados)=>{
            if (Array.isArray(dados)){
                setMotoboys(dados);
            }
            else{
                window.alert("Erro ao fazer requisição do dados! Tente novamente")
            }
        });
    },[]);

    function prepararMotoboyEdicao(motoboy){
        setModoEdicao(true);
        setMotoboyEmEdicao(motoboy);
        setExibirTabela(false);
    }
    
    function excluirMotoboy(motoboy) {
        if (window.confirm("Confirmar exclusão?")) {
          fetch(urlBase, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(motoboy)
          })
            .then((resposta) => resposta.json())
            .then((resposta) => {
              window.alert("Doador excluído!");
      
              setMotoboys((antigos) =>
                antigos.filter((v) => v.codigo !== motoboy.codigo)
              );
            })
            .catch((erro) => {
              window.alert("Erro ao excluir motoboy: " + erro.message);
            });
        }
      }
     
    return (
        <>
            {
                exibirTabela? 
                <Pagina>
                    <Container id="brasao">
                    <TabelaMotoboys listaMotoboys={motoboys}
                                        setMotoboys={setMotoboys}
                                        exibirTabela={setExibirTabela}
                                        editarMotoboy={prepararMotoboyEdicao}
                                        excluir={excluirMotoboy}/> 
                    </Container>
                </Pagina>
                    :
                <Pagina>
                    <Container id="brasao">
                        <FormMotoboy listaMotoboys={motoboys} 
                                        setMotoboys={setMotoboys} 
                                        exibirTabela={setExibirTabela} 
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao} 
                                        motoboy={motoboyEmEdicao}
                                        />
                    </Container>
                 </Pagina>
            }
        </>      
    );
}   