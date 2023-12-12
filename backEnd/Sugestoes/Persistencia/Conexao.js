import mysql from 'mysql2/promise';

export default async function conectar(){

    if(global.poolconexao){
        return await global.poolconexao.getConnection();
    }

    const poolconexao = mysql.createPool({
        host:"129.146.68.51",
        //host:"localhost",
        //user:"rodrigo",
        //password:'1234',
        user:"rodrigoMonteiro",
        port:3306,
        database:"centrogerenciamento",
        password:"110458Fm%",
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

//host:"129.146.68.51",
