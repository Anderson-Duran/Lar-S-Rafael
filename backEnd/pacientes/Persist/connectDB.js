import mysql from "mysql2/promise";


export default async function connectDB() {


    if (global.poolConnections) {
        return await global.poolConnections.getConnection();
    }

    const connection = await mysql.createPool({
        host: '129.146.68.51',
        user: 'aluno5-pfsii',
        port: 3306,
        password: '1x63v4m9T3REaELZEVQ5',
        database: 'lar',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10,
        idleTimeout: 60000,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    })

    global.poolConnections = connection;

    return await connection.getConnection();


}