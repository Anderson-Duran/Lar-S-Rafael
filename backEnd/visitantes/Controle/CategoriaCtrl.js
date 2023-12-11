import Categoria from '../Modelo/Categoria.js'; 
export default class CategoriaCTRL{

    gravar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "POST" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const descricao = dados.descricao;
            const abrangentes = dados.abrangentes;
            if(descricao && abrangentes){
                const categoria = new Categoria(0, descricao, abrangentes);
                categoria.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Categoria registrada!" + 
                                    "\n Código: " + categoria.codigo
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados da categoria conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou categoria no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    atualizar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "PUT" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const codigoCat = dados.codigoCat;
            const descricao = dados.descricao;
            const abrangentes = dados.abrangentes;
            if(codigoCat && descricao && abrangentes){
                const categoria = new Categoria(codigoCat, descricao, abrangentes);
                categoria.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Categoria atualizada com sucesso!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe adequadamente todos os dados da categoria conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou categoria no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    excluir(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "DELETE" && requisiçao.is('application/json')){
            const dados = requisiçao.body;
            const codigoCat = dados.codigoCat;
            if(codigoCat){
                const categoria = new Categoria(codigoCat);
                categoria.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem: "Categoria excluída com sucesso!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe codigo da categoria conforme a documentação da API"
                });
            }
        }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido ou categoria no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisiçao, resposta){
        resposta.type("application/json");

        if(requisiçao.method === "GET"){
                const categoria = new Categoria();
                categoria.consultar('').then((categorias)=>{
                    resposta.status(200).json(categorias);
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
        else{
            resposta.status(400).json({ 
                status:false,
                mensagem:"Método não permitido!  Consulte a documentação da API"
            });
        }
    }
}