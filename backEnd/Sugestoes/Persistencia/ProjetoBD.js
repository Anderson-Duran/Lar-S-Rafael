import conectar from "./Conexao.js";
import Projeto from "../Modelo/Projeto.js";
import Sugestao from "../Modelo/Sugestao.js";

export default class ProjetoBD{
    async incluir(projeto){
        if (projeto instanceof Projeto){
            const conexao = await conectar();
            const sql="INSERT INTO tproject(responsavel, descricao, autor, sugestao) VALUES(?,?,?,?)"; 
            const valores = [ projeto.responsavel,
                              projeto.descricao,
                              projeto.autor,
                              projeto.sugestao.ID];
            const resultado = await conexao.query(sql, valores);
            global.poolconexao.pool.releaseConnection(conexao);
            return await resultado[0].insertId;   
        }
    }

    async alterar(projeto){
        if (projeto instanceof Projeto){
            const conexao = await conectar();
            const sql="UPDATE tproject SET responsavel=?, descricao=?, autor=?, sugestao=? WHERE ID=?";
            const valores = [projeto.responsavel,
                             projeto.descricao,
                             projeto.autor,
                             projeto.sugestao.ID,
                             projeto.ID];
            await conexao.query(sql, valores);
            global.poolconexao.pool.releaseConnection(conexao);
        }
    }

    async excluir(projeto){
        if (projeto instanceof Projeto) {
            const conexao = await conectar();
            const valor = projeto.ID;
            await conexao.query('DELETE FROM tproject WHERE ID = ?;', valor);
            global.poolconexao.pool.releaseConnection(conexao);
        }
        else {
            console.log(error.message);
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql="SELECT p.ID as codigo, p.responsavel as resp, p.descricao as descri, p.autor as autor, p.sugestao as sugest, s.nome as nome, s.sobrenome as sobre, s.data as data, s.telefone as tele, s.ID as ID, s.sugestao as sugestao FROM tproject as p INNER JOIN tsugest as s ON p.sugestao = s.ID WHERE autor LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        global.poolconexao.pool.releaseConnection(conexao);
        const listaprojeto = [];
        for(const row of rows){
            const sugestao = new Sugestao(row['ID'], row['nome'], row['sobre'], row['tele'], row['data'], row['sugestao']);
            const projeto = new Projeto(row['codigo'], row['resp'], row['descri'], row['autor'], row['sugest'], sugestao);
            listaprojeto.push(projeto);
        }
        return listaprojeto
    }
}