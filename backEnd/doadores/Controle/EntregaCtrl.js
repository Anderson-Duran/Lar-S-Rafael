import Entrega from '../Modelo/Entrega.js'; 
import Moto from '../Modelo/Moto.js';
import Motoboy from '../Modelo/Motoboy.js';

export default class EntregaCTRL{
   
    gravar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "POST" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const data = dados.data;
            const horaEntrada = dados.horaEntrada;
            const horaSaida = dados.horaSaida;
            const motoboys = dados.motoboys;
            const listaMotoboys = []
            for(const row of motoboys){
                const motoboy = new Motoboy(row.motoboy.codigo);
                const moto = new Moto(motoboy);
                listaMotoboys.push(moto);
            }
            
            const entrega = new Entrega(0, data, horaEntrada, horaSaida, listaMotoboys);
            entrega.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Cadastrado com sucesso!!" + "\ Registro: " + entrega.registro
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
                    mensagem:"Informe adequadamente todos os dados para a entrega conforme a documentação da API"
                });
            }
    }

    atualizar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "PUT" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const registro = dados.registro;
            const data = dados.data;
            const horaEntrada = dados.horaEntrada;
            const horaSaida = dados.horaSaida;
            const motoboys = dados.motoboys;

            if(registro && data && horaEntrada && horaSaida) {
                const entrega = new Entrega(registro, data, horaEntrada, horaSaida);
                const listaMotoboys = [];
                for (const row of motoboys) {
                  const motoboy = new Motoboy(row.motoboy.codigo);
                  const moto = new Moto(motoboy);
                  listaMotoboys.push(moto);
                }
                entrega.listaMotoboys = listaMotoboys;


                entrega.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Entrega atualizada com sucesso!!"
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
                    mensagem:"Informe adequadamente todos os dados para a entrega conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou entrega no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    excluir(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "DELETE" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const registro = dados.registro;
            if(registro){
                const entrega = new Entrega(registro);
                entrega.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Excluído com sucesso!!"
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
                    mensagem:"Informe o registro da entrega conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou entrega no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "GET"){
                const entrega = new Entrega();
                entrega.consultar().then((entregas)=>{
                    resposta.status(200).json(entregas);
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


