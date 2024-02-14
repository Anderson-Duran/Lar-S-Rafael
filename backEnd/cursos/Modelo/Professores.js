/*export default class Professores{
    #professores   

    constructor(professores){
        this.#professores = professores
    }

    get professores(){
        return this.#professores
    }

    set professores(novoProfessores){
        this.#professores = novoProfessores
    }

    toJSON(){
        return {
            "professores": this.#professores
        }
    }
}*/

export default class Professores {
    #professores   

    constructor(professores){
        this.#professores = professores;
    }

    get listaProfessores(){
        return this.#professores;
    }

    set listaProfessores(novoProfessores){
        this.#professores = novoProfessores;
    }

    toJSON(){
        return {
            "professores": this.#professores
        }
    }
}