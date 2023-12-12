import { Router} from "express";
import ProfessorCTRL from "../Controle/ProfessorCtrl.js";

const rotaProfessor = new Router();
const professorCtrl = new ProfessorCTRL();

rotaProfessor.post('/',professorCtrl.gravar)
.put('/',professorCtrl.atualizar)
.delete('/',professorCtrl.excluir)
.get('/',professorCtrl.consultar)


export default rotaProfessor;   