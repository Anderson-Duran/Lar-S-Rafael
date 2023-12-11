import PedidoBD from '../Persistencia/PedidoBD.js';
export default class Pedido{

    #codigoPed;
    #descricao;
    
    constructor(codigoPed, descricao){
        this.#codigoPed = codigoPed;
        this.#descricao = descricao      
    }

    get codigoPed(){
        return this.#codigoPed
    }

    set codigoPed(novoCodigoPed){
        this.#codigoPed = novoCodigoPed
    }      
    
    get descricao(){
        return this.#descricao
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao
    }
  
    toJSON(){
        return{
            "codigoPed"    : this.#codigoPed,
            "descricao"    : this.#descricao
          
        }
    }

    async gravar(){
        const pedidoBD = new PedidoBD();
        this.codigo = await pedidoBD.incluir(this);
    }

    async atualizar(){
        const pedidoBD = new PedidoBD();
        await pedidoBD.alterar(this);
    }

    async removerDoBancoDados(){
        const pedidoBD = new PedidoBD();
        await pedidoBD.excluir(this);
    }

    async consultar(termo){
        const pedidoBD = new PedidoBD();
        const pedidos = await pedidoBD.consultar(termo);
        return pedidos;
    }

    async consultarCodigo(codigoPed){
        const pedidoBD = new PedidoBD();
        const pedidos = await pedidoBD.consultarCodigo(codigoPed);
        return pedidos;
    }
}