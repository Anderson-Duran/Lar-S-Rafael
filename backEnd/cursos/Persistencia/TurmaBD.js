import Turma from '../Modelo/Turma.js';
import Curso from '../Modelo/Curso.js';
import Professores from '../Modelo/Professores.js';
import Professor from '../Modelo/Professor.js';
import Conectar from './Conexao.js';

export default class TurmaBD {

    async incluir(turma) {
        if (turma instanceof Turma) {
            const conexao = await Conectar();
            try {
                await conexao.beginTransaction();
                const sql = "INSERT INTO turma(data, horaEntrada, horaSaida) VALUES(?,?,?)";
                const valores = [turma.data, turma.horaEntrada, turma.horaSaida];
                const resultado = await conexao.query(sql, valores);
                turma.registro = resultado[0].insertId;
                for (const professores of turma.listaProfessores) {
                    console.log(turma.listaProfessores);
                    const sql2 = "INSERT INTO professores(codProfessor, codTurma) VALUES (?,?)";
                    //const parametros = [professores.professores.codigo, turma.registro];
                    let res = await conexao.query(sql2, [professores.listaProfessores.codigo, turma.registro]);
                    console.log(res);

                }
                return turma.registro;
            } catch (e) {
                await conexao.rollback();
                throw e;
            }

        }
    }

    async alterar(turma) {
        if (turma instanceof Turma) {
            const conexao = await Conectar();
            try {
                await conexao.beginTransaction();
                const sql = "UPDATE turma SET  data=?, horaEntrada=?, horaSaida=? WHERE registro=?";
                const valores = [turma.data, turma.horaEntrada, turma.horaSaida, turma.registro];
                await conexao.query(sql, valores);

                const deleteProfessoresSql = "DELETE FROM professores WHERE codTurma=?";
                const deleteProfessoresValores = [turma.registro];
                await conexao.query(deleteProfessoresSql, deleteProfessoresValores);

                for (const professores of turma.listaProfessores) {
                    const insertProfessoresSql = "INSERT INTO professores(codProfessor, codTurma) VALUES (?,?)";
                    const insertProfessoresValores = [professores.professor.codigo, turma.registro];
                    await conexao.query(insertProfessoresSql, insertProfessoresValores);
                }
            } catch (e) {
                await conexao.rollback();
                throw e;
            }

        }
    }

    async excluir(turma) {
        if (turma instanceof Turma) {
            try {
                const conexao = await Conectar();
                await conexao.beginTransaction();
                const deleteProfessoresSql = "DELETE FROM professores WHERE codTurma=?";
                const deleteProfessoresValores = [turma.registro];
                await conexao.query(deleteProfessoresSql, deleteProfessoresValores);
                const deleteTurmaSql = "DELETE FROM turma WHERE registro=?";
                const deleteTurmaValores = [turma.registro];
                await conexao.query(deleteTurmaSql, deleteTurmaValores);
                await conexao.commit();

            } catch (error) {
                await conexao.rollback();
                console.error("Erro ao excluir turma:", error);
                throw error;
            }
        }
    }

    async consultar() {
        let listaTurmas = [];
        const conexao = await Conectar();
        const sql = "SELECT * FROM turma as a INNER JOIN professor as nv INNER JOIN professores as v ON a.registro = v.codTurma AND nv.codigo = v.codProfessor ORDER BY a.data";
        const [turmas] = await conexao.query(sql);


        const registrosProcessados = new Set();

        for (const entregue of turmas) {
            if (!registrosProcessados.has(entregue['registro'])) {
                let turma = new Turma(entregue['registro'], entregue['data'], entregue['horaEntrada'], entregue['horaSaida'], []);
                const sqlProfessor = "SELECT * FROM professor as nv INNER JOIN professores as v INNER JOIN curso as c ON nv.codigo = v.codProfessor AND c.codigoCur = nv.codCurso WHERE v.codTurma = ?";
                const parametros = [turma.registro];
                const [professorProfessores] = await conexao.query(sqlProfessor, parametros);

                let listaProfessores = [];
                for (const professores of professorProfessores) {
                    const curso = new Curso(professores['codigoCur'], professores['cursos']);
                    const professor = new Professor(professores['codigo'], professores['nome'], professores['cpf'], professores['telefone'], curso);
                    listaProfessores.push(new Professores(professor, professores['codTurma']));
                }
                turma.listaProfessores = listaProfessores;
                listaTurmas.push(turma);

                registrosProcessados.add(entregue['registro']);
            }
        }
        return listaTurmas;
    }

}    