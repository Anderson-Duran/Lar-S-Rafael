import FormPedidos from "../formularios/FormValor";
import { Container } from "react-bootstrap";
import TabelaPedidos from "../tabelas/tabelaValores";
import { useState, useEffect } from "react";
import Pagina from "../templates/Pagina";
import { urlBase6 } from "../utilitarios/definicoes";

export default function TelaCadastroPedidos(props){
    const [pedidos, setPedidos] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [pedidoEmEdicao, setPedidoEmEdicao] = useState({
        codigoPed: "",
        descricao: ""
    });
 
    useEffect(()=>{
        fetch(urlBase6, {method:"GET"})
        .then((resposta)=>{return resposta.json()})
        .then((dados)=>{
            if (Array.isArray(dados)){
                setPedidos(dados);
            }
            else{
                window.alert("Erro ao fazer requisição do dados! Tente novamente")
            }
        });
    },[]);

    function prepararPedidoEdicao(pedido){
        setModoEdicao(true);
        setPedidoEmEdicao(pedido);
        setExibirTabela(false);
    }
    
    function excluirPedido(pedido) {
        if (window.confirm("Confirmar exclusão?")) {
          fetch(urlBase6, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido)
          })
            .then((resposta) => resposta.json())
            .then((resposta) => {
              window.alert("Valor excluído!");
      
              setPedidos((antigos) =>
                antigos.filter((c) => c.codigoPed !== pedido.codigoPed)
              );
            })
            .catch((erro) => {
              window.alert("Erro ao excluir o pedido: " + erro.message);
            });
        }
      }

    return (
        <>
            {
                exibirTabela? 
                <Pagina>
                    <Container id="brasao">
                    <TabelaPedidos listaPedidos={pedidos}
                                        setPedidos={setPedidos}
                                        exibirTabela={setExibirTabela}
                                        editarPedido={prepararPedidoEdicao}
                                        excluir={excluirPedido}/> 
                    </Container>
                </Pagina>
                    :
                <Pagina>
                    <Container id="brasao">
                        <FormPedidos listaPedidos={pedidos} 
                                        setPedidos={setPedidos} 
                                        exibirTabela={setExibirTabela} 
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao} 
                                        pedido={pedidoEmEdicao}
                                        />
                    </Container>
                 </Pagina>
            }
        </>      
    );
}    