// Importing necessary modules
import express from "express";
import dotEnv from "dotenv";
import jwt from "jsonwebtoken";

// Importing route handlers
import router from "./Routes/router.js";
import routerMedicines from './Routes/routerMedicines.js';
import routerList from "./Routes/routerList.js";
import routeLogin from "./Routes/routeLogin.js";

// Importing authentication helper functions
import { createSecret } from "./Authentication/createSecret.js";

// Initializing Express app
const app = express();
dotEnv.config();

// Creating secret key for JWT
createSecret();

// Configuring host and port
const host = '0.0.0.0';
const port = process.env.PORT || 4005;

// Setting up CORS middleware
app.use((req, res, next) => {
    console.log("Origin of the request:", req.get("origin"));

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    next();
});

// Configuring Express to parse URL-encoded and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting up routes
app.use('/users', routeLogin);
app.use('/cadastroPaciente', router);
app.use('/cadastroRemedio', routerMedicines);
app.use('/listaRemedios', routerList);

// Starting the server
app.listen(port, () => {
    console.log(`Application Running on https://${host}:${port}`);
});
