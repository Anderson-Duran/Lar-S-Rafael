import SugestaoBD from "../Persistencia/sugestaoBD.js";

export default class Sugestao{
    #ID
    #nome 
    #sobrenome
    #telefone
    #data
    #sugestao
    
    constructor(ID, nome, sobrenome, telefone, data, sugestao){ 
        this.#ID = ID; 
        this.#nome = nome;
        this.#sobrenome = sobrenome;
        this.#telefone = telefone;
        this.#data = data;
        this.#sugestao = sugestao
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
    set nome(NovoNome){
        this.#nome = NovoNome;
    }

    get sobrenome(){
        return this.#sobrenome;
    }
    set sobrenome(NovoSobrenome){
        this.#sobrenome = NovoSobrenome;
    }

    get telefone(){
        return this.#telefone;
    }
    set telefone(Novotelefone){
        this.#telefone = Novotelefone;
    }

    get data(){
        return this.#data;
    }
    set data(novaData){
        this.#data = novaData;
    }

    get sugestao(){
        return this.#sugestao;
    }

    set sugestao(NovaSugestao){
        this.#sugestao = NovaSugestao;
    }
    //overhide ou toJSONtelefone
    
    toJSON(){
        return {
            ID            : this.#ID,
            nome          : this.#nome,
            sobrenome     : this.#sobrenome,
            telefone      : this.#telefone,
            data          : this.#data,
            sugestao      : this.#sugestao
        }
    }

    async gravar(){
        const sugestaoBD = new SugestaoBD();
        this.ID = await sugestaoBD.incluir(this);
    }

    async atualizar(){
        const sugestaoBD = new SugestaoBD();
        await sugestaoBD.alterar(this);
    }

    async remover(){
        const sugestaoBD = new SugestaoBD();
        await sugestaoBD.excluir(this);
    }

    async consulta(termo){
        const sugestaoBD = new SugestaoBD();
        const sugestaos = await sugestaoBD.consultar(termo);
        return sugestaos;
    }
}
 