import { Router} from "express";
import CursoCTRL from "../Controle/CursoCtrl.js";

const rotaCurso = new Router();
const cursoCtrl = new CursoCTRL();

rotaCurso.post('/',cursoCtrl.gravar)
.put('/',cursoCtrl.atualizar)
.delete('/',cursoCtrl.excluir)
.get('/',cursoCtrl.consultar)


export default rotaCurso;    