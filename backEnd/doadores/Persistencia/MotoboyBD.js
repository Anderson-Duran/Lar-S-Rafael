import Motoboy from '../Modelo/Motoboy.js';
import Pedido from '../Modelo/Pedido.js';
import Conectar from './Conexao.js';

export default class MotoboyBD{

    async incluir(motoboy){
        if(motoboy instanceof Motoboy){
            const conexao = await Conectar();
            const sql = "INSERT INTO newmotoboys(nome, endereco, cpf, telefone, dataCadastro, codPedido) VALUES(?,?,?,?,?,?)";
            const valores = [motoboy.nome, 
                             motoboy.endereco,
                             motoboy.cpf,              
                             motoboy.telefone, 
                             motoboy.dataCadastro, 
                             motoboy.codPedido];
            const resultado = await conexao.query(sql, valores);
            
            return await resultado[0].insertId;
        }
    }

    async alterar(motoboy){
        if(motoboy instanceof Motoboy){
            const conexao = await Conectar();
            const sql = "UPDATE newmotoboys SET nome=?, endereco=?, cpf=?, telefone=?, dataCadastro=?, codPedido=? WHERE codigo=?";
            const valores = [motoboy.nome, 
                             motoboy.endereco,
                             motoboy.cpf,            
                             motoboy.telefone, 
                             motoboy.dataCadastro, 
                             motoboy.codPedido,  
                             motoboy.codigo];
            await conexao.query(sql, valores);
            
        }
    }

    async excluir(motoboy){
        if(motoboy instanceof Motoboy){
            const conexao = await Conectar();
            const sql = "DELETE FROM newmotoboys WHERE codigo=?";
            const valores = [motoboy.codigo];
            await conexao.query(sql, valores);
            
        }
    }

    async consultar(termo){
        const conexao = await Conectar();
        const sql = "SELECT nv.*, c.descricao AS pedido_nome, c.codigoPed AS pedido_codigo FROM newMotoboys as nv INNER JOIN pedidos as c ON nv.codPedido = c.codigoPed WHERE nv.nome LIKE ?";
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, valores);
       
        const listaMotoboys = [];
        for (const row of rows){
            const pedido = new Pedido(row['pedido_codigo'], row['pedido_nome']);
            const motoboy = new Motoboy(row['codigo'], row['nome'], row['endereco'], row['cpf'], row['telefone'], row['dataCadastro'], pedido);
            listaMotoboys.push(motoboy);
        }
        return listaMotoboys;
    }
}    