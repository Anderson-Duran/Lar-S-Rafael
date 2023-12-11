import Visitante from '../Modelo/Visitante.js';
import Categoria from '../Modelo/Categoria.js';
import Conectar from './Conexao.js';
export default class VisitanteBD{

    async incluir(visitante){
        if(visitante instanceof Visitante){
            const conexao = await Conectar();
            const sql = "INSERT INTO newvisitantes(nome, sobrenome, cpf, rg, telefone, dataCadastro, codCategoria, observacao) VALUES(?,?,?,?,?,?,?,?)";
            const valores = [visitante.nome, 
                             visitante.sobrenome, 
                             visitante.cpf, 
                             visitante.rg, 
                             visitante.telefone, 
                             visitante.dataCadastro, 
                             visitante.codCategoria, 
                             visitante.observacao];
            const resultado = await conexao.query(sql, valores);
            conexao.release();
            return await resultado[0].insertId;
        }
    }

    async alterar(visitante){
        if(visitante instanceof Visitante){
            const conexao = await Conectar();
            const sql = "UPDATE newvisitantes SET nome=?, sobrenome=?, cpf=?, rg=?, telefone=?, dataCadastro=?, codCategoria=?, observacao=? WHERE codigo=?";
            const valores = [visitante.nome, 
                             visitante.sobrenome, 
                             visitante.cpf, 
                             visitante.rg, 
                             visitante.telefone, 
                             visitante.dataCadastro, 
                             visitante.codCategoria, 
                             visitante.observacao, 
                             visitante.codigo];
            await conexao.query(sql, valores);
            conexao.release();
        }
    }

    async excluir(visitante){
        if(visitante instanceof Visitante){
            const conexao = await Conectar();
            const sql = "DELETE FROM newvisitantes WHERE codigo=?";
            const valores = [visitante.codigo];
            await conexao.query(sql, valores);
            conexao.release();
        }
    }

    async consultar(termo){
        const conexao = await Conectar();
        const sql = "SELECT nv.*, c.descricao AS categoria_nome, c.codigoCat AS categoria_codigo FROM newvisitantes as nv INNER JOIN categorias as c ON nv.codCategoria = c.codigoCat WHERE nv.nome LIKE ?";
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, valores);
        conexao.release();
        const listaVisitantes = [];
        for (const row of rows){
            const categoria = new Categoria(row['categoria_codigo'], row['categoria_nome']);
            const visitante = new Visitante(row['codigo'], row['nome'], row['sobrenome'], row['cpf'], row['rg'], row['telefone'], row['dataCadastro'], categoria, row['observacao']);
            listaVisitantes.push(visitante);
        }
        return listaVisitantes;
    }
}