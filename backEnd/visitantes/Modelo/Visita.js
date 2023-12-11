export default class Visita{
    #visitante

    constructor(visitante){
        this.#visitante = visitante
    }

    get visitante(){
        return this.#visitante
    }

    set visitante(novoVisitante){
        this.#visitante = novoVisitante
    }

    toJSON(){
        return {
            "visitante": this.#visitante
        }
    }
}