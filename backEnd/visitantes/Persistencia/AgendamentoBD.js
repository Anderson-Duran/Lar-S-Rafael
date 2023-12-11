import Agendamento from '../Modelo/Agendamento.js';
import Categoria from '../Modelo/Categoria.js';
import Visita from '../Modelo/Visita.js';
import Visitante from '../Modelo/Visitante.js';
import Conectar from './Conexao.js';
export default class AgendamentoBD{

    async incluir(agendamento){
        if(agendamento instanceof Agendamento){
            const conexao = await Conectar();
            try{
                await conexao.beginTransaction();
                const sql = "INSERT INTO agendamentos(data, horaEntrada, horaSaida) VALUES(?,?,?)";
                const valores = [agendamento.data, agendamento.horaEntrada, agendamento.horaSaida];
                const resultado = await conexao.query(sql, valores);
                agendamento.registro = resultado[0].insertId;
                for (const visita of agendamento.listaVisitantes){
                    const sql2 = "INSERT INTO visitas(codVisitante, codAgendamento) VALUES (?,?)";
                    const parametros = [visita.visitante.codigo, agendamento.registro];
                    await conexao.query(sql2,parametros);
                }
            } catch (e){
                await conexao.rollback();
                throw e;
            }
            await conexao.commit();
            conexao.release();
        }
    }

    async alterar(agendamento){
        if(agendamento instanceof Agendamento){
            const conexao = await Conectar();
            try{
              await conexao.beginTransaction();
              const sql = "UPDATE agendamentos SET  data=?, horaEntrada=?, horaSaida=? WHERE registro=?";
              const valores = [agendamento.data, agendamento.horaEntrada, agendamento.horaSaida, agendamento.registro];
              await conexao.query(sql, valores);

              const deleteVisitaSql = "DELETE FROM visitas WHERE codAgendamento=?";
              const deleteVisitaValores = [agendamento.registro];
              await conexao.query(deleteVisitaSql, deleteVisitaValores);

              for (const visita of agendamento.listaVisitantes) {
                const insertVisitaSql = "INSERT INTO visitas(codVisitante, codAgendamento) VALUES (?,?)";
                const insertVisitaValores = [visita.visitante.codigo, agendamento.registro];
                await conexao.query(insertVisitaSql, insertVisitaValores);
              }
            } catch (e){
              await conexao.rollback();
              throw e;
            }
            await conexao.commit();
            conexao.release();
        }
    }

    async excluir(agendamento){
        if (agendamento instanceof Agendamento) {
            try {
              const conexao = await Conectar();
          
              await conexao.beginTransaction();
          
              const deleteVisitaSql = "DELETE FROM visitas WHERE codAgendamento=?";
              const deleteVisitaValores = [agendamento.registro];
              await conexao.query(deleteVisitaSql, deleteVisitaValores);
          
              const deleteAgendamentoSql = "DELETE FROM agendamentos WHERE registro=?";
              const deleteAgendamentoValores = [agendamento.registro];
              await conexao.query(deleteAgendamentoSql, deleteAgendamentoValores);
          
              await conexao.commit();
          
              conexao.release();
            } catch (error) {
              await conexao.rollback();
              console.error("Erro ao excluir agendamento:", error);
              throw error;
            }
          }          
    }

    async consultar() {
        let listaAgendamentos = [];
        const conexao = await Conectar();
        const sql = "SELECT * FROM agendamentos as a INNER JOIN newvisitantes as nv INNER JOIN visitas as v ON a.registro = v.codAgendamento AND nv.codigo = v.codVisitante ORDER BY a.data";
        const [agendamentos] = await conexao.query(sql);
        conexao.release();
      
        const registrosProcessados = new Set();
      
        for (const agenda of agendamentos) {
          if (!registrosProcessados.has(agenda['registro'])) {
            let agendamento = new Agendamento(agenda['registro'], agenda['data'], agenda['horaEntrada'], agenda['horaSaida'], []);
            const sqlVisitantes = "SELECT * FROM newvisitantes as nv INNER JOIN visitas as v INNER JOIN categorias as c ON nv.codigo = v.codVisitante AND c.codigoCat = nv.codCategoria WHERE v.codAgendamento = ?";
            const parametros = [agendamento.registro];
            const [visitantesVisita] = await conexao.query(sqlVisitantes, parametros);
      
            let listaVisitantes = [];
            for (const visita of visitantesVisita) {
              const categoria = new Categoria(visita['codigoCat'], visita['descricao'], visita['abrangentes']);
              const visitante = new Visitante(visita['codigo'], visita['nome'], visita['sobrenome'], visita['cpf'], visita['rg'], visita['telefone'], visita['dataCadastro'], categoria, visita['observacao']);
              listaVisitantes.push(new Visita(visitante, visita['codAgendamento']));
            }
            agendamento.listaVisitantes = listaVisitantes;
            listaAgendamentos.push(agendamento);
      
            registrosProcessados.add(agenda['registro']);
          }
        }
        return listaAgendamentos;
      }
      
}