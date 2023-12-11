import mysql from 'mysql2/promise';

export default async function Conectar(){
    if(global.poolconexao){
        return await global.poolconexao.getConnection();
    }

    const poolconexao = mysql.createPool({
        host:"127.0.0.1", 
        user:"aluno15-pfsii", 
        port:3306, 
        password:"2sQBdmDjddPXaobu7N5V",
        database:"backendvisitantes", 
        waitForConnections: true, 
        connectionLimit: 10, 
        maxIdle: 10, 
        idleTimeout: 60000, 
        queueLimit: 0, 
        enableKeepAlive: true, 
        keepAliveInitialDelay: 0
    });

    global.poolconexao = poolconexao;
    return await poolconexao.getConnection();
}