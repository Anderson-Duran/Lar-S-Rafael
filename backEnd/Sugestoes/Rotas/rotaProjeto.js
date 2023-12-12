import ProjetoCTRL from "../Controle/projeto.Ctrl.js";
import { Router } from "express";

const rotaProjeto = new Router();
const projetoCTRL = new ProjetoCTRL();

rotaProjeto.post('/', projetoCTRL.gravar)
.put('/', projetoCTRL.atualizar)
.get('/', projetoCTRL.consultar)
.delete('/', projetoCTRL.excluir)

export default rotaProjeto;