import CategoriaBD from '../Persistencia/CategoriaBD.js';
export default class Categoria{

    #codigoCat;
    #descricao;
    #abrangentes;

    constructor(codigoCat, descricao, abrangentes){
        this.#codigoCat = codigoCat;
        this.#descricao = descricao;
        this.#abrangentes = abrangentes
    }

    get codigoCat(){
        return this.#codigoCat
    }

    set codigoCat(novoCodigoCat){
        this.#codigoCat = novoCodigoCat
    }
    
    get descricao(){
        return this.#descricao
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao
    }

    get abrangentes(){
        return this.#abrangentes
    }

    set abrangentes(novosAbrangentes){
        this.#abrangentes = novosAbrangentes
    }


    toJSON(){
        return{
            "codigoCat"    : this.#codigoCat,
            "descricao"   : this.#descricao,
            "abrangentes" : this.#abrangentes
        }
    }

    async gravar(){
        const categoriaBD = new CategoriaBD();
        this.codigo = await categoriaBD.incluir(this);
    }

    async atualizar(){
        const categoriaBD = new CategoriaBD();
        await categoriaBD.alterar(this);
    }

    async removerDoBancoDados(){
        const categoriaBD = new CategoriaBD();
        await categoriaBD.excluir(this);
    }

    async consultar(termo){
        const categoriaBD = new CategoriaBD();
        const categorias = await categoriaBD.consultar(termo);
        return categorias;
    }

    async consultarCodigo(codigoCat){
        const categoriaBD = new CategoriaBD();
        const categorias = await categoriaBD.consultarCodigo(codigoCat);
        return categorias;
    }
}