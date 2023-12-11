export default class Moto{
    #motoboy

    constructor(motoboy){
        this.#motoboy = motoboy
    }

    get motoboy(){
        return this.#motoboy
    }

    set motoboy(novoMotoboy){
        this.#motoboy = novoMotoboy
    }

    toJSON(){
        return {
            "motoboy": this.#motoboy
        }
    }
}