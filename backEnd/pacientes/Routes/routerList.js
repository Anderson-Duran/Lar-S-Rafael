import { Router } from "express";
import connectDB from "../Persist/connectDB.js";

const routerList = Router();

routerList.get('/', async (req, res) => {
    res.type('application/json')

    if (req.method === "GET") {

        const connection = await connectDB();

        let sql = `SELECT * FROM medicinesList`;
        const list = await connection.query(sql, '')

        res.json(list[0])
    }
})

export default routerList;