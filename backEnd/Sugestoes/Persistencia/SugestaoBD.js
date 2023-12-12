import Sugestao from "../Modelo/Sugestao.js";
import conectar from "./Conexao.js";

export default class SugestaoBD{

    async incluir(sugestao){

        if (sugestao instanceof Sugestao){
            const conexao = await conectar();
            const sql="INSERT INTO tsugest(nome, sobrenome, telefone, data, sugestao) VALUES(?,?,?,?,?)"; 
            const valores = [ sugestao.nome, sugestao.sobrenome, sugestao.telefone, sugestao.data, sugestao.sugestao];
            const resultado = await conexao.query(sql, valores);
            global.poolconexao.pool.releaseConnection(conexao);
            return await resultado[0].insertId;
            
        }
    }

    async alterar(sugestao){
        if (sugestao instanceof Sugestao){
            const conexao = await conectar();
            const sql="UPDATE tsugest SET nome=?, sobrenome=?, telefone=?, data=?, sugestao=? WHERE ID=?";
            const valores = [sugestao.nome, sugestao.sobrenome, sugestao.telefone, sugestao.data, sugestao.sugestao, sugestao.ID];
            await conexao.query(sql, valores);
            global.poolconexao.pool.releaseConnection(conexao);

        }
    }

    async excluir(sugestao){

        if (sugestao instanceof Sugestao) {
            const conexao = await conectar();
            const valor = sugestao.ID;
            await conexao.query('DELETE FROM tsugest WHERE ID = ?;', valor);
            global.poolconexao.pool.releaseConnection(conexao);
        }
        else {
            console.log(error.message);
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql="SELECT * FROM tsugest WHERE nome LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        global.poolconexao.pool.releaseConnection(conexao);
        const listasugestao = [];
        for(const row of rows){
            const sugestao = new Sugestao(row['ID'], row['nome'], row['sobrenome'], row['telefone'], row['data'], row['sugestao']);
            listasugestao.push(sugestao);
        }
        return listasugestao
    }
}