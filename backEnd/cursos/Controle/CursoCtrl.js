import Curso from '../Modelo/Curso.js';
export default class CursoCTRL {

    gravar(requisiçao, resposta) {
        resposta.type("application/json");

        if (requisiçao.method === "POST" && requisiçao.is('application/json')) {
            const dados = requisiçao.body;
            const cursos = dados.cursos;

            if (cursos) {
                const curso = new Curso(0, cursos);
                curso.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Curso registrado!" +
                            "\n Código: " + curso.codigo
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados da pedido conforme a documentação da API"
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou pedido no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    atualizar(requisiçao, resposta) {
        resposta.type("application/json");

        if (requisiçao.method === "PUT" && requisiçao.is('application/json')) {
            const dados = requisiçao.body;
            const codigoCur = dados.codigoCur;
            const cursos = dados.cursos;
            if (codigoCur & cursos) {
                const curso = new Curso(codigoCur, cursos);
                curso.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Curso atualizado com sucesso!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados da pedido conforme a documentação da API"
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou pedido no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    excluir(requisiçao, resposta) {
        resposta.type("application/json");

        if (requisiçao.method === "DELETE" && requisiçao.is('application/json')) {
            const dados = requisiçao.body;
            const codigoCur = dados.codigoCur;
            if (codigoCur) {
                const curso = new Curso(codigoCur);
                curso.removerDoBancoDados().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Curso excluído com sucesso!!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    })
                });
            }
            else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe codigo dapedido conforme a documentação da API"
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou pedido no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisiçao, resposta) {
        resposta.type("application/json");

        if (requisiçao.method === "GET") {
            const curso = new Curso();
            curso.consultar('').then((cursos) => {
                resposta.status(200).json(cursos);
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                })
            });
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido!  Consulte a documentação da API"
            });
        }
    }
}