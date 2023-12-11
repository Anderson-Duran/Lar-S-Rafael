import AgendamentoBD from '../Persistencia/AgendamentoBD.js';
export default class Agendamento{

    #registro;
    #data;
    #horaEntrada;
    #horaSaida;
    #listaVisitantes;

    constructor(registro, data, horaEntrada, horaSaida, listaVisitantes){
        this.#registro = registro;
        this.#data = data;
        this.#horaEntrada = horaEntrada;
        this.#horaSaida = horaSaida;
        this.#listaVisitantes = listaVisitantes
    }

    get registro(){
        return this.#registro
    }

    set registro(novoRegistro){
        this.#registro = novoRegistro
    }

    get horaEntrada(){
        return this.#horaEntrada
    }

    set horaEntrada(novaHoraEntrada){
        this.#horaEntrada = novaHoraEntrada
    }

    get horaSaida(){
        return this.#horaSaida
    }

    set horaSaida(novaHoraSaida){
        this.#horaSaida = novaHoraSaida
    }

    get data(){
        return this.#data
    }

    set data(novaData){
        this.#data = novaData
    }

    get listaVisitantes(){
        return this.#listaVisitantes
    }

    set listaVisitantes(novaListaVisitantes){
        this.#listaVisitantes = novaListaVisitantes
    }

    
    toJSON(){
        return{
            "registro"       : this.#registro,
            "data"           : this.#data,
            "horaEntrada"    : this.#horaEntrada,
            "horaSaida"      : this.#horaSaida,
            "visitantes"     : this.#listaVisitantes
        }
    }

    async gravar(){
        const agendamentoBD = new AgendamentoBD();
        await agendamentoBD.incluir(this);
    }

    async atualizar(){
        const agendamentoBD = new AgendamentoBD();
        await agendamentoBD.alterar(this);
    }

    async removerDoBancoDados(){
        const agendamentoBD = new AgendamentoBD();
        await agendamentoBD.excluir(this);
    }

    async consultar(){
        const agendamentoBD = new AgendamentoBD();
        const agendamentos = await agendamentoBD.consultar();
        return agendamentos;
    }

}