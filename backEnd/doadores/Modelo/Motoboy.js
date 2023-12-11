import MotoboyBD from '../Persistencia/MotoboyBD.js';
export default class Motoboy{

    #codigo;
    #nome;
    #endereco;
    #cpf;
   
    #telefone;
    #dataCadastro;
    #codPedido;

    constructor(codigo, nome, endereco, cpf, telefone, dataCadastro, codPedido){
        this.#codigo = codigo;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#cpf = cpf;
       
        this.#telefone = telefone;
        this.#dataCadastro = dataCadastro;
        this.#codPedido = codPedido
    }

    get codigo(){
        return this.#codigo
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo
    }
    
    get nome(){
        return this.#nome
    }

    set nome(novoNome){
        this.#nome = novoNome
    }

    get endereco(){
        return this.#endereco
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco
    }

    get cpf(){
        return this.#cpf
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf
    }

   

    get telefone(){
        return this.#telefone
    }

    set telefone(novoTelefone){
        this.#telefone = novoTelefone
    }

    get dataCadastro(){
        return this.#dataCadastro
    }

    set dataCadastro(novaDataCadastro){
        this.#dataCadastro = novaDataCadastro
    }

    get codPedido(){
        return this.#codPedido
    }

    set codPedido(novoCodPedido){
        this.#codPedido = novoCodPedido
    }

    toJSON(){
        return{
            "codigo"        : this.#codigo,
            "nome"          : this.#nome,
            "endereco"      : this.#endereco,
            "cpf"           : this.#cpf,  
            "telefone"      : this.#telefone,
            "dataCadastro"  : this.#dataCadastro,
            "codPedido"     : this.#codPedido
        }
    }

    async gravar(){
        const  motoboyBD = new MotoboyBD();
        this.#codigo = await motoboyBD.incluir(this);
    }

    async atualizar(){
        const  motoboyBD = new MotoboyBD();
        await  motoboyBD.alterar(this);
    }

    async removerDoBancoDados(){
        const  motoboyBD = new MotoboyBD();
        await  motoboyBD.excluir(this);
    }

    async consultar(termo){
        const  motoboyBD = new MotoboyBD();
        const  motoboys = await  motoboyBD.consultar(termo);
        return  motoboys;
    }
}    