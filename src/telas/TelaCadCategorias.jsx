import FormCategorias from "../formularios/FormCategoria";
import { Container } from "react-bootstrap";
import TabelaCategorias from "../tabelas/tabelaCategorias";
import { useState, useEffect } from "react";
import Pagina from "../templates/Pagina";
import { urlBase3 } from "../utilitarios/definicoes";

export default function TelaCadastroCategorias(props){
    const [categorias, setCategorias] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [categoriaEmEdicao, setCategoriaEmEdicao] = useState({
        codigoCat: "",
        descricao: "",
        abrangentes: ""
    });
    

    useEffect(()=>{
        fetch(urlBase3, {method:"GET"})
        .then((resposta)=>{return resposta.json()})
        .then((dados)=>{
            if (Array.isArray(dados)){
                setCategorias(dados);
            }
            else{
                window.alert("Erro ao fazer requisição do dados! Tente novamente")
            }
        });
    },[]);


    function prepararCategoriaEdicao(categoria){
        setModoEdicao(true);
        setCategoriaEmEdicao(categoria);
        setExibirTabela(false);
    }
    
    function excluirCategoria(categoria) {
        if (window.confirm("Confirmar exclusão?")) {
          fetch(urlBase3, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoria)
          })
            .then((resposta) => resposta.json())
            .then((resposta) => {
              window.alert("Categoria excluída!");
      
              setCategorias((antigos) =>
                antigos.filter((c) => c.codigoCat !== categoria.codigoCat)
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
                    <TabelaCategorias listaCategorias={categorias}
                                        setCategorias={setCategorias}
                                        exibirTabela={setExibirTabela}
                                        editarCategoria={prepararCategoriaEdicao}
                                        excluir={excluirCategoria}/> 
                    </Container>
                </Pagina>
                    :
                <Pagina>
                    <Container id="brasao">
                        <FormCategorias listaCategorias={categorias} 
                                        setCategorias={setCategorias} 
                                        exibirTabela={setExibirTabela} 
                                        modoEdicao={modoEdicao}
                                        setModoEdicao={setModoEdicao} 
                                        categoria={categoriaEmEdicao}
                                        />
                    </Container>
                 </Pagina>
            }
        </>      
    );
}