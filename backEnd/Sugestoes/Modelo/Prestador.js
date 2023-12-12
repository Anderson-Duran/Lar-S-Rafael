import PrestadorBD from "../Persistencia/PrestadorBD.js"

export default class Prestador{
    #ID
    #nome
    #telefone
    #sugestoes

    constructor(ID, nome, telefone, sugestoes){
        this.#ID = ID;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#sugestoes = sugestoes;
    }

    get ID(){
        return this.#ID;
    }
    set ID(novoID){
        this.#ID = novoID;
    }

    get nome(){
        return this.#nome;
    }
    set nome(novoNome){
        this.#nome = novoNome;
    }

    get telefone(){
        return this.#telefone;
    }
    set telefone(novoTelefone){
        this.#telefone = novoTelefone;
    }

    get sugestoes(){
        return this.#sugestoes;
    }
    set sugestoes(novaSugestao){
        this.#sugestoes = novaSugestao;
    }


    toJSON(){
        return {
            "ID":          this.#ID,
            "nome":        this.#nome,
            "telefone":    this.#telefone,
            "sugestoes":   this.#sugestoes
                }
            }
    
    async gravar(){
        const prestadorBD = new PrestadorBD();
        await prestadorBD.incluir(this);
                
    }
        
    async atualizar(){
        const prestadorBD = new PrestadorBD();
        await prestadorBD.alterar(this);
                
    }
        
    async remover(){
        const prestadorBD = new PrestadorBD();
        await prestadorBD.excluir(this);
                
    }
        
    async consulta(){
        const prestadorBD = new PrestadorBD();
        return await prestadorBD.consultar();
        
                
    }
}