import Pacients from "../Models/pacientes.js";
import connectDB from "./connectDB.js";


export default class PacientsDBAO {


    //CREATE PACIENT
    async savePacient(pacient) {
        if (pacient instanceof Pacients) {

            let connection = await connectDB();
            let sql = 'INSERT INTO pacients(cpf, name, responsable, sex, birthDate, zipCode, address, neighborhood, city, state, phone) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
            const { cpf, name, responsable, sex, birthDate, zipCode, address, neighborhood, city, state, phone } = pacient;
            const values = [cpf, name, responsable, sex, birthDate, zipCode, address, neighborhood, city, state, phone];
            await connection.query(sql, values);
            global.poolConnections.pool.releaseConnection(connection); 
        }
        else {
            console.log(error.message)
        }

    }

    async deletePacient(sendedCpf) {
        if (sendedCpf) {
            let connection = await connectDB();
            let sql = 'DELETE FROM pacients WHERE cpf = ?;';
            await connection.query(sql, sendedCpf);
            global.poolConnections.pool.releaseConnection(connection); 
        }
        else {
            console.log(error.message)
        }
    }


    async updatePacient(pacient) {
        if (pacient instanceof Pacients) {
            let connection = await connectDB();
            let sql = 'UPDATE pacients SET name=?, responsable=?, sex=?, birthDate=?, zipCode=?, address=?, neighborhood=?, city=?, state=?, phone=? WHERE cpf=?';
            const { cpf, name, responsable, sex, birthDate, zipCode, address, neighborhood, city, state, phone } = pacient;
            const values = [name, responsable, sex, birthDate, zipCode, address, neighborhood, city, state, phone, cpf];
            await connection.query(sql, values);
            global.poolConnections.pool.releaseConnection(connection); 
        }
        else {
            console.log(error.message);
        }
    }

    async consultPacient(term) {

        let connection = await connectDB();
        let temSearch = `'%${term}%'`
        let sql = `SELECT * FROM pacients WHERE name LIKE ${temSearch};`;
        const listPacients = [];
        const results = await connection.query(sql);
        global.poolConnections.pool.releaseConnection(connection); 
        for (const result of results[0]) {
            const pacient = new Pacients(result.cpf, result['name'], result.responsable, result.sex, result.birthDate, result.zipCode, result.address, result.neighborhood, result.city, result.state, result.phone);
            listPacients.push(pacient);
        }
        return listPacients;

    }

}

