import { Router} from "express";
import TurmaCTRL from "../Controle/TurmaCtrl.js";

const rotaTurma = new Router();
const turmaCtrl = new TurmaCTRL();

rotaTurma.post('/',turmaCtrl.gravar)
.put('/',turmaCtrl.atualizar)
.delete('/',turmaCtrl.excluir)
.get('/',turmaCtrl.consultar)


export default rotaTurma;