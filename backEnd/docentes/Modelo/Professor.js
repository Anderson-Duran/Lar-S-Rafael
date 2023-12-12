import ProfessorBD from '../Persistencia/ProfessorBD.js';
export default class Professor {

    #codigo;
    #nome;
    #cpf;
    #telefone;
    #codCurso;

    constructor(codigo, nome, cpf, telefone, codCurso) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#telefone = telefone;
        this.#codCurso = codCurso;
    }

    get codigo() {
        return this.#codigo
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo
    }

    get nome() {
        return this.#nome
    }

    set nome(novoNome) {
        this.#nome = novoNome
    }


    get cpf() {
        return this.#cpf
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf
    }

    get telefone() {
        return this.#telefone
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone
    }

    get codCurso() {
        return this.#codCurso
    }

    set codCurso(novoCodCurso) {
        this.#codCurso = novoCodCurso
    }


    toJSON() {
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "cpf": this.#cpf,
            "telefone": this.#telefone,
            "codCurso": this.#codCurso
        }
    }
    async gravar() {
        const professorBD = new ProfessorBD();
        this.#codigo = await professorBD.incluir(this);
    }

    async atualizar() {
        const professorBD = new ProfessorBD();
        await professorBD.alterar(this);
    }

    async removerDoBancoDados() {
        const professorBD = new ProfessorBD();
        await professorBD.excluir(this);
    }

    async consultar(termo) {
        const professorBD = new ProfessorBD();
        const professor = await professorBD.consultar(termo);
        return professor;
    }
}    