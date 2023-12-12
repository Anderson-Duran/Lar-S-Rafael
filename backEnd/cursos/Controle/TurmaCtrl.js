import Turma from '../Modelo/Turma.js'; 
import Professores from '../Modelo/Professores.js';
import Professor from '../Modelo/Professor.js';

export default class TurmaCTRL{
   
    gravar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "POST" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const data = dados.data;
            const horaEntrada = dados.horaEntrada;
            const horaSaida = dados.horaSaida;
            const professor = dados.professor;
            const listaProfessores = []
            for(const row of professor){
                const professor = new Professor(row.professor.codigo);
                const professores = new Professores(professor);
                listaProfessores.push(professores);
            }
            
            const turma = new Turma(0, data, horaEntrada, horaSaida, listaProfessores);
            turma.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Turma cadastrada com sucesso!!" + "\ registro: " + turma.registro
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
                    mensagem:"Informe adequadamente todos os dados para a turma conforme a documentação da API"
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
            const professor = dados.professor;

            if(registro && data && horaEntrada && horaSaida) {
                const turma = new Turma(registro, data, horaEntrada, horaSaida);
                const listaProfessores = [];
                for (const row of professor) {
                  const professor = new Professor(row.professor.codigo);
                  const professores = new Professores(professor);
                  listaProfessores.push(professores);
                }
                turma.listaProfessores = listaProfessores;

                turma.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Turma atualizada com sucesso!!"
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
                    mensagem:"Informe adequadamente todos os dados para a turma conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou turma no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    excluir(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "DELETE" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const registro = dados.registro;
            if(registro){
                const turma = new Turma(registro);
                turma.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Turma excluída com sucesso!!"
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
                    mensagem:"Informe o registro da turma conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou turma no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "GET"){
                const turma = new Turma();
                turma.consultar().then((turmas)=>{
                    resposta.status(200).json(turmas);
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


