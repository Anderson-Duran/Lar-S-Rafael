import connectDB from "./connectDB.js";
import Medicine from "../Models/remedios.js";

export default class MedicineDBAO {



    async saveMedicine(medicine) {

        const connection = await connectDB();
        var sqlInitialize = `CREATE TABLE IF NOT EXISTS medicines(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            cpf VARCHAR(14) NOT NULL,
            name VARCHAR(255) NOT NULL,
            dose VARCHAR(50) NOT NULL,
            hour1 TIME,
            hour2 TIME,
            hour3 TIME,
            dateStart DATE NOT NULL,
            dateEnd DATE NOT NULL,
            observation TEXT,
            FOREIGN KEY (cpf) REFERENCES pacients(cpf)
        );`
        await connection.query(sqlInitialize);

        if (medicine instanceof Medicine) {

            const { cpf, medicineName, medicineDosage, medicineHours, medicineHours2, medicineHours3, medicineDateStart, medicineDateEnd, medicineObservation } = medicine
            let sql = `INSERT INTO medicines VALUES(?,?,?,?,?,?,?,?,?,?);`;
            let sqlSecondRequire = `SELECT m.id, m.name AS medicineName, p.name AS name 
                                    FROM medicines m 
                                    INNER JOIN pacients p ON m.cpf = p.cpf 
                                    WHERE m.id = ?`
            let values = [0, cpf, medicineName, medicineDosage, medicineHours, medicineHours2, medicineHours3, medicineDateStart, medicineDateEnd, medicineObservation];

            try {
                await connection.beginTransaction();
                const [result,] = await connection.query(sql, values);
                const id = result.insertId;
                const [pacientName,] = await connection.query(sqlSecondRequire, [id]);
                const name = pacientName[0].name;

                await connection.commit();

                return [name, id]

            } catch (error) {
                await connection.rollback();
                throw error
            }


        } else {
            global.poolConnections.pool.releaseConnection(connection);
            console.log(error.message)
        }

    }

    async updateMedicine(medicine) {

        const connection = await connectDB();
        var sqlInitialize = `CREATE TABLE IF NOT EXISTS medicines(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            cpf VARCHAR(14) NOT NULL,
            name VARCHAR(255) NOT NULL,
            dose VARCHAR(50) NOT NULL,
            hour1 TIME,
            hour2 TIME,
            hour3 TIME,
            dateStart DATE NOT NULL,
            dateEnd DATE NOT NULL,
            observation TEXT,
            FOREIGN KEY (cpf) REFERENCES pacients(cpf)
        );`
        await connection.query(sqlInitialize);

        if (medicine instanceof Medicine) {

            const { id, cpf, medicineName, medicineDosage, medicineHours, medicineHours2, medicineHours3, medicineDateStart, medicineDateEnd, medicineObservation } = medicine;
            let sql = `UPDATE medicines 
                        SET  dose = ?, hour1 = ?, hour2 = ?, hour3 = ?, dateStart = ?, dateEnd = ?, observation = ?
                        WHERE id = ? `;
            let sqlSecondRequire = `SELECT m.id, m.name AS medicineName, p.name AS name 
                        FROM medicines m 
                        INNER JOIN pacients p ON m.cpf = p.cpf 
                        WHERE m.id = ?`;
            let values = [medicineDosage, medicineHours, medicineHours2, medicineHours3, medicineDateStart, medicineDateEnd, medicineObservation, id];

            try {
                await connection.beginTransaction();
                await connection.query(sql, values);
                const [pacientName,] = await connection.query(sqlSecondRequire, [id]);
                const { name } = pacientName[0]

                await connection.commit();

                return name;

            } catch (error) {
                await connection.rollback();
                throw error;
            }

        }
        global.poolConnections.pool.releaseConnection(connection);
    }

    async deleteMedicine(medicine) {

        const connection = await connectDB();
        var sqlInitialize = `CREATE TABLE IF NOT EXISTS medicines(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            cpf VARCHAR(14) NOT NULL,
            name VARCHAR(255) NOT NULL,
            dose VARCHAR(50) NOT NULL,
            hour1 TIME,
            hour2 TIME,
            hour3 TIME,
            dateStart DATE NOT NULL,
            dateEnd DATE NOT NULL,
            observation TEXT,
            FOREIGN KEY (cpf) REFERENCES pacients(cpf)
        );`
        await connection.query(sqlInitialize);

        if (medicine instanceof Medicine) {
            const { id, cpf } = medicine;
            let sql = ` DELETE FROM medicines
                        WHERE id = ?`
            let values = [id, cpf];
            let sqlSecondRequire = `SELECT m.cpf, m.name AS medicineName, p.name AS name
                                    FROM medicines m
                                    INNER JOIN pacients p ON m.cpf = p.cpf
                                    WHERE id = ?`

            try {
                await connection.beginTransaction();
                const [pacientName,] = await connection.query(sqlSecondRequire, id)
                const { name, medicineName } = pacientName[0];
                await connection.query(sql, values);

                console.log(`Medicine ${medicineName} successfully deleted`);
                await connection.commit()
                
                return name;

            } catch (error) {
                await connection.rollback()
                throw error
            }

        }
        global.poolConnections.pool.releaseConnection(connection);
    }

    async consultMedicines(medicine) {

        const connection = await connectDB();
        var sqlInitialize = `CREATE TABLE IF NOT EXISTS medicines(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            cpf VARCHAR(14) NOT NULL,
            name VARCHAR(255) NOT NULL,
            dose VARCHAR(50) NOT NULL,
            hour1 TIME,
            hour2 TIME,
            hour3 TIME,
            dateStart DATE NOT NULL,
            dateEnd DATE NOT NULL,
            observation TEXT,
            FOREIGN KEY (cpf) REFERENCES pacients(cpf)
        );`
        await connection.query(sqlInitialize);

        if (medicine instanceof Medicine) {
            const { cpf } = medicine;
            let sql = ` SELECT * FROM medicines
                        WHERE cpf = ?`;
            const list = await connection.query(sql, cpf);
            const medicineList = [];
            list[0].forEach(element => {
                let med = new Medicine(element['id'], element['cpf'], element['name'], element['dose'], element['hour1'], element['hour2'], element['hour3'], element['dateStart'], element['dateEnd'], element['observation']);
                console.log(med)
                medicineList.push(med)
            });

            global.poolConnections.pool.releaseConnection(connection);;

            return medicineList;
        }
    }
}