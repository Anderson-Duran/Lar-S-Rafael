import Pedido from '../Modelo/Pedido.js';
import Conectar from './Conexao.js';

export default class PedidoBD{

    async incluir(pedido){
        if(pedido instanceof Pedido){
            const conexao = await Conectar();
            const sql = "INSERT INTO pedidos(descricao) VALUES(?)";
            const valores = [pedido.descricao];
            const resultado = await conexao.query(sql, valores);
            
            return await resultado[0].insertId;
        }
    }

    async alterar(pedido){
        if(pedido instanceof Pedido){
            const conexao = await Conectar();
            const sql = "UPDATE pedidos SET descricao=? WHERE codigoPed=?";
            const valores = [pedido.descricao, pedido.codigoPed];
            await conexao.query(sql, valores);
           
        }
    }

    async excluir(pedido){
        if(pedido instanceof Pedido){
            const conexao = await Conectar();
            const sql = "DELETE FROM pedidos WHERE codigoPed=?";
            const valores = [pedido.codigoPed];
            await conexao.query(sql, valores);
            
        }
    }

    async consultar(termo){
        const conexao = await Conectar();
        const sql = "SELECT * FROM pedidos WHERE descricao LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        
        const listaPedidos = [];
        for (const row of rows){
            const pedido = new Pedido(row['codigoPed'], row['descricao']);
            listaPedidos.push(pedido);
        }
        return listaPedidos;
    }

    async consultarCodigo(codigoPed){
        const conexao = await Conectar();
        const sql = "SELECT * FROM pedidos WHERE codigoPed = ?";
        const valores = [codigoPed]
        const [rows] = await conexao.query(sql, valores);
     
        const listaPedidos = [];
        for (const row of rows){
            const pedido = new Pedido(row['codigoPed'], row['descricao']);
            listaPedidos.push(pedido);
        }
        return listaPedidos;
    }
}


