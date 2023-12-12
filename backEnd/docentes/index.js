/*import express from "express";
import rotaProfessor from "./Rotas/rotaProfessor.js";
import rotaCurso from "./Rotas/rotaCurso.js";
import rotaTurma from "./Rotas/rotaTurma.js";
import cors from 'cors';

const app = new express();

app.use((req, res, next) => {

    console.log("Origem da solicitação:", req.get("origin"));


    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/professor', rotaProfessor);
app.use('/curso', rotaCurso);
app.use('/turmas', rotaTurma);


app.listen(4038, '0.0.0.0', () => {
    console.log("Backend ouvindo em http://0.0.0.0:4038")
})*/

/*import express from "express";
import cors from "cors";
import rotaProfessor from "./Rotas/rotaProfessor.js";
import rotaTurma from "./Rotas/rotaTurma.js";
import rotaCurso from "./Rotas/rotaCurso.js";

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use('/professor', rotaProfessor);
app.use('/turma', rotaTurma);
app.use('/curso', rotaCurso);

app.listen(3001, "localhost", ()=>{
    console.log("Rodando em http://localhost:3001")
});*/

import express from "express";
import cors from "cors";
import rotaProfessor from "./Rotas/rotaProfessor.js";
import rotaTurma from "./Rotas/rotaTurma.js";
import rotaCurso from "./Rotas/rotaCurso.js";

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use('/professor', rotaProfessor);
app.use('/turma', rotaTurma);
app.use('/curso', rotaCurso);

app.listen(4038, '0.0.0.0', () => {
    console.log("Backend ouvindo em http://0.0.0.0:4038")
});
