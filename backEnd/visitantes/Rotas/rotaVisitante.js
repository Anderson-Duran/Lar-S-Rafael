import { Router} from "express";
import VisitanteCTRL from "../Controle/VisitanteCtrl.js";

const rotaVisitante = new Router();
const visitanteCtrl = new VisitanteCTRL();

rotaVisitante.post('/',visitanteCtrl.gravar)
.put('/',visitanteCtrl.atualizar)
.delete('/',visitanteCtrl.excluir)
.get('/',visitanteCtrl.consultar)


export default rotaVisitante;