import Sugestao from "../Modelo/Sugestao.js";

export default class SugestaoCTRL{

    gravar(requisicao, resposta){
        resposta.type("application/json");
        if (requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const nome = dados.nome;
            const sobrenome = dados.sobrenome;
            const telefone = dados.telefone;
            const data = dados.data;
            const sugestao = dados.sugestao;
           
            if(nome && sobrenome && telefone && data && sugestao){
                const sugest = new Sugestao(0, nome, sobrenome, telefone, data, sugestao);
                sugest.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        ID: sugest.ID,
                        mensagem: "Sugestão gravada"
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
                    mensagem:"Informe todos os dados da sugestao"

                });
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
            const nome = dados.nome;
            const sobrenome = dados.sobrenome;
            const telefone = dados.telefone;
            const data = dados.data;
            const sugestao = dados.sugestao;

            if(ID && nome && sobrenome && telefone && data && sugestao){
                const sugest = new Sugestao(ID, nome, sobrenome, telefone, data, sugestao);
                sugest.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Sugestão atualizada"
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
                    mensagem:"Informe todos os dados do sugestao"

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
            const {ID, nome, sobrenome, telefone, data, sugest} = dados;

            if(ID){
                const sugestao = new Sugestao(ID, nome, sobrenome, telefone, data, sugest);
                sugestao.remover().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Sugestão excluída."
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
                    mensagem:"Informe todos os dados da sugestao"

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
            const sugestao = new Sugestao();
            sugestao.consulta(termo).then((sugestaos)=>{
                resposta.status(200).json(sugestaos);
            }).catch((erro) =>  {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro,
                    
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