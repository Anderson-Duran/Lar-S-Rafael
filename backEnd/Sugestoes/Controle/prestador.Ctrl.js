import Prestador from "../Modelo/Prestador.js";
import Sugestao from "../Modelo/Sugestao.js";

export default class PrestadorCTRL{
    gravar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const nome = dados.nome;
            const telefone = dados.telefone;
            const itens = dados.sugestoes;
            let sugestoes = []
            for (const item of itens){
                const sugest = new Sugestao(item.ID, item.nome, item.sobrenome, item.telefone, item.data, item.sugestao)
                sugestoes.push(sugest)
            }
            const prestador = new Prestador(0, nome, telefone, sugestoes)
            prestador.gravar().then(()=>{
                resposta.status(200).json({
                    status: true,
                    mensagem: 'Prestador gravado'
                });
            }).catch((erro)=>{
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            })
        }
        else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Método não permitido. Por favor, consulte a documentação"
            });
        }

    }

    consultar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === "GET"){
            const prestador = new Prestador();
            prestador.consulta().then((prestadores)=>{
                resposta.json(prestadores);
            }).catch((erro)=>{
                resposta.json({
                    status: false,
                    mensagem: "erro: "+erro,
                    mensagem: erro.type,
                    msg: erro.message,
                    msg2: erro.name,
                    msg3: erro.errors
                })
            })
        }
        else {
            resposta.json({
                status: false,
                mensagem: "Requisição inválida"
            })

        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const ID = dados.ID;
            const nome = dados.nome;
            const telefone = dados.telefone;
            const sugestoes = dados.sugestoes;

            if(ID){
                const prestador = new Prestador(ID, nome, telefone, sugestoes);
                prestador.remover().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Prestador excluído."
                    });
                }).catch((erro) =>{
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                        
                    });
                });

            }
            }

        }

    }
