import Agendamento from '../Modelo/Agendamento.js'; 
import Visita from '../Modelo/Visita.js';
import Visitante from '../Modelo/Visitante.js';
export default class AgendamentoCTRL{

    gravar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "POST" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const data = dados.data;
            const horaEntrada = dados.horaEntrada;
            const horaSaida = dados.horaSaida;
            const visitantes = dados.visitantes;
            const listaVisitantes = []
            for(const row of visitantes){
                const visitante = new Visitante(row.visitante.codigo);
                const visita = new Visita(visitante);
                listaVisitantes.push(visita);
            }
            
            const agendamento = new Agendamento(0, data, horaEntrada, horaSaida, listaVisitantes);
            agendamento.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Visita agendada com sucesso!!" + "\ Registro: " + agendamento.registro
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
                    mensagem:"Informe adequadamente todos os dados para o agendamento conforme a documentação da API"
                });
            }
    }

    atualizar(requisição, resposta) {
        resposta.type("application/json");
      
        if (requisição.method === "PUT" && requisição.is('application/json')) {
          const dados = requisição.body;
          const registro = dados.registro;
          const data = dados.data;
          const horaEntrada = dados.horaEntrada;
          const horaSaida = dados.horaSaida;
          const visitantes = dados.visitantes;
      
          if (registro && data && horaEntrada && horaSaida) {
            const agendamento = new Agendamento(registro, data, horaEntrada, horaSaida);
      
            const listaVisitantes = [];
            for (const row of visitantes) {
              const visitante = new Visitante(row.visitante.codigo);
              const visita = new Visita(visitante);
              listaVisitantes.push(visita);
            }
            agendamento.listaVisitantes = listaVisitantes;
      
            agendamento.atualizar().then(() => {
              resposta.status(200).json({
                status: true,
                mensagem: "Agendamento atualizado com sucesso!!"
              });
            }).catch((erro) => {
              resposta.status(500).json({
                status: false,
                mensagem: erro.message
              })
            });
          } else {
            resposta.status(400).json({
              status: false,
              mensagem: "Informe adequadamente todos os dados para atualizar o agendamento conforme a documentação da API"
            });
          }
        } else {
          resposta.status(400).json({
            status: false,
            mensagem: "Método não permitido ou agendamento no formato JSON não fornecido! Consulte a documentação da API"
          });
        }
      }
      

    excluir(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "DELETE" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const registro = dados.registro;
            if(registro){
                const agendamento = new Agendamento(registro);
                agendamento.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Agendamento de visita excluída com sucesso!!"
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
                    mensagem:"Informe o registro do agendamento conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou agendamento no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "GET"){
                const agendamento = new Agendamento();
                agendamento.consultar().then((agendamentos)=>{
                    resposta.status(200).json(agendamentos);
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