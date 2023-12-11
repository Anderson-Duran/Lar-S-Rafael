import EntregaBD from '../Persistencia/EntregaBD.js';
export default class Entrega{

    #registro;
    #data;
    #horaEntrada;
    #horaSaida;
    #listaMotoboys;   

    constructor(registro, data, horaEntrada, horaSaida, listaMotoboys){
        this.#registro = registro;
        this.#data = data;
        this.#horaEntrada = horaEntrada;
        this.#horaSaida = horaSaida;
        this.#listaMotoboys = listaMotoboys
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

    get listaMotoboys(){
        return this.#listaMotoboys
    }

    set listaMotoboys(novaListaMotoboys){
        this.#listaMotoboys = novaListaMotoboys
    }

    
    toJSON(){
        return{
            "registro"       : this.#registro,
            "data"           : this.#data,
            "horaEntrada"    : this.#horaEntrada,
            "horaSaida"      : this.#horaSaida,
            "motoboys"       : this.#listaMotoboys
        }
    }

    async gravar(){
        const entregaBD = new EntregaBD();
        await entregaBD.incluir(this);
    }

    async atualizar(){
        const entregaBD = new EntregaBD();
        await entregaBD.alterar(this);
    }

    async removerDoBancoDados(){
        const entregaBD = new EntregaBD();
        await entregaBD.excluir(this);
    }

    async consultar(){
        const entregaBD = new EntregaBD();
        const entregas = await entregaBD.consultar();
        return entregas;
    }
   
}