import Categoria from '../Modelo/Categoria.js';
import Conectar from './Conexao.js';
export default class CategoriaBD{

    async incluir(categoria){
        if(categoria instanceof Categoria){
            const conexao = await Conectar();
            const sql = "INSERT INTO categorias(descricao, abrangentes) VALUES(?,?)";
            const valores = [categoria.descricao, categoria.abrangentes];
            const resultado = await conexao.query(sql, valores);
            conexao.release();
            return await resultado[0].insertId;
        }
    }

    async alterar(categoria){
        if(categoria instanceof Categoria){
            const conexao = await Conectar();
            const sql = "UPDATE categorias SET descricao=?, abrangentes=? WHERE codigoCat=?";
            const valores = [categoria.descricao, categoria.abrangentes, categoria.codigoCat];
            await conexao.query(sql, valores);
            conexao.release();
        }
    }

    async excluir(categoria){
        if(categoria instanceof Categoria){
            const conexao = await Conectar();
            const sql = "DELETE FROM categorias WHERE codigoCat=?";
            const valores = [categoria.codigoCat];
            await conexao.query(sql, valores);
            conexao.release();
        }
    }

    async consultar(termo){
        const conexao = await Conectar();
        const sql = "SELECT * FROM categorias WHERE descricao LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        conexao.release();
        const listaCategorias = [];
        for (const row of rows){
            const categoria = new Categoria(row['codigoCat'], row['descricao'], row['abrangentes']);
            listaCategorias.push(categoria);
        }
        return listaCategorias;
    }

    async consultarCodigo(codigoCat){
        const conexao = await Conectar();
        const sql = "SELECT * FROM categorias WHERE codigoCat = ?";
        const valores = [codigoCat]
        const [rows] = await conexao.query(sql, valores);
        conexao.release();
        const listaCategorias = [];
        for (const row of rows){
            const categoria = new Categoria(row['codigoCat'], row['descricao'], row['abrangentes']);
            listaCategorias.push(categoria);
        }
        return listaCategorias;
    }
}