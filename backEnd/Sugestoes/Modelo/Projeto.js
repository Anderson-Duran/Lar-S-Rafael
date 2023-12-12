import ProjetoBD from "../Persistencia/ProjetoBD.js";

export default class Projeto{
    #ID
    #responsavel
    #descricao
    #autor
    #sugestao

    constructor(ID=0, responsavel="", descricao="", autor="", sugestao={})
    {
        this.#ID = ID;
        this.#responsavel = responsavel;
        this.#descricao = descricao;
        this.#autor = autor;
        this.#sugestao = sugestao;
    }

    get ID(){
        return this.#ID;
    }
    set ID(novoID){
        this.#ID = novoID;
    }

    get responsavel(){
        return this.#responsavel;
    }
    set responsavel(novoresponsavel){
        this.#responsavel = novoresponsavel;
    }

    get descricao(){
        return this.#descricao;
    }
    set descricao(novadescricao){
        this.#descricao = novadescricao;
    }

    get autor(){
        return this.#autor;
    }
    set autor(novoautor){
        this.#autor = novoautor;
    }

    get sugestao(){
        return this.#sugestao;
    }

    set sugestao(novasugestao){
        this.#sugestao = novasugestao;
    }

    toJSON(){
        return{
            "ID":          this.#ID,
            "responsavel": this.#responsavel,
            "descricao":   this.#descricao,
            "autor":       this.#autor,
            "sugestao":    this.#sugestao
                }
            }

    async gravar(){
        const projetoBD = new ProjetoBD();
        this.ID = await projetoBD.incluir(this);
    }

    async atualizar(){
        const projetoBD = new ProjetoBD();
        await projetoBD.alterar(this);
    }

    async remover(){
        const projetoBD = new ProjetoBD();
        await projetoBD.excluir(this);
    }

    async consulta(termo){
        const projetoDB = new ProjetoBD()
        const projetos = await projetoDB.consultar(termo)
        return projetos;
    }
}



    