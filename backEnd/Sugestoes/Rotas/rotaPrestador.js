import { Router } from "express";
import PrestadorCTRL from "../Controle/prestador.Ctrl.js";

const rotaPrestador = new Router();
const prestadorCTRL = new PrestadorCTRL();

rotaPrestador.post('/', prestadorCTRL.gravar)
.get('/', prestadorCTRL.consultar)
.delete('/', prestadorCTRL.excluir)

export default rotaPrestador;