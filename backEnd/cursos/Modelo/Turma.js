import TurmaBD from '../Persistencia/TurmaBD.js';
export default class Turma {

    #registro;
    #data;
    #horaEntrada;
    #horaSaida;
    #listaProfessores;

    constructor(registro, data, horaEntrada, horaSaida, listaProfessores) {
        this.#registro = registro;
        this.#data = data;
        this.#horaEntrada = horaEntrada;
        this.#horaSaida = horaSaida;
        this.#listaProfessores = listaProfessores
    }

    get registro() {
        return this.#registro
    }

    set registro(novoRegistro) {
        this.#registro = novoRegistro
    }

    get horaEntrada() {
        return this.#horaEntrada
    }

    set horaEntrada(novaHoraEntrada) {
        this.#horaEntrada = novaHoraEntrada
    }

    get horaSaida() {
        return this.#horaSaida
    }

    set horaSaida(novaHoraSaida) {
        this.#horaSaida = novaHoraSaida
    }

    get data() {
        return this.#data
    }

    set data(novaData) {
        this.#data = novaData
    }

    get listaProfessores() {
        return this.#listaProfessores
    }

    set listaProfessores(novaListaProfessores) {
        this.#listaProfessores = novaListaProfessores
    }


    toJSON() {
        return {
            "registro": this.#registro,
            "data": this.#data,
            "horaEntrada": this.#horaEntrada,
            "horaSaida": this.#horaSaida,
            "professor": this.#listaProfessores
        }
    }

    async gravar() {
        const turmaBD = new TurmaBD();
        await turmaBD.incluir(this);

    }

    async atualizar() {
        const turmaBD = new TurmaBD();
        await turmaBD.alterar(this);
    }

    async removerDoBancoDados() {
        const turmaBD = new TurmaBD();
        await turmaBD.excluir(this);
    }

    async consultar() {
        const turmaBD = new TurmaBD();
        const turmas = await turmaBD.consultar();
        return turmas;
    }

}