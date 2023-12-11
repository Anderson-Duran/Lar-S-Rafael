import { Router} from "express";
import EntregaCTRL from "../Controle/EntregaCtrl.js";

const rotaEntrega = new Router();
const entregaCtrl = new EntregaCTRL();

rotaEntrega.post('/',entregaCtrl.gravar)
.put('/',entregaCtrl.atualizar)
.delete('/',entregaCtrl.excluir)
.get('/',entregaCtrl.consultar)


export default rotaEntrega;