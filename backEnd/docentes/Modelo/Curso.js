import CursoBD from '../Persistencia/CursoBD.js';
export default class Curso {

    #codigoCur;
    #cursos;


    constructor(codigoCur, cursos) {
        this.#codigoCur = codigoCur;
        this.#cursos = cursos
    }

    get codigoCur() {
        return this.#codigoCur
    }

    set codigoCur(novoCodigoCur) {
        this.#codigoCur = novoCodigoCur
    }

    get cursos() {
        return this.#cursos
    }

    set cursos(novaCursos) {
        this.#cursos = novaCursos
    }



    toJSON() {
        return {
            "codigoCur": this.#codigoCur,
            "cursos": this.#cursos
        }
    }

    async gravar() {
        const cursoBD = new CursoBD();
        this.codigo = await cursoBD.incluir(this);
    }

    async atualizar() {
        const cursoBD = new CursoBD();
        await cursoBD.alterar(this);
    }

    async removerDoBancoDados() {
        const cursoBD = new cursoBD();
        await cursoBD.excluir(this);
    }

    async consultar(termo) {
        const cursoBD = new CursoBD();
        const cursos = await cursoBD.consultar(termo);
        return cursos;
    }

    async consultarCodigo(codigoCur) {
        const cursoBD = new CursoBD();
        const cursos = await cursoBD.consultarCodigo(codigoCur);
        return cursos;
    }
}