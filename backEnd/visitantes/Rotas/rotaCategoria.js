import { Router} from "express";
import CategoriaCTRL from "../Controle/CategoriaCtrl.js";

const rotaCategoria = new Router();
const categoriaCtrl = new CategoriaCTRL();

rotaCategoria.post('/',categoriaCtrl.gravar)
.put('/',categoriaCtrl.atualizar)
.delete('/',categoriaCtrl.excluir)
.get('/',categoriaCtrl.consultar)


export default rotaCategoria;