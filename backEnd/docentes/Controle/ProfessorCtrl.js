import Curso from '../Modelo/Curso.js';
import Professor from '../Modelo/Professor.js';
export default class ProfessorCTRL {

    gravar(requisiçao, resposta) {
        resposta.type("application/json");

        if (requisiçao.method === "POST" && requisiçao.is('application/json')) {
            const dados = requisiçao.body;
            const nome = dados.nome;
            const cpf = dados.cpf;
            const telefone = dados.telefone;
            const codCurso = dados.codCurso;
            const cursos = new Curso(0, "").consultarCodigo(codCurso).then((cursos) => {
                if (cursos) {
                    const professor = new Professor(0, nome, cpf, telefone, codCurso);
                    professor.gravar().then(() => {
                        resposta.status(200).json({
                            status: true,
                            Código: professor.codigo,
                            mensagem: "Professor gravado com sucesso!!"
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
                        mensagem: "Curso não encontrado!"
                    });
                }
            })
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou Professor no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    atualizar(requisiçao, resposta) {
        resposta.type("application/json");

        if (requisiçao.method === "PUT" && requisiçao.is('application/json')) {
            const dados = requisiçao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const cpf = dados.cpf;
            const telefone = dados.telefone;
            const codCurso = dados.codCurso;
            const cursos = new Curso(0, "").consultar(codCurso).then((cursos) => {
                if (cursos) {
                    const professor = new Professor(codigo, nome, cpf, telefone, codCurso);
                    professor.atualizar().then(() => {
                        resposta.status(200).json({
                            status: true,
                            Código: professor.codigo,
                            mensagem: "Professor atualizado com sucesso!!"
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
                        mensagem: "Curso não encontrado!"
                    });
                }
            })
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou Professor no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    excluir(requisiçao, resposta) {
        resposta.type("application/json");

        if (requisiçao.method === "DELETE" && requisiçao.is('application/json')) {
            const dados = requisiçao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const professor = new Professor(codigo);
                professor.removerDoBancoDados().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Professor excluído com sucesso!!"
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
                    mensagem: "Informe codigo do Professor conforme a documentação da API"
                });
            }
        }
        else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou professor no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    consultar(requisiçao, resposta) {
        resposta.type("application/json");

        if (requisiçao.method === "GET") {
            const professor = new Professor();
            professor.consultar('').then((professores) => {
                resposta.status(200).json(professores);
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