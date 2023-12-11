import { json, response } from 'express';
import Medicine from '../Models/remedios.js';

export default class MedicineCTRL {

    async saveMedicine(req, res) {
        res.type('application/json')

        if (req.method === "POST" && req.is("application/json")) {
            const data = req.body;
            const { id, cpf } = data.pacientName
            const { medicineName, medicineDosage, medicineHours, medicineHours2, medicineHours3, medicineDateStart, medicineDateEnd, medicineObservation } = data;

            let medicine = new Medicine(0, cpf, medicineName, medicineDosage, medicineHours, medicineHours2, medicineHours3, medicineDateStart, medicineDateEnd, medicineObservation)

            try {
                await medicine.create();
                res.status(200).json({
                    message: `Medicine ${medicineName} successfully saved`
                });
            } catch (error) {
                res.status(500).json({
                    message: `Server report: ${error.message}`
                });
            }

        }
    }

    async updateMedicine(req, res) {
        res.type('application/json');

        if (req.method === "PUT" && req.is('application/json')) {
            const data = req.body;
            const { id, medicineName, medicineDosage, medicineHours, medicineHours2, medicineHours3, medicineDateStart, medicineDateEnd, medicineObservation } = data
            const { cpf } = data.pacientName;
            const medicine = new Medicine(id, cpf, medicineName, medicineDosage, medicineHours, medicineHours2, medicineHours3, medicineDateStart, medicineDateEnd, medicineObservation)
          
            const name = await medicine.update();
            res.status(200).json({
                message: `Medication for patient ${name} successfully updated`
            })
        }
    }

    async deleteMedicine(req, res) {
        res.type('application/json');

        if (req.method === "DELETE" && req.is('application/json')) {
            const data = req.body;
            const { id, cpf } = data;


            const medicine = new Medicine(id, cpf);

            try {
                const name = await medicine.delete();
                res.status(200).json({
                    message: `Medicine deleted from patient ${name}`
                })
            } catch (error) {
                res.status(500).json({
                    message: "Server error"
                })
            }

        }
    }

    async consultMedicines(req, res) {
        res.type('application/json');

        if (req.method === "GET") {
            const { cpf } = req.params;
            const medicine = new Medicine(0, cpf);

            try {
                const list = await medicine.consult();
                res.status(200).json(list)
            } catch (error) {
                res.status(500).json({ message: "Server error" })
            }
        }
    }

}