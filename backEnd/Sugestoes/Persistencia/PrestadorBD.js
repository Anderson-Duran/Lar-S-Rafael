import Prestador from "../Modelo/Prestador.js";
import Sugestao from "../Modelo/Sugestao.js";
import conectar from "./Conexao.js";

export default class PrestadorBD{

    async incluir(prestador){
        if (prestador instanceof Prestador){
            const conexao = await conectar();
            try{
            await conexao.beginTransaction();
            const sql="INSERT INTO prestador(nome, telefone) VALUES(?,?)"; 
            const valores = [prestador.nome, prestador.telefone];
            const resultado = await conexao.query(sql, valores);
            prestador.ID = await resultado[0].insertId;
            for(const item of prestador.sugestoes){
                const sql2="INSERT INTO sugestao_prestador(idsugestao, idprestador) VALUES(?,?)";
                const parametro = [item.ID, prestador.ID];
                await conexao.query(sql2, parametro)
            }
            }catch(e){
                await conexao.rollback();
                throw e;
            }
            await conexao.commit();           
            global.poolconexao.pool.releaseConnection(conexao);
        }
    }

    async alterar(prestador){

    }

    async excluir(prestador){
        if (prestador instanceof Prestador) {
            const conexao = await conectar();
            const valor = prestador.ID;
            await conexao.query('DELETE FROM sugestao_prestador WHERE idprestador = ?', valor)
            await conexao.query('DELETE FROM prestador WHERE ID = ?;', valor);
            global.poolconexao.pool.releaseConnection(conexao);
        }
        else {
            console.log(error.message);
        }

    }

    async consultar(){
        let prestadores = [];
        const conexao = await conectar();
        const sql = "SELECT * FROM prestador";
        const [rows] = await conexao.query(sql);
        for(const row of rows){
            let lista = [];
            const sqlSugest = "SELECT * FROM tsugest as t INNER JOIN sugestao_prestador as i on t.ID = i.idsugestao WHERE i.idprestador = ?";
            const valor = [row.ID]
            const [sugestoes] = await conexao.query(sqlSugest, valor);
            for (const sugest of sugestoes){
                const sugestao = new Sugestao(sugest['ID'], sugest['nome'], sugest['sobrenome'], sugest['telefone'], sugest['data'], sugest['sugestao']);
                lista.push(sugestao);
        }
            const prestador = new Prestador(row['ID'], row['nome'], row['telefone'], lista);
            prestadores.push(prestador);
        }
        global.poolconexao.pool.releaseConnection(conexao);
        return prestadores;
    }
}