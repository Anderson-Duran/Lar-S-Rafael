import Professor from '../Modelo/Professor.js';
import Curso from '../Modelo/Curso.js';
import Conectar from './Conexao.js';

export default class ProfessorBD {

    async incluir(professor) {
        if (professor instanceof Professor) {
            const conexao = await Conectar();
            const sql = "INSERT INTO professor(nome, cpf, telefone, codCurso) VALUES(?,?,?,?)";
            const valores = [professor.nome,
            professor.cpf,
            professor.telefone,
            professor.codCurso];
            const resultado = await conexao.query(sql, valores);

            return await resultado[0].insertId;
        }
    }

    async alterar(professor) {
        if (professor instanceof Professor) {
            const conexao = await Conectar();
            const sql = "UPDATE professor SET nome=?, cpf=?, telefone=?, codCurso=? WHERE codigo=?";
            const valores = [professor.nome,
            professor.cpf,
            professor.telefone,
            professor.codCurso,
            professor.codigo];
            await conexao.query(sql, valores);

        }
    }

    async excluir(professor) {
        if (professor instanceof Professor) {
            const conexao = await Conectar();
            const sql = "DELETE FROM professor WHERE codigo=?";
            const valores = [professor.codigo];
            await conexao.query(sql, valores);

        }
    }

    async consultar(termo) {
        const conexao = await Conectar();
        const sql = "SELECT nv.*, c.cursos AS curso_nome, c.codigoCur AS curso_codigo FROM professor as nv INNER JOIN curso as c ON nv.codCurso = c.codigoCur WHERE nv.nome LIKE ?";
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, valores);

        const listaProfessores = [];
        for (const row of rows) {
            const curso = new Curso(row['curso_codigo'], row['curso_nome']);
            const professor = new Professor(row['codigo'], row['nome'], row['cpf'], row['telefone'], curso);
            listaProfessores.push(professor);
        }
        return listaProfessores;
    }
}    