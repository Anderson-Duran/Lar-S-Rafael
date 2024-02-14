import Curso from '../Modelo/Curso.js';
import Conectar from './Conexao.js';

export default class CursoBD {

    async incluir(curso) {
        if (curso instanceof Curso) {
            const conexao = await Conectar();
            const sql = "INSERT INTO curso(cursos) VALUES(?)";
            const valores = [curso.cursos];
            const resultado = await conexao.query(sql, valores);

            return await resultado[0].insertId;
        }
    }

    async alterar(curso) {
        if (curso instanceof Curso) {
            const conexao = await Conectar();
            const sql = "UPDATE curso SET cursos=?, WHERE codigoCur=?";
            const valores = [curso.cursos, curso.codigoCur];
            await conexao.query(sql, valores);

        }
    }

    async excluir(curso) {
        if (curso instanceof Curso) {
            const conexao = await Conectar();
            const sql = "DELETE FROM curso WHERE codigoCur=?";
            const valores = [curso.codigoCur];
            await conexao.query(sql, valores);

        }
    }

    async consultar(termo) {
        const conexao = await Conectar();
        const sql = "SELECT * FROM curso WHERE cursos LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);

        const listaCursos = [];
        for (const row of rows) {
            const curso = new Curso(row['codigoCur'], row['cursos']);
            listaCursos.push(curso);
        }
        return listaCursos;
    }

    async consultarCodigo(codigoCur) {
        const conexao = await Conectar();
        const sql = "SELECT * FROM curso WHERE codigoCur = ?";
        const valores = [codigoCur]
        const [rows] = await conexao.query(sql, valores);

        const listaCursos = [];
        for (const row of rows) {
            const curso = new Curso(row['codigoCur'], row['cursos']);
            listaCursos.push(curso);
        }
        return listaCursos;
    }
}


