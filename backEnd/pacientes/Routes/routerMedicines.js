import { Router } from "express";
import MedicineCTRL from "../Control/MedicineCTRL.js";

const routerMedicines = Router();

const medicine = new MedicineCTRL();

routerMedicines.get('/medicines/:cpf', medicine.consultMedicines)
    .post('/medicines', medicine.saveMedicine)
    .put('/medicines', medicine.updateMedicine)
    .delete('/medicines', medicine.deleteMedicine)

    export default routerMedicines;