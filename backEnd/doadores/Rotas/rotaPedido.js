import { Router} from "express";
import PedidoCTRL from "../Controle/PedidoCtrl.js";

const rotaPedido = new Router();
const pedidoCtrl = new PedidoCTRL();

rotaPedido.post('/',pedidoCtrl.gravar)
.put('/',pedidoCtrl.atualizar)
.delete('/',pedidoCtrl.excluir)
.get('/',pedidoCtrl.consultar)


export default rotaPedido;    