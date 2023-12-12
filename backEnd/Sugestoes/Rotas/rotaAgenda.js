import {Router} from "express";
import SugestaoCTRL from "../Controle/sugestao.Ctrl.js";

const rotaAgenda = new Router();
const sugestaoCTRL = new SugestaoCTRL();

rotaAgenda.post('/', sugestaoCTRL.gravar)
.put('/', sugestaoCTRL.atualizar)
.get('/', sugestaoCTRL.consultar)
.delete('/', sugestaoCTRL.excluir)

export default rotaAgenda;