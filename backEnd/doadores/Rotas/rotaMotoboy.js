import { Router} from "express";
import MotoboyCTRL from "../Controle/MotoboyCtrl.js";

const rotaMotoboy = new Router();
const motoboyCtrl = new MotoboyCTRL();

rotaMotoboy.post('/',motoboyCtrl.gravar)
.put('/',motoboyCtrl.atualizar)
.delete('/',motoboyCtrl.excluir)
.get('/',motoboyCtrl.consultar)


export default rotaMotoboy;   