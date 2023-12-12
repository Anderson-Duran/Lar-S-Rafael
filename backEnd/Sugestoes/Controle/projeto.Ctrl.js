import Projeto from "../Modelo/Projeto.js";
import Sugestao from "../Modelo/Sugestao.js";

export default class ProjetoCTRL{

    gravar(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method === "POST" &&  requisicao.is('application/json')){
            const dados = requisicao.body;
            const responsavel = dados.responsavel;
            const descricao = dados.descricao;
            const autor = dados.autor;
            const idsugestao = dados.sugestao.ID;
            const sugestao = new Sugestao(idsugestao);
                if (sugestao){
                    if(responsavel && descricao && autor && sugestao){
                        const poject = new Projeto(0, responsavel, descricao, autor, sugestao);
                        poject.gravar().then(()=>{
                            resposta.status(200).json({
                                status:true,
                                ID: poject.ID,
                                mensagem: "Projeto gravado"
                            });
                        }).catch((erro) =>{
                            resposta.status(500).json({
                                status:false,
                                mensagem: erro.message
                            });
                        });
        
                    }
                    else{
                        resposta.status(400).json({
                            status: false,
                            mensagem:"Informe todos os dados do projeto"
        
                        });
                    }

                }
                else{
                    resposta.json({
                        status: false,
                        mensagem: "Sugestão não encontrada!"
                    })
                }
                  
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido. Por favor, consulte a documentação"
            });
        }
    }

    atualizar(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method === "PUT" &&  requisicao.is('application/json')){
            const dados = requisicao.body;
            const ID = dados.ID
            const responsavel = dados.responsavel;
            const descricao = dados.descricao;
            const autor = dados.autor;
            const idsugestao = dados.sugestao.ID;
            const sugestao = new Sugestao(0,"")

            if(ID && responsavel && descricao && autor && sugestao){
                const project = new Projeto(0, responsavel, descricao, autor, sugestao);
                project.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Projeto atualizado"
                    });
                })
                .catch((erro) =>{
                        resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    });
                });

            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem:"Informe todos os dados do projeto"

                });
            }

        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido. Consulte a documentação"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const {ID, responsavel, descricao, autor, sugestao} = dados;
            
            if(ID){
                const project = new Projeto(ID, responsavel, descricao, autor, sugestao);
                project.remover().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Projeto excluído."
                    });
                })
                .catch((erro) =>{
                        resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    });
                });

            }
            else{
                resposta.status(400).json({
                    status: false,
                    mensagem:"Informe todos os dados do projeto"

                });
            }

        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido. Consulte a documentação"
            });
        }
    }

    consultar(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method === "GET"){
            const termo = requisicao.query.termo||"";
            const project = new Projeto();
            project.consulta(termo).then((projetos)=>{
                resposta.status(200).json(projetos);
            })
            .catch((erro) =>  {
                    resposta.status(500).json({
                    status:false,
                    mensagem: erro
                });
            });
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Método não permitido. Consulte a documentação"
            });
        }
    }

}