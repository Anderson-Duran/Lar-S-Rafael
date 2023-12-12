import mysql from 'mysql2/promise';

export default async function Conectar() {
    if (global.conexao && global.conexao.status != "disconnected") {
        return global.conexao;
    }

    const conexao = await mysql.createConnection({
        host: "localhost",
        user: "aluno38-pfsii",
        password: "T76hycYY4iLcMBi34N4K", 
        database: "renato"
    });

    global.conexao = conexao;
    return conexao;
}