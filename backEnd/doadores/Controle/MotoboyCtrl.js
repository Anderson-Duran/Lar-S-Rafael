import Pedido from '../Modelo/Pedido.js';
import Motoboy from '../Modelo/Motoboy.js'; 
export default class MotoboyCTRL{

    gravar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "POST" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const cpf = dados.cpf; 
            const telefone = dados.telefone;
            const dataCadastro = dados.dataCadastro;
            const codPedido = dados.codPedido;
            const pedido = new Pedido(0,"").consultarCodigo(codPedido).then((pedido)=>{
                if(pedido){
                    const motoboy = new Motoboy(0, nome, endereco, cpf, telefone, dataCadastro, codPedido);
                    motoboy.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        Código: motoboy.codigo,
                        mensagem: "Doador gravado com sucesso!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Pedido não encontrado!"
                });
            }})
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou motoboy no formato JSON não fornecido! Consulte a documentação da API"
            });
            }
    }
    
    atualizar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "PUT" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const cpf = dados.cpf;
          
            const telefone = dados.telefone;
            const dataCadastro = dados.dataCadastro;
            const codPedido = dados.codPedido;
            const pedido = new Pedido(0,"").consultar(codPedido).then((pedido)=>{
                if(pedido){
                    const motoboy = new Motoboy(codigo, nome, endereco, cpf, telefone, dataCadastro, codPedido);
                    motoboy.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        Código: motoboy.codigo,
                        mensagem: "Motoboy atualizado com sucesso!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Pedido não encontrado!"
                });
            }})
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou motoboy no formato JSON não fornecido! Consulte a documentação da API"
            });
            }
    }

    excluir(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "DELETE" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const codigo = dados.codigo;
            if(codigo){
                const motoboy = new Motoboy(codigo);
                motoboy.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Motoboy excluído com sucesso!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe codigo do Motoboy conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou motoboy no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "GET"){
                const motoboy = new Motoboy();
                motoboy.consultar('').then((motoboys)=>{
                    resposta.status(200).json(motoboys);
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido!  Consulte a documentação da API"
            });
        }
    }
}    