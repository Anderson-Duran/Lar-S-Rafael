import { Router } from "express";
import { authorization } from "../Authentication/auth.js";
import PacientsCTRL from "../Control/PacientsCTRL.js";
import MedicineCTRL from "../Control/MedicineCTRL.js";

const router = Router();
const pacient = new PacientsCTRL();
const medicine = new MedicineCTRL();


router.post('/pacients', pacient.savePacient)
    .get('/pacients',pacient.consultPrisma)
    .delete('/pacients',pacient.deletePacient)
    .put('/pacients',pacient.updatePacient)
    .get('/pacients:id', (req, res) => { res.send() })


export default router;