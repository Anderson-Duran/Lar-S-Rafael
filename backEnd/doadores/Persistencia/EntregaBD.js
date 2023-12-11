import Entrega from '../Modelo/Entrega.js';
import Pedido from '../Modelo/Pedido.js';
import Moto from '../Modelo/Moto.js';
import Motoboy from '../Modelo/Motoboy.js';
import Conectar from './Conexao.js';

export default class EntregaBD{

    async incluir(entrega){
        if(entrega instanceof Entrega){
            const conexao = await Conectar();
            try{
                await conexao.beginTransaction();
                const sql = "INSERT INTO entregas(data, horaEntrada, horaSaida) VALUES(?,?,?)";
                const valores = [entrega.data, entrega.horaEntrada, entrega.horaSaida];
                const resultado = await conexao.query(sql, valores);
                entrega.registro = resultado[0].insertId;
                for (const moto of entrega.listaMotoboys){
                    const sql2 = "INSERT INTO motos(codMotoboy, codEntrega) VALUES (?,?)";
                    const parametros = [moto.motoboy.codigo, entrega.registro];
                    await conexao.query(sql2,parametros);
                }
            } catch (e){
                await conexao.rollback();
                throw e;
            }
            
        }
    }

    async alterar(entrega){
        if(entrega instanceof Entrega){
            const conexao = await Conectar();
            try{
              await conexao.beginTransaction();
              const sql = "UPDATE entregas SET  data=?, horaEntrada=?, horaSaida=? WHERE registro=?";
            const valores = [entrega.data, entrega.horaEntrada, entrega.horaSaida, entrega.registro];
            await conexao.query(sql, valores);

            const deleteMotoSql = "DELETE FROM motos WHERE codEntrega=?";
            const deleteMotoValores = [entrega.registro];
            await conexao.query(deleteMotoSql, deleteMotoValores);

            for (const moto of entrega.listaMotoboys) {
              const insertMotoSql = "INSERT INTO motos(codMotoboy, codEntrega) VALUES (?,?)";
              const insertMotoValores = [moto.motoboy.codigo, entrega.registro];
              await conexao.query(insertMotoSql, insertMotoValores);
            }
          } catch (e){
            await conexao.rollback();
            throw e;
          }
         
        }
    }

    async excluir(entrega){
        if (entrega instanceof Entrega) {
            try {
              const conexao = await Conectar();
              await conexao.beginTransaction();
              const deleteMotoSql = "DELETE FROM motos WHERE codEntrega=?";
              const deleteMotoValores = [entrega.registro];
              await conexao.query(deleteMotoSql, deleteMotoValores);
              const deleteEntregaSql = "DELETE FROM entregas WHERE registro=?";
              const deleteEntregaValores = [entrega.registro];
              await conexao.query(deleteEntregaSql, deleteEntregaValores);
              await conexao.commit();
              
            } catch (error) {
              await conexao.rollback();
              console.error("Erro ao excluir entrega:", error);
              throw error;
            }
          }          
    }

    async consultar() {
        let listaEntregas = [];
        const conexao = await Conectar();
        const sql = "SELECT * FROM entregas as a INNER JOIN newMotoboys as nv INNER JOIN motos as v ON a.registro = v.codEntrega AND nv.codigo = v.codMotoboy ORDER BY a.data";
        const [entregas] = await conexao.query(sql);
        
      
        const registrosProcessados = new Set();
      
        for (const entregue of entregas) {
          if (!registrosProcessados.has(entregue['registro'])) {
            let entrega = new Entrega(entregue['registro'], entregue['data'], entregue['horaEntrada'], entregue['horaSaida'], []);
            const sqlMotoboys = "SELECT * FROM newmotoboys as nv INNER JOIN motos as v INNER JOIN pedidos as c ON nv.codigo = v.codMotoboy AND c.codigoPed = nv.codPedido WHERE v.codEntrega = ?";
            const parametros = [entrega.registro];
            const [motoboysMoto] = await conexao.query(sqlMotoboys, parametros);
      
            let listaMotoboys = [];
            for (const moto of motoboysMoto) {
              const pedido = new Pedido(moto['codigoPed'], moto['descricao']);
              const motoboy = new Motoboy(moto['codigo'], moto['nome'], moto['cpf'], moto['telefone'], moto['dataCadastro'], pedido);
              listaMotoboys.push(new Moto(motoboy, moto['codEntrega']));
            }
            entrega.listaMotoboys = listaMotoboys;
            listaEntregas.push(entrega);
      
            registrosProcessados.add(entregue['registro']);
          }
        }
        return listaEntregas;
      }
      
}    